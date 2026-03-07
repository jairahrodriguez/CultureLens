import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LogOutIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  SaveIcon,
  TrashIcon
} from 'lucide-react'
import { supabase } from '../../config/supabase'

export const AccountScreen = ({ onLogout }: { onLogout: () => void }) => {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)
  const [formData, setFormData] = useState<any>(null)
  const [itineraries, setItineraries] = useState<any[]>([])
  const [showItineraries, setShowItineraries] = useState(false)
  const [savedLandmarks, setSavedLandmarks] = useState<any[]>([])

  // ------------------ FETCH USER + ITINERARIES + SAVED LANDMARKS ------------------
  const fetchUserData = async () => {
    try {
      setIsLoading(true)
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) throw new Error('User not logged in.')

      const { data: userInfo, error: userError } = await supabase
        .from('Users')
        .select('*')
        .eq('email', user.email)
        .single()
      if (userError || !userInfo) throw new Error('User not found.')

      setUserData(userInfo)
      setFormData({ ...userInfo }) // copy for editing

      // Fetch traveler info
      const { data: travelerData } = await supabase
        .from('Traveler')
        .select('travelerid')
        .eq('userid', userInfo.userid)
        .single()

      // Fetch itineraries
      const { data: itineraryData } = await supabase
        .from('Itinerary')
        .select('itineraryid, travelerid, traveldates, budget, interests, country')
        .eq('travelerid', travelerData?.travelerid)
        .order('itineraryid', { ascending: false })
      setItineraries((itineraryData || []).map(trip => ({ ...trip, expanded: false })))

      // Fetch saved landmarks
      const { data: savedData } = await supabase
        .from('UserSavedLandmarks')
        .select('landmarkid')
        .eq('userid', userInfo.userid)
      const landmarkIds = (savedData || []).map((item: any) => item.landmarkid)

      if (landmarkIds.length > 0) {
        const { data: landmarksData } = await supabase
          .from('Landmark')
          .select('landmarkid, landmarkname, description')
          .in('landmarkid', landmarkIds)
        setSavedLandmarks(landmarksData || [])
      } else setSavedLandmarks([])
    } catch (err) {
      console.error('Error fetching user data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { fetchUserData() }, [])

  // ------------------ PROFILE LOGIC ------------------
  const handleSaveProfile = async () => {

    console.log('Auth email:', userData.email)
    console.log('Form email:', formData.email)
    console.log('Updating profile for email:', formData.email)
    console.log('Table: Users, Filter: email =', formData.email);



    if (!formData?.email) {
      alert('User email missing.')
      return
    }
    try {
      const { data, error } = await supabase
        .from('Users')
        .update({
          firstname: formData.firstname,
          lastname: formData.lastname,
          contactnumber: formData.contactnumber,
          preferredlanguage: formData.preferredlanguage,
        })
        .ilike('email', formData.email) // use email instead of userid
        .select('*')

        console.log('Update response:', data, 'Error:', error)

      if (error) throw error
      if (!data || data.length === 0) throw new Error('No row updated')

      setUserData(data[0])
      setFormData(data[0])
      setIsEditing(false)
      alert('✅ Profile updated successfully!')
    } catch (err: any) {
      console.error('Profile update failed:', err)
      alert(`❌ Failed to update profile: ${err.message}`)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    localStorage.clear()
    onLogout()
  }

  // ------------------ ITINERARY LOGIC ------------------
  const toggleExpand = (id: number) => {
    setItineraries(prev =>
      prev.map(trip => trip.itineraryid === id ? { ...trip, expanded: !trip.expanded } : trip)
    )
  }

  const updateItineraryField = (id: number, field: string, value: any) => {
    setItineraries(prev =>
      prev.map(trip => trip.itineraryid === id ? { ...trip, [field]: value } : trip)
    )
  }

  const saveItineraryChanges = async (id: any) => {
    try {
      const trip = itineraries.find(t => t.itineraryid === id)
      if (!trip) return

      // Validate dates: start <= end
      const [startStr, endStr] = (trip.traveldates || ' - ').split(' - ').map((d: string) => d.trim())
      const start = new Date(startStr)
      const end = new Date(endStr)
      
      if (start > end) {
        alert('❌ Invalid travel dates: start date must be before or equal to end date.')
        return
      }

      const { data, error } = await supabase
        .from('Itinerary')
        .update({
          country: trip.country,
          traveldates: trip.traveldates,
          budget: parseFloat(trip.budget) || null,
          interests: trip.interests,
        })
        .eq('itineraryid', id)
        .select('*')
      if (error) throw error

      setItineraries(prev =>
        prev.map(t => t.itineraryid === id ? { ...t, ...data[0] } : t)
      )

      alert('✅ Itinerary updated successfully!')
    } catch (err: any) {
      alert(`❌ Failed to update itinerary: ${err.message}`)
    }
  }

  const deleteItinerary = async (id: any) => {
    if (!confirm('Are you sure you want to delete this itinerary?')) return
    try {
      const { error } = await supabase
        .from('Itinerary')
        .delete()
        .eq('itineraryid', id)
      if (error) throw error

      setItineraries(prev => prev.filter(t => t.itineraryid !== id))
      alert('🗑️ Itinerary deleted successfully!')
    } catch (err: any) {
      alert(`❌ Failed to delete itinerary: ${err.message}`)
    }
  }

  // ------------------ MY REVIEWS SECTION ------------------
const [myReviews, setMyReviews] = useState<any[]>([])
const [editingReviewId, setEditingReviewId] = useState<number | null>(null)
const [editingComment, setEditingComment] = useState<string>('')
const [editingRating, setEditingRating] = useState<number>(5)

const fetchMyReviews = async (travelerid: number) => {
  try {
    const { data, error } = await supabase
      .from('Review')
      .select('reviewid, targettype, experiencename, rating, comment, dateposted')
      .eq('travelerid', travelerid)
      .order('dateposted', { ascending: false })
    if (error) throw error
    setMyReviews(data || [])
  } catch (err) {
    console.error('Error fetching my reviews:', err)
    setMyReviews([])
  }
}

// Call this after fetching traveler info in fetchUserData
useEffect(() => {
  if (userData) {
    supabase
      .from('Traveler')
      .select('travelerid')
      .eq('userid', userData.userid)
      .single()
      .then(({ data: travelerData, error }) => {
        if (travelerData?.travelerid) fetchMyReviews(travelerData.travelerid)
      })
  }
}, [userData])


  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcf8dd]">
      <p className="text-[#754b34] font-serif">Loading account details...</p>
    </div>
  )

  if (!userData) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcf8dd]">
      <div className="text-center">
        <p className="text-[#754b34] font-serif mb-3">Unable to load profile. Please try logging out and logging back in.</p>
        <button onClick={handleLogout} className="px-4 py-2 bg-[#754b34] text-white rounded">Go to Login</button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen w-screen p-6 flex flex-col font-serif" style={{
      backgroundColor: '#fcf8dd',
      backgroundImage: `
        radial-gradient(circle at 20% 80%, rgba(117, 75, 52, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(254, 252, 240, 0.3) 0%, transparent 50%)
      `
    }}>
      {/* Header - User Info */}
      <header className="bg-[#754b34] text-[#fefcf0] p-6 rounded-2xl shadow-md mb-6 flex flex-col items-center relative">
        <div className="w-full flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Travel Profile</h1>
          {isEditing ? (
            <button onClick={handleSaveProfile} className="bg-[#fefcf0] text-[#754b34] px-3 py-1 rounded-lg font-bold hover:bg-[#d8c49e]">Save</button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="border border-[#fefcf0] px-3 py-1 rounded-lg hover:bg-[#5f3b29]">Edit</button>
          )}
        </div>
        <div className="text-center">
          {isEditing ? (
            <>
              <input className="text-xl font-bold text-[#754b34] bg-[#fefcf0] border-b-2 border-[#754b34] mb-2 px-2"
                value={formData.firstname} onChange={(e) => setFormData({ ...formData, firstname: e.target.value })} />
              <input className="text-xl font-bold text-[#754b34] bg-[#fefcf0] border-b-2 border-[#754b34] mb-2 px-2"
                value={formData.lastname} onChange={(e) => setFormData({ ...formData, lastname: e.target.value })} />
              <input className="text-sm text-[#754b34] bg-[#fefcf0] border-b border-[#754b34] mb-2 px-2"
                value={formData.contactnumber} onChange={(e) => setFormData({ ...formData, contactnumber: e.target.value.replace(/[^0-9+\-()\s]/g, '') })} />
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold">{userData.firstname} {userData.lastname}</h2>
              <p className="text-[#fefcf0]/80">{userData.email}</p>
              <p className="text-[#fefcf0]/70 italic">{userData.contactnumber || 'No contact info'}</p>
            </>
          )}
        </div>
      </header>

      {/* Itineraries Section */}
      <section className="mb-6 bg-[#fefcf0] rounded-xl border border-[#bfa888]/40 p-4 shadow-sm">
        <div onClick={() => setShowItineraries(!showItineraries)} className="flex items-center justify-between cursor-pointer">
          <h2 className="text-xl font-bold text-[#754b34]">My Itineraries</h2>
          {showItineraries ? <ChevronUpIcon size={22} className="text-[#754b34]" /> : <ChevronDownIcon size={22} className="text-[#754b34]" />}
        </div>
        {showItineraries && (
          <div className="mt-4 space-y-3 max-h-72 overflow-y-auto">
            {itineraries.length === 0 ? (
              <p className="text-[#754b34]/70 italic">No itineraries found. Plan a new trip!</p>
            ) : itineraries.map(trip => (
              <div key={trip.itineraryid} className="p-4 bg-[#fcf8dd] rounded-lg border border-[#d4c4a8]/50 space-y-2">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(trip.itineraryid)}>
                  <span className="font-semibold text-[#754b34]">{trip.country}</span>
                  {trip.expanded ? <ChevronUpIcon size={18} className="text-[#754b34]" /> : <ChevronDownIcon size={18} className="text-[#754b34]" />}
                </div>
                {trip.expanded && (
                  <div className="mt-2 space-y-2">
                    <input className="w-full bg-[#fefcf0] border border-[#bfa888] rounded px-2 py-1 text-[#754b34]"
                      value={trip.country} onChange={(e) => updateItineraryField(trip.itineraryid, 'country', e.target.value)} />
                    <div className="flex gap-2">
                      <input type="date" className="flex-1 bg-[#fefcf0] border border-[#bfa888] rounded px-2 py-1 text-[#754b34]"
                        value={trip.traveldates?.split(' - ')[0] || ''} onChange={(e) => updateItineraryField(trip.itineraryid, 'traveldates', `${e.target.value} - ${trip.traveldates?.split(' - ')[1] || ''}`)} />
                      <input type="date" className="flex-1 bg-[#fefcf0] border border-[#bfa888] rounded px-2 py-1 text-[#754b34]"
                        value={trip.traveldates?.split(' - ')[1] || ''} onChange={(e) => updateItineraryField(trip.itineraryid, 'traveldates', `${trip.traveldates?.split(' - ')[0] || ''} - ${e.target.value}`)} />
                    </div>
                    {(() => {
                      const [startStr, endStr] = (trip.traveldates || ' - ').split(' - ').map((d: string) => d.trim());
                      const start = new Date(startStr);
                      const end = new Date(endStr);
                      const isInvalid = start > end && startStr && endStr;
                      return isInvalid ? (
                        <div className="text-xs text-red-600 font-semibold">⚠️ Start date must be before end date</div>
                      ) : null;
                    })()}
                    <input type="number" className="w-full bg-[#fefcf0] border border-[#bfa888] rounded px-2 py-1 text-[#754b34]"
                      placeholder="Budget" value={trip.budget || ''} onChange={(e) => updateItineraryField(trip.itineraryid, 'budget', e.target.value)} />
                    <textarea className="w-full bg-[#fefcf0] border border-[#bfa888] rounded px-2 py-1 text-[#754b34]"
                      placeholder="Interests" value={trip.interests || ''} onChange={(e) => updateItineraryField(trip.itineraryid, 'interests', e.target.value)} />
                    <div className="flex space-x-3 pt-2">
                      <button onClick={() => saveItineraryChanges(trip.itineraryid)} className="text-sm flex items-center text-[#754b34] font-bold underline"><SaveIcon size={14} className="mr-1" /> Save</button>
                      <button onClick={() => deleteItinerary(trip.itineraryid)} className="text-sm flex items-center text-red-600 underline"><TrashIcon size={14} className="mr-1" /> Delete</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* My Landmarks Section */}
      <section className="mb-6 bg-[#fefcf0] rounded-xl border border-[#bfa888]/40 p-4 shadow-sm">
        <h2 className="text-xl font-bold text-[#754b34] mb-3">My Landmarks</h2>
        {savedLandmarks.length === 0 ? (
          <p className="text-[#754b34]/70 italic">No landmarks saved yet. Discover and save some!</p>
        ) : (
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {savedLandmarks.map(landmark => (
              <div
                key={landmark.landmarkid}
                onClick={() => navigate('/search', { state: { landmarkId: landmark.landmarkid } })}
                className="cursor-pointer p-2 rounded-lg border border-[#d4c4a8]/50 hover:bg-[#fcf8dd]"
              >
                <p className="font-semibold text-[#754b34]">{landmark.landmarkname}</p>
                <p className="text-sm text-[#754b34]/80">{landmark.description?.slice(0, 60)}...</p>
              </div>
            ))}
          </div>
        )}
      </section>
              {/* My Reviews Section */}
        <section className="mb-6 bg-[#fefcf0] rounded-xl border border-[#bfa888]/40 p-4 shadow-sm">
          <h2 className="text-xl font-bold text-[#754b34] mb-3">My Reviews</h2>
          {myReviews.length === 0 ? (
            <p className="text-[#754b34]/70 italic">You haven't written any reviews yet.</p>
          ) : (
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {myReviews.map(review => (
                <div key={review.reviewid} className="p-2 bg-[#fcf8dd] rounded-lg border border-[#d4c4a8]/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-[#754b34]">{review.experiencename || review.targettype}</p>
                      <p className="text-sm text-[#754b34]/80">{'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => {
                        setEditingReviewId(review.reviewid)
                        setEditingComment(review.comment || '')
                        setEditingRating(review.rating || 5)
                      }} className="text-sm text-[#754b34] underline">Edit</button>
                      <button onClick={async () => {
                        if (!confirm('Delete this review?')) return
                        try {
                          const { error } = await supabase.from('Review').delete().eq('reviewid', review.reviewid)
                          if (error) throw error
                          setMyReviews(prev => prev.filter(r => r.reviewid !== review.reviewid))
                          alert('🗑️ Review deleted')
                        } catch (err: any) {
                          alert(`Failed to delete review: ${err.message}`)
                        }
                      }} className="text-sm text-red-600 underline">Delete</button>
                    </div>
                  </div>

                  {editingReviewId === review.reviewid ? (
                    <div className="mt-2 space-y-2">
                      <textarea value={editingComment} onChange={(e) => setEditingComment(e.target.value.slice(0,150))} className="w-full bg-white border rounded p-2" />
                      <div className="flex items-center gap-2">
                        {[1,2,3,4,5].map(st => (
                          <button key={st} type="button" onClick={() => setEditingRating(st)} className={st <= editingRating ? 'text-[#a0522d]' : 'text-[#d4c4a8]'}>★</button>
                        ))}
                        <div className="flex gap-2 ml-auto">
                          <button onClick={async () => {
                            try {
                              const { data, error } = await supabase.from('Review').update({ comment: editingComment, rating: editingRating }).eq('reviewid', review.reviewid).select('*')
                              if (error) throw error
                              setMyReviews(prev => prev.map(r => r.reviewid === review.reviewid ? { ...r, comment: editingComment, rating: editingRating } : r))
                              setEditingReviewId(null)
                              alert('✅ Review updated')
                            } catch (err: any) {
                              alert(`Failed to update review: ${err.message}`)
                            }
                          }} className="text-sm text-[#2f7a49] underline">Save</button>
                          <button onClick={() => setEditingReviewId(null)} className="text-sm text-[#754b34] underline">Cancel</button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-[#6d5a42] mt-2">{review.comment}</p>
                      <p className="text-xs text-[#754b34]/60 italic">{review.dateposted?.slice(0, 10)}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

      {/* Logout Button */}
      <button onClick={handleLogout} className="w-full py-3 border border-[#754b34] text-[#754b34] rounded-lg font-bold hover:bg-[#754b34] hover:text-[#fefcf0] transition-all mt-auto">
        <LogOutIcon size={18} className="inline-block mr-2" />
        End Journey
      </button>
    </div>
  )
  
}
