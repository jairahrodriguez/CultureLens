import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  SearchIcon, PlaneTakeoffIcon, BookOpenIcon, UsersIcon, ChevronRight, HeartIcon, X, GlobeIcon 
} from 'lucide-react';
import { supabase } from '../../config/supabase';
import { TranslateScreen } from '../translate/TranslateScreen';

export const HomeScreen = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [savedDestinations, setSavedDestinations] = useState<number[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<any | null>(null);
  const [landmarks, setLandmarks] = useState<any[]>([]);

  const user = { name: 'Traveler' };

  // Fetch current user
  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: userInfo } = await supabase
      .from('Users')
      .select('*')
      .eq('email', user.email)
      .single();
    setUserData(userInfo);
  };

  // Fetch landmarks including images
  const fetchLandmarks = async () => {
    const { data, error } = await supabase
      .from('Landmark')
      .select('landmarkid, landmarkname, description, image')
      .order('landmarkid', { ascending: false });
    if (error) console.log(error);
    else setLandmarks(data || []);
  };

  // Fetch saved landmarks
  const fetchSavedLandmarks = async () => {
    if (!userData) return;
    const { data } = await supabase
      .from('UserSavedLandmarks')
      .select('landmarkid')
      .eq('userid', userData.userid);
    setSavedDestinations((data || []).map(d => d.landmarkid));
  };

  useEffect(() => { fetchUser(); }, []);
  useEffect(() => { fetchLandmarks(); fetchSavedLandmarks(); }, [userData]);

  const toggleSaveDestination = async (id: number) => {
    if (!userData) return;
    try {
      const { data: existing } = await supabase
        .from('UserSavedLandmarks')
        .select('id')
        .eq('userid', userData.userid)
        .eq('landmarkid', id)
        .single();

      if (existing) {
        await supabase.from('UserSavedLandmarks').delete().eq('id', existing.id);
        setSavedDestinations(prev => prev.filter(d => d !== id));
      } else {
        await supabase.from('UserSavedLandmarks').insert({ userid: userData.userid, landmarkid: id });
        setSavedDestinations(prev => [...prev, id]);
      }
    } catch (err) {
      console.error('Error saving landmark:', err);
    }
  };

  const handleViewDetails = (destination: any) => setSelectedDestination(destination);
  const closeModal = () => setSelectedDestination(null);

  const quickActions = [
    { id: 1, icon: SearchIcon, label: 'Discover', description: 'Find destinations', path: '/search', color: 'bg-[#754b34]' },
    { id: 2, icon: PlaneTakeoffIcon, label: 'Plan Trip', description: 'Create itinerary', path: '/plan-trip', color: 'bg-[#8b5a3c]' },
    { id: 3, icon: UsersIcon, label: 'Find Buddy', description: 'Travel together', path: '/buddy', color: 'bg-[#754b34]' },
    { id: 4, icon: BookOpenIcon, label: 'Guide', description: 'Local customs', path: '/guide', color: 'bg-[#8b5a3c]' },
    { id: 5, icon: GlobeIcon, label: 'Quick Translate', description: 'Travel Interpreter', path: '/translate', color: 'bg-[#b99664]', fullWidth: true }
  ];

  return (
    <div className="min-h-screen w-screen bg-[#fef7e0] flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#754b34] to-[#8b5a3c] text-[#fefcf0] p-8 rounded-b-3xl shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold font-serif mb-2">Welcome back, {userData?.firstname || user.name}</h1>
          <p className="text-lg opacity-90 font-serif">Ready for your next adventure?</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Quick Actions */}
        <section>
          <h2 className="text-2xl text-[#2f1b14] font-serif font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map(action => {
              const Icon = action.icon;
              const spanClass = action.fullWidth ? 'col-span-2' : '';
              return (
                <button
                  key={action.id}
                  onClick={() => navigate(action.path)}
                  className={`${action.color} text-[#fefcf0] p-6 rounded-2xl shadow-md hover:shadow-lg transition-all hover:scale-105 text-left ${spanClass}`}
                >
                  <Icon className="w-8 h-8 mb-3" />
                  <h3 className="text-lg font-bold font-serif mb-1">{action.label}</h3>
                  <p className="text-sm opacity-90 font-serif">{action.description}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Featured Landmarks */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl text-[#2f1b14] font-serif font-bold">Featured Destinations</h2>
            <button
              onClick={() => navigate('/search')}
              className="text-[#754b34] font-serif font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            >
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {landmarks.slice(0, 3).map(destination => (
              <div
                key={destination.landmarkid}
                className="bg-[#fefcf0] rounded-2xl border border-[#d4c4a8] overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex">
                  <div className="w-36 h-36 flex-shrink-0">
                    <img
                      src={destination.image || 'https://via.placeholder.com/150'}
                      alt={destination.landmarkname}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-[#2f1b14] font-serif">{destination.landmarkname}</h4>
                      <button
                        onClick={() => toggleSaveDestination(destination.landmarkid)}
                        className="text-[#744a32] hover:scale-110 transition-transform"
                      >
                        <HeartIcon
                          size={18}
                          fill={savedDestinations.includes(destination.landmarkid) ? '#744a32' : 'none'}
                          stroke="#744a32"
                        />
                      </button>
                    </div>
                    <p className="text-[#2f1b14] font-serif text-sm leading-relaxed">
                      {destination.description?.slice(0, 80) || 'No description'}...
                    </p>
                    <button
                      onClick={() => handleViewDetails(destination)}
                      className="mt-2 text-sm text-[#744a32] font-serif underline hover:text-[#2f1b14] transition-colors"
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Destination Modal */}
      {selectedDestination && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#fefcf0] w-[90%] max-w-md rounded-2xl shadow-lg p-6 relative">
            <button onClick={closeModal} className="absolute top-3 right-3 text-[#744a32] hover:text-[#2f1b14]">
              <X size={20} />
            </button>
            <img
              src={selectedDestination.image || 'https://via.placeholder.com/300'}
              alt={selectedDestination.landmarkname}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-2xl font-serif font-bold text-[#2f1b14] mb-2">{selectedDestination.landmarkname}</h3>
            <p className="text-sm text-[#2f1b14] font-serif leading-relaxed mb-4">{selectedDestination.description || 'No description available.'}</p>
            <button
              onClick={() => toggleSaveDestination(selectedDestination.landmarkid)}
              className={`w-full py-2 rounded-xl font-serif font-semibold transition-all shadow-md ${
                savedDestinations.includes(selectedDestination.landmarkid)
                  ? 'bg-[#744a32] text-[#fefcf0] hover:bg-[#8b5a3c]'
                  : 'bg-[#fefcf0] border border-[#744a32] text-[#744a32] hover:bg-[#f9f2e7]'
              }`}
            >
              {savedDestinations.includes(selectedDestination.landmarkid) ? 'Saved' : 'Save Destination'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
