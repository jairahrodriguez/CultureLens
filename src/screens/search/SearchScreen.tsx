import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchIcon, HeartIcon } from 'lucide-react'
import { supabase } from '../../config/supabase'
import { Badge } from '../../components/ui/Badge'

export const SearchScreen = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [userData, setUserData] = useState<any>(null)
  const [savedDestinations, setSavedDestinations] = useState<number[]>([])
  const [destinations, setDestinations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // ------------------ FETCH USER ------------------
  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data: userInfo } = await supabase
      .from('Users')
      .select('*')
      .eq('email', user.email)
      .single()
    setUserData(userInfo)
  }

  // ------------------ FETCH LANDMARKS ------------------
  const fetchLandmarks = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('Landmark')
        .select(`
          landmarkid,
          landmarkname,
          description,
          culturaletiquette,
          image,
          Country (countryname)
        `)
      if (error) throw error

      const formatted = (data || []).map((item: any) => ({
        id: item.landmarkid,
        name: item.landmarkname,
        country: item.Country?.countryname || 'Unknown',
        description: item.description,
        etiquette: item.culturaletiquette,
        highlights: [item.Country?.countryname || 'Travel Landmark'],
        image: item.image,
      }))

      setDestinations(formatted)
    } catch (err) {
      console.error('Error fetching landmarks:', err)
    } finally {
      setLoading(false)
    }
  }

  // ------------------ FETCH SAVED LANDMARKS ------------------
  const fetchSavedLandmarks = async () => {
    if (!userData) return
    const { data } = await supabase
      .from('UserSavedLandmarks')
      .select('landmarkid')
      .eq('userid', userData.userid)
    setSavedDestinations((data || []).map(d => d.landmarkid))
  }

  useEffect(() => { fetchUser() }, [])
  useEffect(() => {
    fetchLandmarks()
    fetchSavedLandmarks()
  }, [userData])

  // ------------------ HEART LOGIC ------------------
  const toggleSaveDestination = async (id: number) => {
    if (!userData) return
    try {
      const { data: existing } = await supabase
        .from('UserSavedLandmarks')
        .select('id')
        .eq('userid', userData.userid)
        .eq('landmarkid', id)
        .single()

      if (existing) {
        await supabase.from('UserSavedLandmarks').delete().eq('id', existing.id)
        setSavedDestinations(prev => prev.filter(d => d !== id))
      } else {
        await supabase.from('UserSavedLandmarks').insert({ userid: userData.userid, landmarkid: id })
        setSavedDestinations(prev => [...prev, id])
      }
    } catch (err) {
      console.error('Error saving landmark:', err)
    }
  }

  // ------------------ FILTERED DESTINATIONS ------------------
  const filteredDestinations = destinations.filter(dest =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.country.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // ------------------ RENDER ------------------
  return (
    <div className="min-h-screen w-screen bg-[#fef7e0] p-4 relative flex flex-col">
      {/* Header */}
      <header className="bg-[#754b34] text-[#fcf8dd] p-5 rounded-t shadow-md relative mb-6">
        <h1 className="text-2xl font-bold font-serif">Discover Landmarks</h1>
        <div className="relative mt-4">
          <input
            type="search"
            className="w-full bg-[#fefcf0] border border-[#d4c4a8] rounded-full pl-10 pr-4 py-3 font-semibold text-[#2f1b14] shadow-inner focus:ring-2 focus:ring-[#8b5a3c] focus:outline-none font-serif"
            placeholder="Search landmarks or countries..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon size={20} className="text-[#8b7355]" />
          </div>
        </div>
      </header>

      {loading ? (
        <p className="text-center text-[#754b34] font-serif">Loading landmarks...</p>
      ) : (
        <div className="space-y-4">
          {filteredDestinations.map(destination => (
            <div
              key={destination.id}
              className="bg-[#fefcf0] border-2 border-[#d4c4a8] rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden"
            >
              <div className="flex">
                <div className="w-36 h-36 flex-shrink-0">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-[#2f1b14] font-serif">{destination.name}</h4>
                    <button
                      onClick={() => toggleSaveDestination(destination.id)}
                      className="text-[#744a32] hover:scale-110 transition-transform"
                    >
                      <HeartIcon
                        size={18}
                        fill={savedDestinations.includes(destination.id) ? '#744a32' : 'none'}
                        stroke="#744a32"
                      />
                    </button>
                  </div>
                  <p className="text-[#2f1b14] font-serif text-sm leading-relaxed">{destination.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {destination.highlights.map((h, i) => (
                      <Badge key={i} variant="secondary" className="text-[#2f1b14] font-serif">{h}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
