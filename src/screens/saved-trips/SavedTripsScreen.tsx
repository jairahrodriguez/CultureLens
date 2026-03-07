import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartIcon, MapPinIcon, ArrowLeftIcon } from 'lucide-react';
const initialSavedTrips = [{
  id: 1,
  name: 'Tokyo Adventure',
  country: 'Japan',
  description: 'Explore the vibrant streets of Tokyo, visit ancient temples, and enjoy authentic sushi.',
  details: 'This 7-day trip includes exploring Shibuya Crossing, visiting the Senso-ji Temple, and dining in Tsukiji Market. Best time to visit: Spring (March–May).',
  image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=500&q=60',
  emoji: '🗼'
}, {
  id: 2,
  name: 'Paris Getaway',
  country: 'France',
  description: 'Romantic walks along the Seine, visits to the Louvre, and coffee at charming cafés.',
  details: 'Experience the Eiffel Tower at night, cruise along the Seine, and indulge in French pastries at local cafés. Ideal for a 4-day romantic escape.',
  image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=500&q=60',
  emoji: '🎨'
}, {
  id: 3,
  name: 'Bali Retreat',
  country: 'Indonesia',
  description: 'Relax on pristine beaches, visit ancient temples, and experience Balinese culture.',
  details: 'Includes yoga retreats in Ubud, temple visits, and local food markets. Best for a slow-paced, rejuvenating 5-day getaway.',
  image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=500&q=60',
  emoji: '🏝️'
}];
export const SavedTripsScreen = () => {
  const navigate = useNavigate();
  const [savedTrips, setSavedTrips] = useState(initialSavedTrips);
  const [expandedTripId, setExpandedTripId] = useState<number | null>(null);
  const handleRemoveTrip = (tripId: number) => {
    setSavedTrips(savedTrips.filter(trip => trip.id !== tripId));
  };
  const handleViewDetails = (tripId: number) => {
    setExpandedTripId(expandedTripId === tripId ? null : tripId);
  };
  return <div className="min-h-screen w-screen p-6 flex flex-col font-serif" style={{
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
          <h1 className="text-2xl font-bold text-[fefcf0]">Saved Trips</h1>
          <p className="text-[#fefcf0]/70 italic">Your travel wishlist</p>
        </div>
      </header>

      {/* Saved Trips */}
      <div className="space-y-6">
        {savedTrips.length > 0 ? savedTrips.map(trip => <div key={trip.id} className="bg-[#fefcf0] border border-[#754b34]/20 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="w-full md:w-1/3 h-48 md:h-auto relative">
                  <img src={trip.image} alt={trip.name} className="w-full h-full object-cover" onError={e => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.innerHTML = `<div class='w-full h-full flex items-center justify-center text-4xl bg-[#e8dcc6]'>${trip.emoji}</div>`;
            }} />
                  <button onClick={() => handleRemoveTrip(trip.id)} className="absolute top-3 right-3 p-2 bg-[#fefcf0] rounded-full shadow-md hover:bg-[#f8e398] transition-colors" aria-label="Remove from saved trips">
                    <HeartIcon size={20} className="text-[#754b34]" fill="#754b34" />
                  </button>
                </div>

                {/* Trip Info */}
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-xl text-[#754b34]">
                        {trip.name}
                      </h3>
                      <div className="flex items-center text-[#754b34]/70 mb-2">
                        <MapPinIcon size={16} className="mr-1" />
                        <span>{trip.country}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[#754b34]/80 mb-4">{trip.description}</p>

                  <div className="flex justify-end">
                    <button onClick={() => handleViewDetails(trip.id)} className="px-4 py-2 bg-[#754b34] text-[#fefcf0] rounded-md font-bold shadow-md hover:bg-[#5f3b29] transition-colors">
                      {expandedTripId === trip.id ? 'Hide Details' : 'View Details'}
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {expandedTripId === trip.id && <div className="mt-4 p-3 border-t border-[#d4c4a8] bg-[#fffaf0] rounded-md shadow-inner">
                      <p className="text-[#4b3b2a] text-sm leading-relaxed">
                        {trip.details}
                      </p>
                    </div>}
                </div>
              </div>
            </div>) : <div className="text-center py-10">
            <div className="text-4xl mb-4">🧳</div>
            <h3 className="text-xl font-bold text-[#754b34] mb-2">
              No saved trips yet
            </h3>
            <p className="text-[#754b34]/70 mb-6">
              Start exploring and save your dream destinations!
            </p>
            <button onClick={() => navigate('/search')} className="px-4 py-2 bg-[#754b34] text-[#fefcf0] rounded-md font-bold shadow-md hover:bg-[#5f3b29] transition-colors">
              Discover Destinations
            </button>
          </div>}
      </div>
    </div>;
};