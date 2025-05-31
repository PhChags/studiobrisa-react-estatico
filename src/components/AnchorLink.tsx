import { useLocation, useNavigate } from 'react-router-dom';
import type { ReactNode, MouseEvent } from 'react';

interface AnchorLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

export default function AnchorLink({ to, children, className }: AnchorLinkProps) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [path, hash] = to.split('#');
  
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => { 
    e.preventDefault();
    
    if (location.pathname === path) {
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          window.history.pushState(null, '', `#${hash}`);
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      navigate(to);
    }
  };

  return (
    <a 
      href={to} 
      onClick={handleClick} 
      className={className}
    >
      {children}
    </a>
  );
}