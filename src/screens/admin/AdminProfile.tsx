import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { LogOutIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminProfileProps {
  onLogout: () => void;
}

export const AdminProfile = ({ onLogout }: AdminProfileProps) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsed = JSON.parse(user);
      setFirstName(parsed.firstname || '');
      setLastName(parsed.lastname || '');
    }
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    setMessage('');
    try {
      const user = localStorage.getItem('user');
      if (!user) throw new Error('User not found');
      const parsed = JSON.parse(user);
      const userid = parsed.userid;

      const { error } = await supabase
        .from('Users')
        .update({ firstname: firstName, lastname: lastName })
        .eq('userid', userid);

      if (error) throw error;

      localStorage.setItem(
        'user',
        JSON.stringify({ ...parsed, firstname: firstName, lastname: lastName })
      );
      setMessage('Name updated successfully!');
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || 'Failed to update name');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
      await supabase.auth.signOut()
      localStorage.clear()
      onLogout()
    }

  return (
    <div className="min-h-screen w-screen bg-[#fef7e0] p-8 flex flex-col items-center">
      {/* Simple Back Button */}
      <button
        onClick={() => navigate('/admin/dashboard')}
        className="w-full mb-4 py-2 bg-[#754b34] text-[#fefcf0] rounded-lg font-serif font-semibold hover:bg-[#5d3a28] transition-all max-w-md"
      >
        Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold text-[#754b34] mb-6 font-serif">Admin Profile</h1>

      <div className="w-full max-w-md bg-[#fcf8dd] p-6 rounded-2xl shadow-md border border-[#d4c4a8]">
        <label className="block text-[#6d5a42] mb-2 font-semibold font-serif">First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full border border-[#d4c4a8] rounded-lg p-2 mb-4 font-serif"
        />

        <label className="block text-[#6d5a42] mb-2 font-semibold font-serif">Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full border border-[#d4c4a8] rounded-lg p-2 mb-4 font-serif"
        />

        {message && <p className="text-sm text-[#754b34] mb-4">{message}</p>}

        <button
          onClick={handleSave}
          disabled={isLoading}
          className="w-full bg-[#754b34] text-[#fefcf0] py-2 rounded-lg font-serif font-semibold mb-3 hover:bg-[#5d3a28] transition-all"
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>

    {/* Logout Button */}
          <button onClick={handleLogout} className="w-full py-3 border border-[#754b34] text-[#754b34] rounded-lg font-bold hover:bg-[#754b34] hover:text-[#fefcf0] transition-all mt-auto">
            <LogOutIcon size={18} className="inline-block mr-2" />
            Log out
          </button>
      </div>
    </div>
  );
};
