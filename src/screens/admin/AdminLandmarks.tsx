import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Landmark {
  landmarkid: number;
  countryid?: number;
  landmarkname?: string;
  description?: string;
  culturaletiquette?: string;
  image?: string;
}

interface Country {
  countryid: number;
  countryname: string;
}

export const AdminLandmarks = () => {
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [newLandmark, setNewLandmark] = useState<Partial<Landmark>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingLandmark, setEditingLandmark] = useState<Partial<Landmark>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch landmarks
  const fetchLandmarks = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from('Landmark').select('*').order('landmarkid', { ascending: true });
    if (error) setError(error.message);
    else setLandmarks(data);
    setIsLoading(false);
  };

  // Fetch countries for dropdown
  const fetchCountries = async () => {
    const { data, error } = await supabase.from('Country').select('countryid, countryname').order('countryid', { ascending: true });
    if (!error && data) setCountries(data);
  };

  useEffect(() => {
    fetchLandmarks();
    fetchCountries();
  }, []);

  const addLandmark = async () => {
    if (!newLandmark.landmarkname?.trim()) return;
    const { data, error } = await supabase.from('Landmark').insert([newLandmark]).select();
    if (error) setError(error.message);
    else {
      setLandmarks([...landmarks, ...data]);
      setNewLandmark({});
    }
  };

  const startEdit = (landmark: Landmark) => {
    setEditingId(landmark.landmarkid);
    setEditingLandmark({ ...landmark });
  };

  const saveEdit = async (id: number) => {
    if (!editingLandmark.landmarkname?.trim()) return;
    const { data, error } = await supabase.from('Landmark').update(editingLandmark).eq('landmarkid', id).select();
    if (error) setError(error.message);
    else {
      setLandmarks(landmarks.map(l => (l.landmarkid === id ? data[0] : l)));
      setEditingId(null);
      setEditingLandmark({});
    }
  };

  const deleteLandmark = async (id: number) => {
    const { error } = await supabase.from('Landmark').delete().eq('landmarkid', id);
    if (error) setError(error.message);
    else setLandmarks(landmarks.filter(l => l.landmarkid !== id));
  };

  return (
    <div className="min-h-screen w-screen bg-[#fef7e0] p-8 flex flex-col">
      {/* Back Button */}
      <center>
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="mb-4 px-4 py-2 bg-[#754b34] text-[#fefcf0] rounded-lg font-serif font-semibold hover:bg-[#5d3a28] transition-all"
        >
          Back to Dashboard
        </button>
      </center>

      <h1 className="text-3xl font-bold text-[#754b34] mb-6 font-serif">Manage Landmarks</h1>

      {/* Add Landmark Form */}
      <div className="flex flex-wrap gap-2 mb-4 p-4 bg-[#fcf8dd] rounded-lg border border-[#d4c4a8]">
        <select
          value={newLandmark.countryid || ''}
          onChange={(e) => setNewLandmark({ ...newLandmark, countryid: Number(e.target.value) })}
          className="p-2 border border-[#d4c4a8] rounded-lg min-w-[120px]"
        >
          <option value="">Select Country</option>
          {countries.map(c => (
            <option key={c.countryid} value={c.countryid}>{c.countryname}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Landmark Name"
          value={newLandmark.landmarkname || ''}
          onChange={(e) => setNewLandmark({ ...newLandmark, landmarkname: e.target.value })}
          className="p-2 border border-[#d4c4a8] rounded-lg min-w-[120px]"
        />
        <input
          type="text"
          placeholder="Description"
          value={newLandmark.description || ''}
          onChange={(e) => setNewLandmark({ ...newLandmark, description: e.target.value })}
          className="p-2 border border-[#d4c4a8] rounded-lg min-w-[120px]"
        />
        <input
          type="text"
          placeholder="Cultural Etiquette"
          value={newLandmark.culturaletiquette || ''}
          onChange={(e) => setNewLandmark({ ...newLandmark, culturaletiquette: e.target.value })}
          className="p-2 border border-[#d4c4a8] rounded-lg min-w-[120px]"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newLandmark.image || ''}
          onChange={(e) => setNewLandmark({ ...newLandmark, image: e.target.value })}
          className="p-2 border border-[#d4c4a8] rounded-lg min-w-[120px]"
        />
        <button onClick={addLandmark} className="bg-[#754b34] text-[#fefcf0] px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-[#5d3a28]">
          <PlusIcon size={16} /> Add
        </button>
      </div>

      {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">{error}</div>}

      {/* Landmark Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-[#d4c4a8] rounded-lg bg-[#fcf8dd]">
          <thead>
            <tr className="bg-[#f5eccb]">
              <th className="px-2 py-2 border-b border-[#d4c4a8]">Country</th>
              <th className="px-2 py-2 border-b border-[#d4c4a8]">Landmark Name</th>
              <th className="px-2 py-2 border-b border-[#d4c4a8]">Description</th>
              <th className="px-2 py-2 border-b border-[#d4c4a8]">Cultural Etiquette</th>
              <th className="px-2 py-2 border-b border-[#d4c4a8]">Image</th>
              <th className="px-2 py-2 border-b border-[#d4c4a8]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center p-4">Loading landmarks...</td>
              </tr>
            ) : (
              landmarks.map(l => (
                <tr key={l.landmarkid} className="text-sm text-[#754b34]">
                  {editingId === l.landmarkid ? (
                    <>
                      <td className="p-1 border-b border-[#d4c4a8]">
                        <select
                          value={editingLandmark.countryid || ''}
                          onChange={(e) => setEditingLandmark({ ...editingLandmark, countryid: Number(e.target.value) })}
                          className="p-1 border border-[#d4c4a8] rounded-lg w-full"
                        >
                          <option value="">Select Country</option>
                          {countries.map(c => (
                            <option key={c.countryid} value={c.countryid}>{c.countryname}</option>
                          ))}
                        </select>
                      </td>
                      <td className="p-1 border-b border-[#d4c4a8]">
                        <input
                          type="text"
                          value={editingLandmark.landmarkname || ''}
                          onChange={(e) => setEditingLandmark({ ...editingLandmark, landmarkname: e.target.value })}
                          className="p-1 border border-[#d4c4a8] rounded-lg w-full"
                        />
                      </td>
                      <td className="p-1 border-b border-[#d4c4a8]">
                        <input
                          type="text"
                          value={editingLandmark.description || ''}
                          onChange={(e) => setEditingLandmark({ ...editingLandmark, description: e.target.value })}
                          className="p-1 border border-[#d4c4a8] rounded-lg w-full"
                        />
                      </td>
                      <td className="p-1 border-b border-[#d4c4a8]">
                        <input
                          type="text"
                          value={editingLandmark.culturaletiquette || ''}
                          onChange={(e) => setEditingLandmark({ ...editingLandmark, culturaletiquette: e.target.value })}
                          className="p-1 border border-[#d4c4a8] rounded-lg w-full"
                        />
                      </td>
                      <td className="p-1 border-b border-[#d4c4a8]">
                        <input
                          type="text"
                          value={editingLandmark.image || ''}
                          onChange={(e) => setEditingLandmark({ ...editingLandmark, image: e.target.value })}
                          className="p-1 border border-[#d4c4a8] rounded-lg w-full"
                        />
                      </td>
                      <td className="flex gap-1 p-1 border-b border-[#d4c4a8]">
                        <button onClick={() => saveEdit(l.landmarkid)} className="text-green-600 hover:text-green-800">
                          <SaveIcon size={16} />
                        </button>
                        <button onClick={() => setEditingId(null)} className="text-red-600 hover:text-red-800">
                          <XIcon size={16} />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-2 border-b border-[#d4c4a8]">{countries.find(c => c.countryid === l.countryid)?.countryname || ''}</td>
                      <td className="p-2 border-b border-[#d4c4a8]">{l.landmarkname}</td>
                      <td className="p-2 border-b border-[#d4c4a8]">{l.description}</td>
                      <td className="p-2 border-b border-[#d4c4a8]">{l.culturaletiquette}</td>
                      <td className="p-2 border-b border-[#d4c4a8]">{l.image}</td>
                      <td className="flex gap-1 p-2 border-b border-[#d4c4a8]">
                        <button onClick={() => startEdit(l)} className="text-blue-600 hover:text-blue-800">
                          <EditIcon size={16} />
                        </button>
                        <button onClick={() => deleteLandmark(l.landmarkid)} className="text-red-600 hover:text-red-800">
                          <TrashIcon size={16} />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
