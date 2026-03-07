import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchIcon, PlusCircleIcon, ArrowLeftIcon } from 'lucide-react'
import { supabase } from '../../config/supabase'

interface Review {
  reviewid: number
  travelerid?: number
  rating: number
  comment: string
  dateposted?: string
}

interface Experience {
  experienceid: number
  experiencename: string
  description: string
  countryname?: string
  image?: string
  reviews?: Review[]
}

export const CommunityExperiencesScreen = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch reviews and group by experience
  const fetchExperienceReviews = async () => {
    setLoading(true)
    try {
      const { data: reviewData, error } = await supabase
        .from('Review')
        .select('*')
        .ilike('targettype', 'Experience')
        .order('dateposted', { ascending: false })

      if (error) throw error
      if (!reviewData || reviewData.length === 0) {
        setExperiences([])
        setFilteredExperiences([])
        return
      }

      // Group reviews by experiencename (case-insensitive) and dedupe entries
      const grouped = new Map<string, Experience>()

      reviewData.forEach((rev: any) => {
        const nameRaw = rev.experiencename || 'Untitled Experience'
        const key = nameRaw.trim().toLowerCase()
        const name = nameRaw.trim()
        if (!grouped.has(key)) {
          // Use the first (most recent) review as the experience description
          grouped.set(key, {
            experienceid: rev.reviewid,
            experiencename: name,
            description: rev.comment || 'No description available',
            reviews: [],
          })
        }
        
        // Add ALL reviews (including the first) to the reviews array
        const entry = grouped.get(key)!
        entry.reviews!.push({
          reviewid: rev.reviewid,
          travelerid: rev.travelerid,
          rating: rev.rating || 0,
          comment: rev.comment || '',
          dateposted: rev.dateposted,
        })
      })

      // Add all reviews to the display
      const formatted = Array.from(grouped.values())
      setExperiences(formatted)
      setFilteredExperiences(formatted)
    } catch (err) {
      console.error('Error loading reviews:', err)
      setExperiences([])
      setFilteredExperiences([])
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    fetchExperienceReviews()
  }, [])

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('public:Review')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'Review' }, () => {
        fetchExperienceReviews()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // Filter experiences based on search query
  useEffect(() => {
    const q = searchQuery.toLowerCase()
    setFilteredExperiences(
      experiences.filter(
        exp =>
          exp.experiencename.toLowerCase().includes(q) ||
          exp.description.toLowerCase().includes(q) ||
          exp.countryname?.toLowerCase().includes(q)
      )
    )
  }, [searchQuery, experiences])

  const renderStars = (rating: number) => '★'.repeat(rating) + '☆'.repeat(5 - rating)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fef7e0] font-serif">
        <p className="text-[#754b34]">Loading experiences...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-screen bg-[#fef7e0] flex flex-col font-serif relative">
      {/* Header */}
      <header className="bg-[#b7965f] text-white p-4 shadow-md rounded-b-lg">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full border border-[#fefcf0] text-[#fefcf0] hover:bg-[#754b34] transition-colors"
          >
            <ArrowLeftIcon size={18} />
          </button>
          <h1 className="text-xl md:text-2xl font-bold font-serif text-center flex-1">
            Community Experiences
          </h1>
          <div className="w-8" />
        </div>
        <p className="text-sm italic text-[#fcf8dd]/90 mb-3">
          Connect, share, and celebrate your adventures with others
        </p>
        <div className="relative">
          <input
            type="search"
            className="w-full bg-[#fefcf0] border border-[#d4c4a8] rounded-full pl-10 pr-12 py-2 text-[#2f1b14] shadow-inner focus:ring-2 focus:ring-[#8b5a3c] focus:outline-none"
            placeholder="Search experiences..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon size={18} className="text-[#8b7355]" />
          </div>
        </div>
      </header>

      {/* Experiences */}
      <main className="flex-grow p-4 space-y-6 pb-24">
        {filteredExperiences.length === 0 ? (
          <p className="text-center text-[#754b34] mt-10">No experiences found.</p>
        ) : (
          filteredExperiences.map(exp => (
            <div
              key={exp.experienceid}
              className="bg-[#fefcf0] border border-[#d4c4a8] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
            >
              {exp.image && (
                <img
                  src={exp.image}
                  alt={exp.experiencename}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-bold text-[#2f1b14]">{exp.experiencename}</h2>
                <p className="text-[#6d5a42] mb-3">{exp.description}</p>

                {/* Reviews */}
                {exp.reviews && exp.reviews.length > 0 && (
                  <div className="mt-3 space-y-3">
                    {exp.reviews.map(rev => (
                      <div key={rev.reviewid} className="border-t border-[#d4c4a8] pt-3 text-sm">
                        <p className="text-[#744a32] font-semibold text-lg">{renderStars(rev.rating)}</p>
                        <p className="text-[#6d5a42] mt-1">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </main>

      {/* Floating Add Button */}
      <button
        onClick={() => navigate('/post-experience')}
        className="fixed bottom-6 right-6 bg-[#744a32] text-[#fefcf0] rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-[#5d3a28] transition-transform hover:scale-105 z-50"
        style={{ bottom: '90px' }}
      >
        <PlusCircleIcon size={26} />
      </button>
    </div>
  )
}
