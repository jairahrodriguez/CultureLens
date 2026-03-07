import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CompassIcon, MailIcon, LockIcon } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../../config/supabase'

interface LoginScreenProps {
  onLogin: (role: 'Traveler' | 'Admin') => void
}

export const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'Traveler' | 'Admin'>('Traveler')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!isSupabaseConfigured()) {
      setError('Supabase is not configured. Check your .env file.')
      return
    }

    setIsLoading(true)
    try {
      // 1️⃣ Log in via Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (authError) throw authError

      const normalizedEmail = email.trim().toLowerCase()

      // 2️⃣ Match user in your "Users" table
      const { data: userData, error: userError } = await supabase
        .from('Users')
        .select('*')
        .ilike('email', normalizedEmail)
        .single()
      if (userError || !userData) throw new Error('User not found in the database.')

      // 3️⃣ Role check and persist a simple session marker in localStorage
      let finalRole: 'Traveler' | 'Admin' = 'Traveler'
      if (role === 'Admin') {
        const { data: adminData, error: adminError } = await supabase
          .from('Admin')
          .select('*')
          .eq('userid', userData.userid)
          .single()
        if (adminError || !adminData) {
          throw new Error('You are not registered as an admin.')
        }
        finalRole = 'Admin'
      }

      // Save minimal session info used by the app routing
      localStorage.setItem('user', JSON.stringify({ userid: userData.userid, email: userData.email, role: finalRole }))
      onLogin(finalRole)
      if (finalRole === 'Admin') navigate('/admin/dashboard')
      else navigate('/home')

    } catch (err: any) {
      console.error('Login error:', err)
      setError(err.message || 'Invalid email or password.')
    } finally {
      setIsLoading(false)
    }
  }

 

  return (
    <div className="w-full bg-[#fefcf0] rounded-2xl p-8 shadow-lg border border-[#e8dcc6]">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#fcf8dd] rounded-full flex items-center justify-center shadow-sm border border-[#d4c4a8]">
            <CompassIcon size={30} className="text-[#754b34]" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-[#754b34] mb-2 font-serif">Welcome Back</h1>
        <p className="text-center text-[#6d5a42] mb-8 font-serif text-sm">
          Continue your vintage travel adventure
        </p>

        

        {/* Divider */}
        <div className="flex items-center mb-6">
          <div className="flex-1 border-t border-[#d4c4a8]"></div>
          
          <div className="flex-1 border-t border-[#d4c4a8]"></div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-[#6d5a42] mb-1 font-semibold font-serif text-sm">Email Address</label>
            <div className="relative">
              <MailIcon size={16} className="absolute left-3 top-3 text-[#8b7355]" />
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg py-2 pl-9 text-[#6d5a42] font-serif text-sm focus:ring-2 focus:ring-[#d4c4a8] outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[#6d5a42] mb-1 font-semibold font-serif text-sm">Password</label>
            <div className="relative">
              <LockIcon size={16} className="absolute left-3 top-3 text-[#8b7355]" />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg py-2 pl-9 text-[#6d5a42] font-serif text-sm focus:ring-2 focus:ring-[#d4c4a8] outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-[#6d5a42] mb-1 font-semibold font-serif text-sm">Login as</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'Traveler' | 'Admin')}
              className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg py-2 pl-3 text-[#6d5a42] font-serif text-sm focus:ring-2 focus:ring-[#d4c4a8] outline-none"
              disabled={isLoading}
            >
              <option value="Traveler">Traveler</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#754b34] text-[#fefcf0] py-3 rounded-lg font-serif font-semibold shadow-md hover:bg-[#5d3a28] transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? 'Signing In...' : 'Continue Journey'}
          </button>

          {/* Register Link */}
          <Link
            to="/register"
            className="block text-center text-[#754b34] border border-[#d4c4a8] py-3 rounded-lg font-serif text-sm hover:bg-[#fcf8dd] transition-all duration-300"
          >
            New traveler? Begin your adventure
          </Link>
        </form>
    </div>
  )
}
