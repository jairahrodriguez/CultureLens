import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Country {
  countryid: number;
  countryname: string;
  traditions?: string;
  festivals?: string;
  dresscode?: string;
  greetings?: string;
  etiquette?: string;
  food?: string;
  community?: string;
}

export const AdminCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [newCountry, setNewCountry] = useState<Partial<Country>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingCountry, setEditingCountry] = useState<Partial<Country>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchCountries = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from('Country').select('*').order('countryid', { ascending: true });
    if (error) setError(error.message);
    else setCountries(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const addCountry = async () => {
    if (!newCountry.countryname?.trim()) return;
    if (!window.confirm(`Are you sure you want to add "${newCountry.countryname}"?`)) return;

    const { data, error } = await supabase.from('Country').insert([newCountry]).select();
    if (error) setError(error.message);
    else {
      setCountries([...countries, ...data]);
      setNewCountry({});
    }
  };

  const startEdit = (country: Country) => {
    setEditingId(country.countryid);
    setEditingCountry({ ...country });
  };

  const saveEdit = async (id: number) => {
    if (!editingCountry.countryname?.trim()) return;
    if (!window.confirm(`Are you sure you want to save changes to "${editingCountry.countryname}"?`)) return;

    const { data, error } = await supabase
      .from('Country')
      .update(editingCountry)
      .eq('countryid', id)
      .select();
    if (error) setError(error.message);
    else {
      setCountries(countries.map(c => (c.countryid === id ? data[0] : c)));
      setEditingId(null);
      setEditingCountry({});
    }
  };

  const deleteCountry = async (id: number) => {
    const country = countries.find(c => c.countryid === id);
    if (!country) return;
    if (!window.confirm(`Are you sure you want to delete "${country.countryname}"?`)) return;

    const { error } = await supabase.from('Country').delete().eq('countryid', id);
    if (error) setError(error.message);
    else setCountries(countries.filter(c => c.countryid !== id));
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

      <h1 className="text-3xl font-bold text-[#754b34] mb-6 font-serif">Manage Countries</h1>

      {/* Add Country Form */}
      <div className="flex flex-wrap gap-2 mb-4 p-4 bg-[#fcf8dd] rounded-lg border border-[#d4c4a8]">
        {['countryname', 'traditions', 'festivals', 'dresscode', 'greetings', 'etiquette', 'food', 'community'].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={(newCountry as any)[field] || ''}
            onChange={(e) => setNewCountry({ ...newCountry, [field]: e.target.value })}
            className="p-2 border border-[#d4c4a8] rounded-lg flex-1 min-w-[120px]"
          />
        ))}
        <button onClick={addCountry} className="bg-[#754b34] text-[#fefcf0] px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-[#5d3a28]">
          <PlusIcon size={16} /> Add
        </button>
      </div>

      {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">{error}</div>}

      {/* Country Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-[#d4c4a8] rounded-lg bg-[#fcf8dd]">
          <thead>
            <tr className="bg-[#f5eccb]">
              <th className="px-2 py-2 border-b border-[#d4c4a8]">Name</th>
              <th className="px-2 py-2 border-b border-[#d4c4a8]">Traditions</th>
              <th className="px-2 py-2 border-b border-[#d4c4a8]">Festivals</th>
              <th className="px-2 py-2 border-b border-[#d4c4a8]">Dresscode</th>
              <th className="px-2 py-2 border-b border-[#d4c4a8]">Greetings</th>
              <th className="px-2 py-2 border-b border-[#d4c4a8]">Etiquette</th>
              <th className="px-2 py-2 border-b border-[#d4c4a8]">Food</th>
              <th className="px-2 py-2 border-b border-[#d4c4a8]">Community</th>
              <th className="px-2 py-2 border-b border-[#d4c4a8]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={9} className="text-center p-4">Loading countries...</td>
              </tr>
            ) : (
              countries.map((country) => (
                <tr key={country.countryid} className="text-sm text-[#754b34]">
                  {editingId === country.countryid ? (
                    <>
                      {['countryname', 'traditions', 'festivals', 'dresscode', 'greetings', 'etiquette', 'food', 'community'].map((field) => (
                        <td key={field} className="p-1 border-b border-[#d4c4a8]">
                          <input
                            type="text"
                            value={(editingCountry as any)[field] || ''}
                            onChange={(e) => setEditingCountry({ ...editingCountry, [field]: e.target.value })}
                            className="p-1 border border-[#d4c4a8] rounded-lg w-full"
                          />
                        </td>
                      ))}
                      <td className="flex gap-1 p-1 border-b border-[#d4c4a8]">
                        <button onClick={() => saveEdit(country.countryid)} className="text-green-600 hover:text-green-800">
                          <SaveIcon size={16} />
                        </button>
                        <button onClick={() => setEditingId(null)} className="text-red-600 hover:text-red-800">
                          <XIcon size={16} />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-2 border-b border-[#d4c4a8]">{country.countryname}</td>
                      <td className="p-2 border-b border-[#d4c4a8]">{country.traditions}</td>
                      <td className="p-2 border-b border-[#d4c4a8]">{country.festivals}</td>
                      <td className="p-2 border-b border-[#d4c4a8]">{country.dresscode}</td>
                      <td className="p-2 border-b border-[#d4c4a8]">{country.greetings}</td>
                      <td className="p-2 border-b border-[#d4c4a8]">{country.etiquette}</td>
                      <td className="p-2 border-b border-[#d4c4a8]">{country.food}</td>
                      <td className="p-2 border-b border-[#d4c4a8]">{country.community}</td>
                      <td className="flex gap-1 p-2 border-b border-[#d4c4a8]">
                        <button onClick={() => startEdit(country)} className="text-blue-600 hover:text-blue-800">
                          <EditIcon size={16} />
                        </button>
                        <button onClick={() => deleteCountry(country.countryid)} className="text-red-600 hover:text-red-800">
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
