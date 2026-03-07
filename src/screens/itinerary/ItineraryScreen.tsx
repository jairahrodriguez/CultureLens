import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPinIcon, CalendarIcon, ArrowLeftIcon, PlusIcon, X } from 'lucide-react';
// Mock itinerary data
const initialItineraries = [{
  id: 1,
  name: 'Tokyo Spring Journey',
  country: 'Japan',
  description: '5-day itinerary exploring cherry blossoms, sushi tours, and visits to Mt. Fuji.',
  image: 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=500&q=60',
  emoji: '🌸'
}, {
  id: 2,
  name: 'Paris Art & Culture',
  country: 'France',
  description: '3-day itinerary featuring the Louvre, Montmartre art walks, and café hopping.',
  image: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=500&q=60',
  emoji: '🎨'
}, {
  id: 3,
  name: 'Bali Wellness Retreat',
  country: 'Indonesia',
  description: 'Relaxation-focused itinerary with yoga sessions, temples, and tropical cuisine.',
  image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=500&q=60',
  emoji: '🌴'
}];
export const ItineraryScreen = () => {
  const navigate = useNavigate();
  const [itineraries, setItineraries] = useState(initialItineraries);
  const [selectedItinerary, setSelectedItinerary] = useState<any>(null);
  const handleViewDetails = (itinerary: any) => {
    setSelectedItinerary(itinerary);
  };
  const closeModal = () => {
    setSelectedItinerary(null);
  };
  return <div className="min-h-screen w-screen p-6 flex flex-col font-serif relative" style={{
    backgroundColor: '#fcf8dd',
    backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(117, 75, 52, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(254, 252, 240, 0.3) 0%, transparent 50%)
        `,
    fontFamily: "'Josefin Slab', serif"
  }}>
      {/* Header */}
      <header className="bg-[#b7965f] text-white p-4 rounded-t flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="mr-4 p-2 rounded-full border border-[#fefcf0] text-[#754b34] hover:bg-[#754b34] hover:text-[#fefcf0] transition-colors">
          <ArrowLeftIcon size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[#fefcf0]">My Itineraries</h1>
          <p className="text-[#fefcf0]/70 italic">
            Plan, organize, and relive your journeys
          </p>
        </div>
      </header>
      {/* Itinerary List */}
      <div className="space-y-6">
        {itineraries.length > 0 ? itineraries.map(itinerary => <div key={itinerary.id} className="bg-[#fefcf0] border border-[#754b34]/20 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="w-full md:w-1/3 h-48 md:h-auto relative">
                  <img src={itinerary.image} alt={itinerary.name} className="w-full h-full object-cover" onError={e => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-4xl bg-[#e8dcc6]">${itinerary.emoji}</div>`;
            }} />
                </div>
                {/* Details */}
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-xl text-[#754b34]">
                        {itinerary.name}
                      </h3>
                      <div className="flex items-center text-[#754b34]/70 mb-2">
                        <MapPinIcon size={16} className="mr-1" />
                        <span>{itinerary.country}</span>
                      </div>
                    </div>
                    <CalendarIcon size={20} className="text-[#754b34]/60 hidden md:block" />
                  </div>
                  <p className="text-[#754b34]/80 mb-4 flex-grow">
                    {itinerary.description}
                  </p>
                  <div className="flex justify-end">
                    <button onClick={() => handleViewDetails(itinerary)} className="px-4 py-2 bg-[#754b34] text-[#fefcf0] rounded-md font-bold shadow-md hover:bg-[#5f3b29] transition-colors">
                      View Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>) : <div className="text-center py-10">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold text-[#754b34] mb-2">
              No itineraries yet
            </h3>
            <p className="text-[#754b34]/70 mb-6">
              Start crafting your next travel experience!
            </p>
            <button onClick={() => navigate('/plan-trip')} className="px-4 py-2 bg-[#754b34] text-[#fefcf0] rounded-md font-bold shadow-md hover:bg-[#5f3b29] transition-colors">
              Create New Itinerary
            </button>
          </div>}
      </div>
      {/* Add Experience Button (Fixed) - Moved higher */}
      <div className="fixed bottom-28 right-4 z-40">
        <Link to="/plan-trip" className="bg-[#744a32] text-white p-4 rounded-full shadow-lg hover:bg-[#5d3a28] transition-colors flex items-center justify-center">
          <PlusIcon size={24} />
        </Link>
      </div>
      {/* Itinerary Details Modal */}
      {selectedItinerary && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#fefcf0] w-full max-w-2xl rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-[#fefcf0] p-4 border-b border-[#d4c4a8] flex justify-between items-center">
              <h3 className="text-xl font-serif font-bold text-[#2f1b14]">
                Itinerary Details
              </h3>
              <button onClick={closeModal} className="text-[#744a32] hover:text-[#2f1b14] transition-colors">
                <X size={24} />
              </button>
            </div>
            {/* Image */}
            <div className="w-full h-64">
              <img src={selectedItinerary.image} alt={selectedItinerary.name} className="w-full h-full object-cover" onError={e => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-6xl bg-[#e8dcc6]">${selectedItinerary.emoji}</div>`;
          }} />
            </div>
            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Title and Country */}
              <div>
                <h4 className="text-2xl font-serif font-bold text-[#2f1b14] mb-2">
                  {selectedItinerary.name}
                </h4>
                <div className="flex items-center text-[#6d5a42] font-serif">
                  <MapPinIcon size={16} className="mr-1" />
                  <span>{selectedItinerary.country}</span>
                </div>
              </div>
              {/* Description */}
              <div>
                <h5 className="font-serif font-bold text-[#2f1b14] mb-2">
                  Overview
                </h5>
                <p className="text-[#2f1b14] font-serif leading-relaxed">
                  {selectedItinerary.description}
                </p>
              </div>
              {/* Placeholder for future features */}
              <div className="bg-[#f4f0e6] p-4 rounded-lg">
                <p className="text-sm text-[#6d5a42] font-serif italic text-center">
                  Detailed day-by-day plans coming soon!
                </p>
              </div>
              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button onClick={() => {
              closeModal();
              navigate('/plan-trip');
            }} className="flex-1 bg-[#744a32] text-[#fefcf0] py-3 rounded-lg font-serif font-bold shadow-md hover:bg-[#5d3a28] transition-colors">
                  Edit Itinerary
                </button>
                <button onClick={closeModal} className="flex-1 bg-[#fefcf0] border-2 border-[#744a32] text-[#744a32] py-3 rounded-lg font-serif font-bold hover:bg-[#f9f2e7] transition-colors">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};