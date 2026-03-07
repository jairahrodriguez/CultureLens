import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, ChevronDownIcon, ChevronUpIcon, GlobeIcon, CompassIcon } from 'lucide-react';
import { supabase } from '../../config/supabase';


type Country = {
  countryid: number;
  countryname: string;
  traditions: string | null;
  etiquette: string | null;
  greetings: string | null;
  food: string | null;
  festivals: string | null;
  community: string | null;
};

const sections = [
  { id: 'traditions', title: 'Traditions & Customs', icon: '🏮' },
  { id: 'etiquette', title: 'Etiquette', icon: '🙏' },
  { id: 'greetings', title: 'Greetings & Phrases', icon: '👋' },
  { id: 'food', title: 'Food & Dining', icon: '🍱' },
  { id: 'festivals', title: 'Festivals & Events', icon: '🎎' },
];

const countries = [
  { id: 'japan', name: 'Japan', flag: '🇯🇵' },
  { id: 'italy', name: 'Italy', flag: '🇮🇹' },
  { id: 'morocco', name: 'Morocco', flag: '🇲🇦' },
  { id: 'india', name: 'India', flag: '🇮🇳' },
  { id: 'brazil', name: 'Brazil', flag: '🇧🇷' },
  { id: 'korea', name: 'Korea', flag: '🇰🇷' },
  { id: 'france', name: 'France', flag: '🇫🇷' },
  { id: 'peru', name: 'Peru', flag: '🇵🇪' },
  { id: 'thailand', name: 'Thailand', flag: '🇹🇭' },
  { id: 'turkey', name: 'Turkey', flag: '🇹🇷' },
  { id: 'china', name: 'China', flag: '🇨🇳' },
];

export const GuideScreen = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState('Japan');
  const [countryData, setCountryData] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string | null>('traditions');

  useEffect(() => {
    const fetchCountry = async () => {
      setLoading(true);
      setExpandedSection('traditions'); // Reset first section
      const { data, error } = await supabase
        .from<Country>('Country')
        .select('*')
        .eq('countryname', selectedCountry)
        .single();

      if (error) {
        console.error(error);
        setCountryData(null);
      } else {
        setCountryData(data);
      }
      setLoading(false);
    };
    fetchCountry();
  }, [selectedCountry]);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  if (loading) return <div>Loading content...</div>;

  return (
    <div className="min-h-screen w-screen bg-[#fef7e0] p-4 pb-20 flex flex-col">
      {/* Header */}
      <header className="bg-[#754b34] text-[#fcf8dd] p-5 rounded-t-2xl shadow-md mb-6">
        <div className="flex items-center gap-3 mb-2">
          <GlobeIcon size={24} />
          <div>
            <h1 className="text-xl font-bold font-serif">Cultural Compendium</h1>
            <p className="text-sm italic text-[#fefcf0] opacity-90">
              Traditional customs & etiquette
            </p>
          </div>
        </div>

        {/* Country Selector */}
        <div className="mt-3">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg p-3 font-semibold text-[#754b34] shadow-inner focus:ring-2 focus:ring-[#fefcf0] focus:outline-none font-serif appearance-none pr-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 15l-5-5h10l-5 5z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 10px center',
            }}
          >
            {countries.map((c) => (
              <option key={c.id} value={c.name}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Country Header */}
      <div className="bg-[#fefcf0] border border-[#d4c4a8] rounded-lg p-4 shadow-md mb-6">
        <div className="flex items-center space-x-3">
          <div className="text-4xl">
            {countries.find((c) => c.name === selectedCountry)?.flag || '🌍'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#2f1b14] font-serif">{selectedCountry}</h2>
          </div>
        </div>
      </div>

      {/* Browse Stories Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/experiences')}
          className="w-full bg-[#fefcf0] text-[#744a32] px-4 py-3 rounded-lg font-bold shadow-md hover:bg-[#f4f0e6] transition-all font-serif flex items-center justify-center"
        >
          <CompassIcon size={20} className="mr-2" /> Browse Stories
        </button>
      </div>

      {/* Sections */}
      <div className="space-y-4 mb-20">
        {sections.map((section) => (
          <div
            key={section.id}
            className="bg-[#fefcf0] border border-[#d4c4a8] rounded-lg shadow-md overflow-hidden"
          >
            <button
              className="w-full p-4 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-[#8b5a3c] focus:ring-inset"
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{section.icon}</span>
                <span className="font-bold text-[#2f1b14] font-serif">{section.title}</span>
              </div>
              {expandedSection === section.id ? (
                <ChevronUpIcon size={20} className="text-[#744a32]" />
              ) : (
                <ChevronDownIcon size={20} className="text-[#744a32]" />
              )}
            </button>

            {/* Section Content */}
            {expandedSection === section.id && (
              <div className="px-6 pb-4 space-y-3 bg-[#fefcf0] border-t border-[#e6d8be] rounded-b-lg">
                <div className="p-4 border-t border-[#d4c4a8] bg-[#fef7e0] rounded-lg">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: countryData?.[section.id as keyof Country] || 'No content available',
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
