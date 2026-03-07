import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CompassIcon, UserIcon, MailIcon, PhoneIcon, LockIcon } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../config/supabase';

interface RegisterScreenProps {
  onRegister: (type: 'Traveler' | 'Admin') => void;
}

export const RegisterScreen = ({ onRegister }: RegisterScreenProps) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [userType, setUserType] = useState<'Traveler' | 'Admin'>('Traveler');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isSupabaseConfigured()) {
      setError('Supabase is not configured. Check your .env file.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    try {
      // Register in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (authError) throw authError;

      // Insert into Users table
      const { data: userInsert, error: userError } = await supabase
        .from('Users')
        .insert([
          {
            email,
            password,
            firstname: firstName,
            lastname: lastName,
            contactnumber: contactNumber,
            preferredlanguage: 'English',
            usertype: userType,
          },
        ])
        .select('userid');

      if (userError || !userInsert?.[0]?.userid)
        throw userError || new Error('Failed to create user.');

      const newUserID = userInsert[0].userid;

      // If Admin, insert into Admin table
      if (userType === 'Admin') {
        const { error: adminError } = await supabase
          .from('Admin')
          .insert([{ userid: newUserID }]);
        if (adminError) throw adminError;
      }

      // Save session and redirect
      localStorage.setItem('user', JSON.stringify({ userid: newUserID, role: userType, email }));
      onRegister(userType);

      if (userType === 'Admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/home');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#fefcf0] rounded-2xl p-8 shadow-lg border border-[#e8dcc6]">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#fcf8dd] rounded-full flex items-center justify-center shadow-sm border border-[#d4c4a8]">
            <CompassIcon size={30} className="text-[#754b34]" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-[#754b34] mb-2 font-serif">
          Join CultureLens
        </h1>
        <p className="text-center text-[#6d5a42] mb-8 font-serif text-sm">
          Begin your vintage travel adventure
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Fields */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-[#6d5a42] mb-1 font-semibold font-serif text-sm">First Name</label>
              <div className="relative">
                <UserIcon size={16} className="absolute left-3 top-3 text-[#8b7355]" />
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg py-2 pl-9"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-[#6d5a42] mb-1 font-semibold font-serif text-sm">Last Name</label>
              <div className="relative">
                <UserIcon size={16} className="absolute left-3 top-3 text-[#8b7355]" />
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg py-2 pl-9"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-[#6d5a42] mb-1 font-semibold font-serif text-sm">Email Address</label>
            <div className="relative">
              <MailIcon size={16} className="absolute left-3 top-3 text-[#8b7355]" />
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg py-2 pl-9"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-[#6d5a42] mb-1 font-semibold font-serif text-sm">Contact Number</label>
            <div className="relative">
              <PhoneIcon size={16} className="absolute left-3 top-3 text-[#8b7355]" />
              <input
                type="tel"
                placeholder="+63 900 000 0000"
                className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg py-2 pl-9"
                value={contactNumber}
                onChange={(e) => {
                  // Allow digits, spaces, parentheses, plus and dashes only
                  const sanitized = e.target.value.replace(/[^0-9+\-()\s]/g, '');
                  setContactNumber(sanitized);
                }}
                pattern="\+?[0-9\s()-]{7,20}"
                title="Please enter a valid phone number"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* User Type Dropdown */}
          <div>
            <label className="block text-[#6d5a42] mb-1 font-semibold font-serif text-sm">Register As</label>
            <select
              className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg py-2 pl-3"
              value={userType}
              onChange={(e) => setUserType(e.target.value as 'Traveler' | 'Admin')}
              disabled={isLoading}
            >
              <option value="Traveler">Traveler</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Passwords */}
          {[{ label: 'Password', placeholder: 'Create a password', value: password, setValue: setPassword },
            { label: 'Confirm Password', placeholder: 'Confirm your password', value: confirmPassword, setValue: setConfirmPassword }
          ].map((field, idx) => (
            <div key={idx}>
              <label className="block text-[#6d5a42] mb-1 font-semibold font-serif text-sm">{field.label}</label>
              <div className="relative">
                <LockIcon size={16} className="absolute left-3 top-3 text-[#8b7355]" />
                <input
                  type="password"
                  placeholder={field.placeholder}
                  className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg py-2 pl-9"
                  value={field.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#754b34] text-[#fefcf0] py-3 rounded-lg font-serif font-semibold hover:bg-[#5d3a28] transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Begin Your Journey'}
          </button>

          <Link
            to="/login"
            className="block text-center text-[#754b34] border border-[#d4c4a8] py-3 rounded-lg font-serif text-sm hover:bg-[#fcf8dd] transition-all duration-300"
          >
            Already have an account? Return
          </Link>
        </form>
    </div>
  );
};
