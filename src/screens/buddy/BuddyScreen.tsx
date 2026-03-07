import React, { useState, useRef, useEffect } from "react";
import { SendIcon, MicIcon, CompassIcon, GlobeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../config/supabase";

interface ChatMessage {
  id: string | number;
  sender: "user" | "buddy";
  text: string;
  time: string;
}

export const BuddyScreen = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const [user, setUser] = useState<any>(null);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isTyping]);

  // Load user and chats
  useEffect(() => {
    const loadUserAndChats = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) return;
      setUser(data.user);

      const { data: chats, error: chatError } = await supabase
        .from("ChatHistory")
        .select("*")
        .eq("user_id", data.user.id)
        .order("created_at", { ascending: true });

      if (!chatError && chats && chats.length > 0) {
        setChatHistory(
          chats.map((c: any) => ({
            id: c.id,
            sender: c.role === "user" ? "user" : "buddy",
            text: c.content,
            time: new Date(c.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          }))
        );
      } else {
        setChatHistory([
          {
            id: 1,
            sender: "buddy",
            text: "🌍 Hello traveler! I'm your AI cultural guide — here to share tips, customs, and insights about any destination. Where shall we begin?",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }
    };
    loadUserAndChats();
  }, []);

  const saveMessage = async (role: string, content: string) => {
    if (!user) return;
    await supabase.from("ChatHistory").insert({
      user_id: user.id,
      role,
      content,
    });
  };

  const handleSendMessage = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmedMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatHistory((prev) => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);
    await saveMessage("user", trimmedMessage);

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error("OpenAI API key is not configured. Please add VITE_OPENAI_API_KEY to your .env file.");
      }

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a friendly AI travel companion that explains cultures, customs, and traditions." },
            // include the current chat history plus the new user message
            ...[...chatHistory, userMessage].map((chat) => ({
              role: chat.sender === "user" ? "user" : "assistant",
              content: chat.text,
            })),
          ],
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`OpenAI API error: ${errorData?.error?.message || res.statusText}`);
      }

      const data = await res.json();
      const buddyText = data.choices?.[0]?.message?.content || "⚠️ Could not generate a response.";

      const buddyResponse: ChatMessage = {
        id: Date.now() + 1,
        sender: "buddy",
        text: buddyText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setChatHistory((prev) => [...prev, buddyResponse]);
      await saveMessage("assistant", buddyText);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      setChatHistory((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          sender: "buddy",
          text: `⚠️ ${errorMessage}`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#fcf8dd] flex flex-col font-serif">
      {/* Header */}
      <header className="bg-[#754b34] text-[#fefcf0] p-5 rounded-b-3xl shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 border border-[#fefcf0] rounded-full flex items-center justify-center">
            <CompassIcon size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold">Travel Companion</h1>
            <p className="text-xs italic opacity-90">Your AI Cultural Guide</p>
          </div>
        </div>

        {/* Clear Chat and Globe Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => navigate("/translate")}
            className="bg-[#d3b88c]/30 hover:bg-[#d3b88c]/60 p-2 rounded-md transition-all flex items-center gap-2"
          >
            <GlobeIcon size={18} className="text-[#fefcf0]" />
            <span className="text-xs">Quick Translate</span>
          </button>
          <button
            onClick={async () => {
              if (!user) return;
              await supabase.from("ChatHistory").delete().eq("user_id", user.id);
              setChatHistory([
                {
                  id: 1,
                  sender: "buddy",
                  text: "🌍 Hello traveler! I'm your AI cultural guide — here to share tips, customs, and insights about any destination. Where shall we begin?",
                  time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                },
              ]);
            }}
            className="text-xs px-3 py-1 bg-red-400 text-white rounded hover:bg-red-500 transition-colors"
          >
            Clear Chat
          </button>
        </div>
      </header>

      {/* Chat Section */}
      <div className="flex-1 p-4 overflow-y-auto mb-28">
        <div className="space-y-4">
          {chatHistory.map((chat) => (
            <div
              key={chat.id}
              className={`flex ${chat.sender === "user" ? "justify-end" : "justify-start"} mb-3`}
            >
              <div
                className={`p-4 rounded-2xl shadow-md max-w-[80%] relative font-serif ${
                  chat.sender === "user" ? "bg-[#b99664] text-[#fefcf0]" : "bg-[#d8c49e] text-[#2f1b14]"
                }`}
                style={{
                  borderRadius: chat.sender === "user" ? "1rem 0 1rem 1rem" : "0 1rem 1rem 1rem",
                }}
              >
                <p className="italic font-medium" style={{ fontFamily: "'Courier New', monospace" }}>
                  {chat.text}
                </p>
                <div className={`text-xs opacity-70 mt-1 ${chat.sender === "user" ? "text-right" : ""}`}>
                  {chat.time}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#d8c49e] text-[#2f1b14] px-4 py-2 rounded-2xl shadow-sm italic font-serif">
                Buddy is typing...
              </div>
            </div>
          )}
          <div ref={chatEndRef}></div>
        </div>
      </div>

      {/* Input Section */}
      <div className="fixed bottom-[90px] left-0 right-0 bg-[#fefcf0] border-t border-[#d4c4a8] p-2 max-w-md mx-auto shadow-lg rounded-t-xl">
        <div className="flex items-center bg-[#fcf8dd] border border-[#d4c4a8] rounded-full p-1">
          <textarea
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none h-10 py-2 px-3 text-[#2f1b14] font-serif"
            placeholder="Ask your travel buddy..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{ fontFamily: "'Courier New', monospace" }}
          />
          <button className="p-2 text-[#8b7355] hover:text-[#5d3a28] mr-1">
            <MicIcon size={20} />
          </button>
          <button
            onClick={handleSendMessage}
            className="bg-[#754b34] text-[#fefcf0] p-2 rounded-full hover:bg-[#5d3a28] transition-colors"
          >
            <SendIcon size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
