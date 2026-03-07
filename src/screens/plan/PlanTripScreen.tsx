import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarIcon, SaveIcon, ArrowLeftIcon } from 'lucide-react'
import { supabase } from '../../config/supabase'

export const PlanTripScreen = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    country: '',
    startDate: '',
    endDate: '',
    budget: '',
    interests: '',
  })
  const [loading, setLoading] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [error, setError] = useState('')

  const countries = [
    'Japan', 'France', 'Italy', 'Spain', 'Greece', 'Peru', 'Thailand',
    'Indonesia', 'Morocco', 'India', 'Brazil', 'Korea', 'China', 'Turkey'
  ].sort()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleConfirmTrip = async () => {
    if (!formData.country || !formData.startDate || !formData.endDate || !formData.budget || !formData.interests) {
      alert('Please fill out all fields before confirming.')
      return
    }
    // Validate date order
    const start = new Date(formData.startDate)
    const end = new Date(formData.endDate)
    if (start > end) {
      alert('Start date must be the same as or before the end date.')
      return
    }
    setConfirmed(true)
    alert('✅ Trip details confirmed! You can now save your trip.')
  }

  const handleSaveTrip = async () => {
    try {
      setLoading(true)
      setError('')
      // Validate dates again before saving
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      if (start > end) {
        throw new Error('Invalid travel dates: start date is after end date.')
      }

      // 1️⃣ Get logged-in user
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) throw new Error('User not logged in.')

      // 2️⃣ Fetch Users table by email
      const { data: userRow, error: userRowError } = await supabase
        .from('Users')
        .select('userid')
        .eq('email', user.email)
        .single()
      if (userRowError || !userRow) throw new Error('User not found in database.')

      // 3️⃣ Fetch Traveler using userid
      const { data: travelerData, error: travelerError } = await supabase
        .from('Traveler')
        .select('travelerid')
        .eq('userid', userRow.userid)
        .single()
      if (travelerError || !travelerData) throw new Error('Traveler not found.')

      // 4️⃣ Insert into Itinerary
      const travelDates = `${formData.startDate} - ${formData.endDate}`
      const { error: insertError } = await supabase.from('Itinerary').insert([
        {
          travelerid: travelerData.travelerid,
          country: formData.country,
          traveldates: travelDates,
          budget: parseFloat(formData.budget),
          interests: formData.interests,
        }
      ])
      if (insertError) throw insertError

      alert('🎉 Trip saved successfully!')
      navigate('/account', { state: { refresh: true } })

    } catch (err: any) {
      console.error('Error saving trip:', err)
      setError(err.message || 'Failed to save trip.')
      alert(`❌ Failed to save trip: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen w-screen p-6 flex flex-col font-serif"
      style={{
        backgroundColor: '#fcf8dd',
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(117, 75, 52, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(254, 252, 240, 0.3) 0%, transparent 50%)
        `,
      }}
    >
      {/* Header */}
      <header className="bg-[#b7965f] text-white p-4 rounded-t flex items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-2 rounded-full border border-[#fefcf0] text-[#fefcf0] hover:bg-[#754b34] transition-colors"
        >
          <ArrowLeftIcon size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Plan Your Journey</h1>
          <p className="text-[#fefcf0]/70 italic">Create your perfect itinerary</p>
        </div>
      </header>

      {/* Form */}
      <div className="space-y-5">
        <div>
          <label className="block text-[#754b34] mb-2 font-semibold">Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full bg-[#fefcf0] border border-[#d4c4a8] rounded-lg p-3 text-[#754b34] focus:ring-2 focus:ring-[#754b34] focus:outline-none"
          >
            <option value="">Select a country</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[#754b34] mb-2 font-semibold">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full bg-[#fefcf0] border border-[#d4c4a8] rounded-lg p-3 text-[#754b34] focus:ring-2 focus:ring-[#754b34] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[#754b34] mb-2 font-semibold">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className="w-full bg-[#fefcf0] border border-[#d4c4a8] rounded-lg p-3 text-[#754b34] focus:ring-2 focus:ring-[#754b34] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#754b34] mb-2 font-semibold">Budget (USD)</label>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            placeholder="Enter your budget"
            className="w-full bg-[#fefcf0] border border-[#d4c4a8] rounded-lg p-3 text-[#754b34] focus:ring-2 focus:ring-[#754b34] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[#754b34] mb-2 font-semibold">Interests</label>
          <textarea
            name="interests"
            value={formData.interests}
            onChange={handleInputChange}
            placeholder="e.g., Visiting temples, trying local food, shopping"
            className="w-full bg-[#fefcf0] border border-[#d4c4a8] rounded-lg p-3 text-[#754b34] h-24 focus:ring-2 focus:ring-[#754b34] focus:outline-none"
          />
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 p-2 rounded">
            {error}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-auto pt-6 space-y-3">
        {!confirmed ? (
          <button
            onClick={handleConfirmTrip}
            className="w-full bg-[#b7965f] text-[#fefcf0] py-4 rounded-lg font-bold shadow-md hover:bg-[#5f3b29] transition-colors"
          >
            Confirm Trip
          </button>
        ) : (
          <button
            onClick={handleSaveTrip}
            disabled={loading}
            className="w-full bg-[#754b34] text-[#fefcf0] py-4 rounded-lg font-bold shadow-md hover:bg-[#5f3b29] transition-colors flex items-center justify-center disabled:opacity-70"
          >
            <SaveIcon size={20} className="mr-2" />
            {loading ? 'Saving Trip...' : 'Save Trip'}
          </button>
        )}
      </div>
    </div>
  )
}
