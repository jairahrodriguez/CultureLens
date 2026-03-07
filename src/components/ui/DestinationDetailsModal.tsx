import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPinIcon, StarIcon, ClockIcon, UsersIcon, HeartIcon } from 'lucide-react';
interface Comment {
  id: number;
  name: string;
  country: string;
  comment: string;
}
interface DestinationDetailsModalProps {
  destination: {
    id: number;
    name: string;
    country: string;
    description: string;
    rating: number;
    duration?: string;
    travelers?: string;
    price?: string;
    image: string;
    highlights?: string[];
  };
  isOpen: boolean;
  onClose: () => void;
  comments?: Comment[];
  onSave?: (id: number) => void;
  isSaved?: boolean;
}
export const DestinationDetailsModal = ({
  destination,
  isOpen,
  onClose,
  comments = [],
  onSave,
  isSaved = false
}: DestinationDetailsModalProps) => {
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState<Comment[]>(comments);
  const [savedState, setSavedState] = useState(isSaved);
  if (!isOpen) return null;
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newEntry: Comment = {
      id: Date.now(),
      name: 'Traveler',
      country: destination.country,
      comment: newComment
    };
    setCommentList(prev => [...prev, newEntry]);
    setNewComment('');
  };
  const handleSave = () => {
    setSavedState(prev => !prev);
    onSave?.(destination.id);
  };
  return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#fefcf0] w-full max-w-md rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto relative">
        {/* Header */}
        <div className="sticky top-0 bg-[#fefcf0] p-4 border-b border-[#d4c4a8] flex justify-between items-center">
          <h3 className="text-xl font-serif font-bold text-[#2f1b14]">
            Destination Details
          </h3>
          <button onClick={onClose} className="text-[#744a32] hover:text-[#2f1b14] transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Image */}
        <div className="w-full h-48">
          <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <h4 className="text-2xl font-serif font-bold text-[#2f1b14] mb-2">
              {destination.name}
            </h4>
            <div className="flex items-center text-[#6d5a42] font-serif">
              <MapPinIcon size={16} className="mr-1" />
              <span>{destination.country}</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => <StarIcon key={i} size={18} className={i < destination.rating ? 'text-[#a0522d]' : 'text-[#d4c4a8]'} fill={i < destination.rating ? '#a0522d' : 'none'} />)}
            <span className="ml-2 text-sm text-[#6d5a42] font-serif">
              ({destination.rating}/5)
            </span>
          </div>

          {/* Optional Details */}
          {(destination.duration || destination.travelers || destination.price) && <div className="flex flex-wrap gap-4 text-sm text-[#6d5a42] font-serif">
              {destination.duration && <div className="flex items-center">
                  <ClockIcon size={14} className="mr-1" />
                  <span>{destination.duration}</span>
                </div>}
              {destination.travelers && <div className="flex items-center">
                  <UsersIcon size={14} className="mr-1" />
                  <span>{destination.travelers} travelers</span>
                </div>}
              {destination.price && <div className="text-[#a0522d] font-bold">
                  {destination.price}
                </div>}
            </div>}

          {/* Highlights */}
          {destination.highlights && destination.highlights.length > 0 && <div className="flex flex-wrap gap-2">
              {destination.highlights.map((highlight, index) => <span key={index} className="bg-[#e8dcc6] text-[#4a3e2a] text-xs px-3 py-1 rounded-full border border-[#bfa888] font-semibold font-serif">
                  {highlight}
                </span>)}
            </div>}

          {/* Description */}
          <p className="text-[#2f1b14] font-serif leading-relaxed">
            {destination.description}
          </p>

          {/* Comments */}
          <div className="border-t border-[#d4c4a8] pt-4">
            <h5 className="font-serif font-bold text-[#2f1b14] mb-3">
              Traveler Comments
            </h5>

            {commentList.length > 0 ? <div className="space-y-3 mb-3">
                {commentList.map(comment => <div key={comment.id} className="bg-[#f4f0e6] p-3 rounded-lg border border-[#d4c4a8]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-[#2f1b14] font-serif text-sm">
                        {comment.name}
                      </span>
                      <span className="text-xs text-[#8b7355] font-serif">
                        {comment.country}
                      </span>
                    </div>
                    <p className="text-sm text-[#6d5a42] font-serif italic">
                      "{comment.comment}"
                    </p>
                  </div>)}
              </div> : <p className="text-sm text-[#8b7355] font-serif italic mb-3">
                No comments yet. Be the first to share your thoughts!
              </p>}

            {/* Add comment input */}
            <div className="flex gap-2">
              <input type="text" placeholder="Write a comment..." value={newComment} onChange={e => setNewComment(e.target.value)} className="flex-1 border border-[#d4c4a8] rounded-lg px-3 py-2 text-sm font-serif focus:outline-none focus:ring-2 focus:ring-[#a0522d]" />
              <button onClick={handleAddComment} className="bg-[#754b34] text-[#fefcf0] px-4 py-2 rounded-lg font-serif hover:bg-[#8b5a3c] transition-colors">
                Post
              </button>
            </div>
          </div>

          {/* Save Button with Animation */}
          <div className="pt-4 border-t border-[#d4c4a8]">
            <motion.button whileTap={{
            scale: 0.9
          }} whileHover={{
            scale: 1.03
          }} onClick={handleSave} className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-serif transition-all border ${savedState ? 'bg-[#fefcf0] text-[#744a32] border-[#744a32]' : 'bg-[#744a32] text-[#fefcf0] border-[#744a32] hover:bg-[#8b5a3c]'}`}>
              <motion.div animate={{
              scale: savedState ? [1, 1.3, 1] : 1
            }} transition={{
              duration: 0.3
            }}>
                <HeartIcon size={18} fill={savedState ? '#744a32' : 'none'} stroke="#744a32" />
              </motion.div>
              {savedState ? 'Saved to Favorites' : 'Save Destination'}
            </motion.button>
          </div>
        </div>
      </div>
    </div>;
};