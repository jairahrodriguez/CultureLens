import React from 'react';
import { HeartIcon, MapPinIcon, StarIcon, ClockIcon, UsersIcon } from 'lucide-react';
import { Card, CardImage, CardContent } from './Card';
import { Button } from './Button';
interface DestinationCardProps {
  name: string;
  country: string;
  rating: number;
  duration: string;
  travelers: string | number;
  price: string;
  image?: string;
  emoji?: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onViewDetails?: () => void;
  highlights?: string[];
}
export const DestinationCard = ({
  name,
  country,
  rating,
  duration,
  travelers,
  price,
  image,
  emoji = '🏯',
  isFavorite = false,
  onToggleFavorite,
  onViewDetails,
  highlights = []
}: DestinationCardProps) => {
  return <Card>
      <div className="flex">
        <CardImage src={image} alt={name} emoji={emoji} className="w-36 h-36" />
        <CardContent className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className="font-semibold text-[#2f1b14] font-serif">{name}</h4>
            <button onClick={onToggleFavorite} className="text-[#744a32] hover:scale-110 transition-transform" aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
              <HeartIcon size={18} fill={isFavorite ? '#744a32' : 'none'} />
            </button>
          </div>
          <div className="flex items-center text-sm text-[#6d5a42] mb-1 font-serif">
            <MapPinIcon size={14} className="mr-1" />
            <span>{country}</span>
          </div>
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => <StarIcon key={i} size={14} className={i < rating ? 'text-[#a0522d]' : 'text-[#d4c4a8]'} fill={i < rating ? '#a0522d' : 'none'} />)}
          </div>
          <div className="flex text-xs text-[#6d5a42] mb-2 font-serif">
            <div className="flex items-center mr-2">
              <ClockIcon size={12} className="mr-1" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center">
              <UsersIcon size={12} className="mr-1" />
              <span>{travelers}</span>
            </div>
          </div>
          <div className="text-[#a0522d] font-bold mb-2 font-serif">
            {price}
          </div>
          {highlights.length > 0 && <div className="flex flex-wrap gap-1 mb-2">
              {highlights.slice(0, 2).map((highlight, index) => <span key={index} className="bg-[#e8dcc6] text-[#4a3e2a] text-xs px-2 py-0.5 rounded-full border border-[#bfa888] font-semibold font-serif">
                  {highlight}
                </span>)}
              {highlights.length > 2 && <span className="text-xs text-[#6d5a42] font-serif">
                  +{highlights.length - 2} more
                </span>}
            </div>}
          <Button variant="primary" size="sm" onClick={onViewDetails} className="hover:bg-[#5d3a28] hover:scale-105 transition-all duration-200">
            View Details
          </Button>
        </CardContent>
      </div>
    </Card>;
};