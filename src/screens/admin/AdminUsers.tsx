import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface User {
  userid: number;
  email: string;
  firstname: string;
  lastname: string;
  contactnumber?: string;
  preferredlanguage?: string;
  usertype?: string;
}

export const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingUser, setEditingUser] = useState<Partial<User>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from('Users').select('*').order('userid', { ascending: true });
    console.log('Fetch users response:', { data, error });
    if (error) setError(error.message);
    else setUsers(data);
    setIsLoading(false);
  };

  const [showAdd, setShowAdd] = useState(false);
  const [newUser, setNewUser] = useState<Partial<User> & { password?: string }>({ email: '', firstname: '', lastname: '', contactnumber: '', preferredlanguage: '', usertype: 'Traveler', password: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const startEdit = (user: User) => {
    console.log('Starting edit for user:', user);
    setEditingId(user.userid);
    setEditingUser({ ...user });
  };

  const saveEdit = async (id: number) => {
    alert('Save button clicked for user ID: ' + id);
    try {
      console.log('Saving edit for user:', id, editingUser);
      const { data, error } = await supabase
        .from('Users')
        .update(editingUser)
        .eq('userid', id)
        .select();
      
      console.log('Update response:', { data, error });
      if (error) {
        console.error('Update error:', error);
        throw error;
      }
      
      // Refresh user list after successful update
      await fetchUsers();
      setEditingId(null);
      setEditingUser({});
      alert('✅ User updated successfully!')
    } catch (err: any) {
      console.error('Save edit error:', err);
      setError(err.message || 'Failed to update user')
      alert(`❌ Error: ${err.message || 'Failed to update user'}`)
    }
  };

  const deleteUser = async (id: number) => {
    alert('Delete button clicked for user ID: ' + id);
    if (!confirm('Delete this user?')) {
      alert('Delete cancelled');
      return;
    }
    alert('Confirmed delete, contacting database...');
    try {
      console.log('Deleting user:', id);
      const { data, error } = await supabase.from('Users').delete().eq('userid', id).select();
      
      console.log('Delete response:', { data, error });
      alert(`Delete response: data=${JSON.stringify(data)}, error=${error ? error.message : 'none'}`);
      
      if (error) {
        console.error('Delete error:', error);
        throw error;
      }
      
      // Refresh user list after successful delete
      alert('Delete succeeded, refreshing user list...');
      await fetchUsers();
      alert('🗑️ User deleted successfully!')
    } catch (err: any) {
      console.error('Delete error:', err);
      setError(err.message || 'Failed to delete user')
      alert(`❌ Error: ${err.message || err.toString() || 'Failed to delete user'}`)
    }
  };

  const createUser = async () => {
    try {
      if (!newUser.email || !newUser.firstname || !newUser.lastname || !newUser.password) {
        alert('Email, First name, Last name, and Password are all required.')
        return
      }
      setIsLoading(true)
      const payload: any = {
        email: newUser.email,
        password: newUser.password,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        contactnumber: newUser.contactnumber || null,
        preferredlanguage: newUser.preferredlanguage || 'English',
        usertype: newUser.usertype || 'Traveler'
      }
      const { data, error } = await supabase.from('Users').insert([payload]).select()
      if (error) throw error
      if (data && data.length > 0) {
        setUsers(prev => [...prev, data[0] as User])
        setShowAdd(false)
        setNewUser({ email: '', firstname: '', lastname: '', contactnumber: '', preferredlanguage: '', usertype: 'Traveler', password: '' })
        alert('✅ User created successfully!')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create user')
      alert(`❌ Error: ${err.message || 'Failed to create user'}`)
    } finally {
      setIsLoading(false)
    }
  }

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

      <h1 className="text-3xl font-bold text-[#754b34] mb-6 font-serif">Manage Users</h1>

      <div className="mb-4 flex items-center justify-between">
        <div>
          <button onClick={() => setShowAdd(!showAdd)} className="px-3 py-2 bg-[#2f6f44] text-white rounded mr-2">Add User</button>
        </div>
      </div>

      {showAdd && (
        <div className="mb-4 p-4 bg-[#fffef6] border rounded">
          <div className="grid grid-cols-2 gap-2">
            <input placeholder="Email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} className="p-2 border" />
            <input placeholder="First name" value={newUser.firstname} onChange={e => setNewUser({ ...newUser, firstname: e.target.value })} className="p-2 border" />
            <input placeholder="Last name" value={newUser.lastname} onChange={e => setNewUser({ ...newUser, lastname: e.target.value })} className="p-2 border" />
            <input type="password" placeholder="Password" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} className="p-2 border" />
            <input placeholder="Contact number" value={newUser.contactnumber} onChange={e => setNewUser({ ...newUser, contactnumber: e.target.value.replace(/[^0-9+\-()\s]/g, '') })} className="p-2 border" />
            <input placeholder="Preferred language" value={newUser.preferredlanguage} onChange={e => setNewUser({ ...newUser, preferredlanguage: e.target.value })} className="p-2 border" />
            <select value={newUser.usertype} onChange={e => setNewUser({ ...newUser, usertype: e.target.value })} className="p-2 border">
              <option value="Traveler">Traveler</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="mt-3">
            <button onClick={createUser} className="px-3 py-2 bg-[#754b34] text-white rounded mr-2">Create</button>
            <button onClick={() => setShowAdd(false)} className="px-3 py-2 border rounded">Cancel</button>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">{error}</div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-[#d4c4a8] rounded-lg bg-[#fcf8dd]">
          <thead>
            <tr className="bg-[#f5eccb]">
              <th className="px-2 py-2 border-b border-[#d4c4a8]">Email</th>
              <th className="px-2 py-2 border-b border-[#d4c4a8]">First Name</th>
              <th className="px-2 py-2 border-b border-[#d4c4a8]">Last Name</th>
              <th className="px-2 py-2 border-b border-[#d4c4a8]">Contact Number</th>
              <th className="px-2 py-2 border-b border-[#d4c4a8]">Preferred Language</th>
              <th className="px-2 py-2 border-b border-[#d4c4a8]">User Type</th>
              <th className="px-2 py-2 border-b border-[#d4c4a8]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="text-center p-4">
                  Loading users...
                </td>
              </tr>
            ) : (
              users.map(user =>
                editingId === user.userid ? (
                  <tr key={user.userid} className="text-sm text-[#754b34]">
                    {['email', 'firstname', 'lastname', 'contactnumber', 'preferredlanguage', 'usertype'].map(field => (
                      <td key={field} className="p-1 border-b border-[#d4c4a8]">
                        <input
                          type="text"
                          value={(editingUser as any)[field] || ''}
                          onChange={e => setEditingUser({ ...editingUser, [field]: e.target.value })}
                          className="p-1 border border-[#d4c4a8] rounded-lg w-full"
                        />
                      </td>
                    ))}
                    <td className="flex gap-1 p-1 border-b border-[#d4c4a8]">
                      <button onClick={() => saveEdit(user.userid)} className="text-green-600 hover:text-green-800">
                        <SaveIcon size={16} />
                      </button>
                      <button onClick={() => setEditingId(null)} className="text-red-600 hover:text-red-800">
                        <XIcon size={16} />
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={user.userid} className="text-sm text-[#754b34]">
                    <td className="p-2 border-b border-[#d4c4a8]">{user.email}</td>
                    <td className="p-2 border-b border-[#d4c4a8]">{user.firstname}</td>
                    <td className="p-2 border-b border-[#d4c4a8]">{user.lastname}</td>
                    <td className="p-2 border-b border-[#d4c4a8]">{user.contactnumber}</td>
                    <td className="p-2 border-b border-[#d4c4a8]">{user.preferredlanguage}</td>
                    <td className="p-2 border-b border-[#d4c4a8]">{user.usertype}</td>
                    <td className="flex gap-1 p-2 border-b border-[#d4c4a8]">
                      <button onClick={() => startEdit(user)} className="text-blue-600 hover:text-blue-800">
                        <EditIcon size={16} />
                      </button>
                      <button onClick={() => deleteUser(user.userid)} className="text-red-600 hover:text-red-800">
                        <TrashIcon size={16} />
                      </button>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
