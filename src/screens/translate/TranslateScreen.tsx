import React, { useState } from 'react';
import { ArrowLeftIcon, GlobeIcon, CopyIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TranslateScreen = () => {
  const [targetLanguage, setTargetLanguage] = useState('Japanese');
  const [translatedText, setTranslatedText] = useState('');
  const [romanization, setRomanization] = useState('');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  ];

  // Only Basic Greetings
  const greetings = ['Hello', 'Goodbye', 'Yes', 'No', 'Please', 'Sorry'];

  // Translations for all languages
  const phrasesDatabase: any = {
    Hello: {
      English: { text: 'Hello' },
      Japanese: { text: 'こんにちは', romanization: 'Konnichiwa' },
      Spanish: { text: 'Hola' },
      French: { text: 'Bonjour' },
      German: { text: 'Hallo' },
      Italian: { text: 'Ciao' },
      Chinese: { text: '你好', romanization: 'Nǐ hǎo' },
      Korean: { text: '안녕하세요', romanization: 'Annyeonghaseyo' },
    },
    Goodbye: {
      English: { text: 'Goodbye' },
      Japanese: { text: 'さようなら', romanization: 'Sayōnara' },
      Spanish: { text: 'Adiós' },
      French: { text: 'Au revoir' },
      German: { text: 'Auf Wiedersehen' },
      Italian: { text: 'Arrivederci' },
      Chinese: { text: '再见', romanization: 'Zàijiàn' },
      Korean: { text: '안녕히 가세요', romanization: 'Annyeonghi gaseyo' },
    },
    Yes: {
      English: { text: 'Yes' },
      Japanese: { text: 'はい', romanization: 'Hai' },
      Spanish: { text: 'Sí' },
      French: { text: 'Oui' },
      German: { text: 'Ja' },
      Italian: { text: 'Sì' },
      Chinese: { text: '是', romanization: 'Shì' },
      Korean: { text: '네', romanization: 'Ne' },
    },
    No: {
      English: { text: 'No' },
      Japanese: { text: 'いいえ', romanization: 'Iie' },
      Spanish: { text: 'No' },
      French: { text: 'Non' },
      German: { text: 'Nein' },
      Italian: { text: 'No' },
      Chinese: { text: '不', romanization: 'Bù' },
      Korean: { text: '아니요', romanization: 'Aniyo' },
    },
    Please: {
      English: { text: 'Please' },
      Japanese: { text: 'お願いします', romanization: 'Onegaishimasu' },
      Spanish: { text: 'Por favor' },
      French: { text: 'S’il vous plaît' },
      German: { text: 'Bitte' },
      Italian: { text: 'Per favore' },
      Chinese: { text: '请', romanization: 'Qǐng' },
      Korean: { text: '제발', romanization: 'Jebal' },
    },
    Sorry: {
      English: { text: 'Sorry' },
      Japanese: { text: 'ごめんなさい', romanization: 'Gomen nasai' },
      Spanish: { text: 'Lo siento' },
      French: { text: 'Désolé' },
      German: { text: 'Es tut mir leid' },
      Italian: { text: 'Mi dispiace' },
      Chinese: { text: '对不起', romanization: 'Duìbùqǐ' },
      Korean: { text: '미안합니다', romanization: 'Mianhamnida' },
    },
  };

  const handleTranslate = (phrase: string, lang: string) => {
    if (phrasesDatabase[phrase] && phrasesDatabase[phrase][lang]) {
      const t = phrasesDatabase[phrase][lang];
      setTranslatedText(t.text);
      setRomanization(t.romanization || '');
    } else {
      setTranslatedText('Translation not available');
      setRomanization('');
    }
  };

  const needsRomanization = () =>
    ['Japanese', 'Chinese', 'Korean'].includes(targetLanguage) && romanization;

  return (
    <div className="min-h-screen w-screen bg-[#fef7e0] p-4 flex flex-col">
      {/* Header */}
      <header className="bg-[#b99664] rounded-t-3xl p-4 flex items-center mb-6">
        <Link
          to="/"
          className="bg-[#fefcf0] text-[#2f1b14] p-2 rounded-md shadow-sm hover:shadow-md transition-all mr-3"
        >
          <ArrowLeftIcon size={18} />
        </Link>
        <div className="flex items-center">
          <div className="bg-[#b99664] border-2 border-[#fefcf0] rounded-full w-10 h-10 flex items-center justify-center mr-3">
            <GlobeIcon size={20} className="text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-lg font-bold text-[#fefcf0] font-serif leading-tight">
              Basic Greetings
            </h1>
            <p className="text-sm text-[#fefcf0] font-serif opacity-90">
              Select a phrase to translate
            </p>
          </div>
        </div>
      </header>

      {/* Language Selector */}
      <div className="mb-6">
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          className="w-full bg-[#fefcf0] border border-[#d4c4a8] rounded-lg p-3 font-semibold text-[#2f1b14] shadow-inner focus:ring-2 focus:ring-[#8b5a3c] focus:outline-none font-serif appearance-none"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.name}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Preset Greetings */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {greetings.map((phrase, idx) => (
            <button
              key={idx}
              className="bg-[#fefcf0] border border-[#d4c4a8] rounded-full px-4 py-2 text-sm shadow-sm hover:shadow-md hover:bg-[#f4f0e6] transition-all font-serif text-[#2f1b14]"
              onClick={() => handleTranslate(phrase, targetLanguage)}
            >
              {phrase}
            </button>
          ))}
        </div>
      </div>

      {/* Translation Output */}
      <div className="mb-6">
        <div className="bg-[#fefcf0] border border-[#d4c4a8] rounded-lg p-4 shadow-md">
          <h2 className="font-semibold text-[#6d5a42] font-serif mb-2">{targetLanguage}</h2>
          <div className="w-full bg-[#fefcf0] border border-[#d4c4a8] rounded px-3 py-2 h-32 font-serif text-[#2f1b14] text-[15px] overflow-y-auto whitespace-pre-wrap">
            {translatedText || 'Select a greeting to see translation...'}
            {needsRomanization() && (
              <p className="mt-2 text-sm italic text-[#6d5a42]">
                Pronunciation: {romanization}
              </p>
            )}
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(translatedText || '')}
            className="mt-2 bg-[#b99664] text-white px-4 py-2 rounded font-bold shadow-md hover:bg-[#5d3a28] transition-all font-serif"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};
