import React from 'react';
import { Heart, HeartFill } from 'react-bootstrap-icons';

interface HeartIconProps {
  isFavorito: boolean;
  onClick: () => void;
  className?: string;
}

const HeartIcon: React.FC<HeartIconProps> = ({ isFavorito, onClick, className }) => {
  return (
    <a 
      href="#" 
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`text-decoration-none ${className}`}
      aria-label={isFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      {isFavorito ? 
        <HeartFill className="text-danger" size={20} /> : 
        <Heart className="text-danger" size={20} />
      }
    </a>
  );
};

export default HeartIcon;