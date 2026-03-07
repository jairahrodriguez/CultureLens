import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, StarIcon } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { supabase } from '../../config/supabase'

export const PostExperienceScreen = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    experiencename: '',
    rating: 5,
    comment: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    // Limit comment to 150 characters
    if (name === 'comment') {
      const limited = value.slice(0, 150)
      setFormData({ ...formData, [name]: limited })
      return
    }
    setFormData({ ...formData, [name]: value })
  }

  const handleRatingChange = (rating: number) => {
    setFormData({ ...formData, rating })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // 1. Get currently logged-in Supabase user
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) throw new Error('User not logged in.')

      // 2. Find matching user in your "User" table
      const { data: userData, error: userError } = await supabase
        .from('Users')
        .select('userid')
        .eq('email', user.email)
        .single()
      if (userError || !userData) throw new Error('User not found.')

      // 3. Find traveler linked to this user
      const { data: travelerData, error: travelerError } = await supabase
        .from('Traveler')
        .select('travelerid')
        .eq('userid', userData.userid)
        .single()
      if (travelerError || !travelerData) throw new Error('Traveler not found.')

      // 4. Insert review directly (freeform experience)
      const { error: insertError } = await supabase.from('Review').insert([
        {
          travelerid: travelerData.travelerid,
          targettype: 'experience',
          experiencename: formData.experiencename,
          targetid: null,
          rating: formData.rating,
          comment: formData.comment,
          dateposted: new Date().toISOString()
        }
      ])
      if (insertError) throw insertError

      // 5. Success feedback
      alert('✅ Your review has been posted successfully!')
      navigate('/community-experiences')

    } catch (err: any) {
      console.error('Error posting review:', err)
      setError(err.message || 'Failed to post review.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen w-screen bg-[#fefcf0] px-4 py-6 flex flex-col">
      {/* Header */}
      <header className="bg-[#b7965f] text-[#fefcf0] p-4 rounded-lg mb-6 shadow-md w-full max-w-2xl">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-full border border-[#fefcf0] text-[#fefcf0] hover:bg-[#754b34] transition-colors flex items-center justify-center"
            style={{ width: '40px', height: '40px' }}
          >
            <ArrowLeftIcon size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold font-serif leading-tight">
              Share a Review
            </h1>
            <p className="text-sm italic font-serif text-[#fcf8dd]/90">
              Tell others about your experience
            </p>
          </div>
        </div>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-2 rounded">
            {error}
          </div>
        )}

        {/* Experience Name */}
        <div>
          <label className="block text-[#754b34] mb-2 font-semibold font-serif">
            Experience Name
          </label>
          <input
            type="text"
            name="experiencename"
            value={formData.experiencename}
            onChange={handleInputChange}
            placeholder="Enter experience name..."
            className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg p-3 font-serif text-[#2f1b14] shadow-inner focus:ring-2 focus:ring-[#754b34] focus:outline-none"
            required
          />
        </div>

        {/* Comment */}
        <div>
          <label className="block text-[#754b34] mb-2 font-semibold font-serif">
            Your Comment
          </label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            placeholder="Write your thoughts..."
            className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg p-3 font-serif text-[#2f1b14] shadow-inner focus:ring-2 focus:ring-[#754b34] focus:outline-none h-32 resize-none"
            required
          />
          <div className="text-right text-xs text-[#6d5a42] mt-1">{formData.comment.length}/150</div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-[#754b34] mb-2 font-semibold font-serif">
            Rating
          </label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(star)}
                className="focus:outline-none mr-1"
              >
                <StarIcon
                  size={24}
                  className={
                    star <= formData.rating
                      ? 'text-[#a0522d] fill-[#a0522d]'
                      : 'text-[#d4c4a8]'
                  }
                />
              </button>
            ))}
            <span className="ml-2 text-[#754b34] font-serif">{formData.rating}/5</span>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-6">
          <Button
            type="submit"
            className="w-full bg-[#b99664] text-[#fefcf0] py-3 rounded-lg font-semibold font-serif hover:bg-[#5d3a28] transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post Review'}
          </Button>
        </div>
      </form>
    </div>
  )
}
