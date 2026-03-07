import React from 'react';
import { XIcon, MapPinIcon, CalendarIcon, StarIcon, HeartIcon, MessageCircleIcon, TagIcon, UserIcon } from 'lucide-react';
interface Comment {
  id: string;
  name: string;
  country: string;
  comment: string;
  rating?: number;
  date: string;
  avatar?: string;
}
interface Experience {
  id: string;
  title: string;
  author: string;
  authorCountry: string;
  date: string;
  country: string;
  location: string;
  description: string;
  rating: number;
  image?: string;
  likes: number;
  comments: number;
  tags: string[];
  isLiked?: boolean;
  fullComments?: Comment[];
}
interface ExperienceDetailsModalProps {
  experience: Experience | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleLike: (id: string) => void;
}
export const ExperienceDetailsModal = ({
  experience,
  isOpen,
  onClose,
  onToggleLike
}: ExperienceDetailsModalProps) => {
  if (!isOpen || !experience) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#fefcf0] rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#b7965f] text-white p-4 flex justify-between items-center rounded-t-lg">
          <h2 className="text-xl font-bold font-serif">{experience.title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-[#754b34] rounded-full transition-colors">
            <XIcon size={20} />
          </button>
        </div>
        {/* Image */}
        {experience.image && <div className="relative h-64 w-full">
            <img src={experience.image} alt={experience.title} className="w-full h-full object-cover" />
            <div className="absolute top-2 right-2 bg-[#fefcf0] p-1 rounded-md shadow-md border border-[#d4c4a8] flex items-center">
              {[...Array(5)].map((_, i) => <StarIcon key={i} size={14} className={i < experience.rating ? 'text-[#a0522d] fill-[#a0522d]' : 'text-[#d4c4a8]'} />)}
            </div>
          </div>}
        {/* Content */}
        <div className="p-6">
          {/* Author Info */}
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-[#e8dcc6] rounded-full flex items-center justify-center mr-3">
              <UserIcon size={20} className="text-[#744a32]" />
            </div>
            <div>
              <p className="font-semibold text-[#2f1b14] font-serif">
                {experience.author}
              </p>
              <p className="text-sm text-[#6d5a42] font-serif">
                {experience.authorCountry}
              </p>
            </div>
          </div>
          {/* Location and Date */}
          <div className="flex flex-wrap gap-y-2 mb-4">
            <div className="flex items-center text-sm text-[#6d5a42] mr-4 font-serif">
              <MapPinIcon size={14} className="mr-1 text-[#744a32]" />
              <span>
                {experience.location}, {experience.country}
              </span>
            </div>
            <div className="flex items-center text-sm text-[#6d5a42] font-serif">
              <CalendarIcon size={14} className="mr-1 text-[#744a32]" />
              <span>{experience.date}</span>
            </div>
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {experience.tags.map(tag => <div key={tag} className="bg-[#e8dcc6] text-[#4a3e2a] text-xs px-2 py-1 rounded-full border border-[#bfa888] font-semibold font-serif flex items-center">
                <TagIcon size={10} className="mr-1" />
                {tag}
              </div>)}
          </div>
          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-[#2f1b14] mb-2 font-serif">
              Experience
            </h3>
            <p className="text-[#6d5a42] font-serif leading-relaxed">
              {experience.description}
            </p>
          </div>
          {/* Actions */}
          <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-[#d4c4a8]">
            <button className="flex items-center text-[#6d5a42] hover:text-[#744a32]" onClick={() => onToggleLike(experience.id)}>
              <HeartIcon size={20} className={experience.isLiked ? 'text-[#744a32] fill-[#744a32]' : ''} />
              <span className="ml-2 font-serif">{experience.likes}</span>
            </button>
            <div className="flex items-center text-[#6d5a42]">
              <MessageCircleIcon size={20} />
              <span className="ml-2 font-serif">{experience.comments}</span>
            </div>
          </div>
          {/* Comments Section */}
          <div>
            <h3 className="font-semibold text-[#2f1b14] mb-4 font-serif">
              Comments ({experience.comments})
            </h3>
            <div className="space-y-4">
              {experience.fullComments && experience.fullComments.length > 0 ? experience.fullComments.map(comment => <div key={comment.id} className="bg-[#f4f0e6] p-4 rounded-lg border border-[#d4c4a8]">
                    <div className="flex items-start mb-2">
                      <div className="w-8 h-8 bg-[#e8dcc6] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        {comment.avatar ? <img src={comment.avatar} alt={comment.name} className="w-full h-full rounded-full object-cover" /> : <UserIcon size={16} className="text-[#744a32]" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <p className="font-semibold text-[#2f1b14] font-serif">
                              {comment.name}
                            </p>
                            <p className="text-xs text-[#6d5a42] font-serif">
                              {comment.country}
                            </p>
                          </div>
                          {comment.rating && <div className="flex items-center">
                              {[...Array(5)].map((_, i) => <StarIcon key={i} size={12} className={i < comment.rating ? 'text-[#a0522d] fill-[#a0522d]' : 'text-[#d4c4a8]'} />)}
                            </div>}
                        </div>
                        <p className="text-sm text-[#6d5a42] font-serif mb-1">
                          {comment.comment}
                        </p>
                        <p className="text-xs text-[#8b7355] font-serif">
                          {comment.date}
                        </p>
                      </div>
                    </div>
                  </div>) : <p className="text-[#6d5a42] text-sm italic font-serif">
                  No comments yet. Be the first to share your thoughts!
                </p>}
            </div>
          </div>
        </div>
      </div>
    </div>;
};