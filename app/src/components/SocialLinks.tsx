// ============================================
// SOCIAL LINKS — componente compartido
// ============================================

import { Instagram, Music2, ExternalLink, Facebook, Youtube } from 'lucide-react';
import { SOCIAL_COLORS } from '@/data/bioData';
import { useBioSounds } from '@/hooks/useBioSounds';

function BandLabIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm-1 4v8l6-4-6-4z"/>
    </svg>
  );
}

interface SocialLinkItem {
  href: string;
  label: string;
  color: string;
  icon: React.ReactNode;
}

const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    href: 'https://www.instagram.com/h.a.t.e.r_s/',
    label: '@h.a.t.e.r_s',
    color: SOCIAL_COLORS.instagram,
    icon: <Instagram className="w-4 h-4" />,
  },
  {
    href: 'https://www.tiktok.com/@h.a.t.e.r_s',
    label: '@h.a.t.e.r_s',
    color: SOCIAL_COLORS.tiktok,
    icon: <Music2 className="w-4 h-4" />,
  },
  {
    href: 'https://www.bandlab.com/odiantes26/albums/50defbee-d00a-f111-a69b-000d3a42e79d',
    label: 'BANDLAB',
    color: SOCIAL_COLORS.bandlab,
    icon: <BandLabIcon className="w-4 h-4" />,
  },
  {
    href: 'https://soundcloud.com/h-a-t-e-r-s',
    label: 'SOUNDCLOUD',
    color: SOCIAL_COLORS.soundcloud,
    icon: <Music2 className="w-4 h-4" />,
  },
  {
    href: 'https://linktr.ee/h.a.t.e.r_s',
    label: 'LINKTREE',
    color: SOCIAL_COLORS.linktree,
    icon: <ExternalLink className="w-4 h-4" />,
  },
  {
    href: 'https://www.facebook.com/hatersbiopunk',
    label: 'FACEBOOK',
    color: SOCIAL_COLORS.facebook,
    icon: <Facebook className="w-4 h-4" />,
  },
  {
    href: 'https://www.youtube.com/watch?v=XjU0eXC-ef8',
    label: 'YOUTUBE',
    color: SOCIAL_COLORS.youtube,
    icon: <Youtube className="w-4 h-4" />,
  },
];

// Subset sin YouTube (para Hero y Transmission que no lo muestran en la fila)
const SOCIAL_LINKS_NO_YT = SOCIAL_LINKS.filter(l => l.label !== 'YOUTUBE');

interface SocialLinksProps {
  /** Mostrar YouTube en la lista. Default: false */
  includeYoutube?: boolean;
  /** Tamaño de los iconos. Default: 'sm' */
  size?: 'sm' | 'md';
  className?: string;
}

export function SocialLinks({ includeYoutube = false, size = 'sm', className = '' }: SocialLinksProps) {
  const { playHover, playClick } = useBioSounds();
  const links = includeYoutube ? SOCIAL_LINKS : SOCIAL_LINKS_NO_YT;
  const iconSize = size === 'md' ? 'w-5 h-5' : 'w-4 h-4';
  const padding = size === 'md' ? 'px-4 py-2' : 'px-3 py-2';

  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={playHover}
          onClick={playClick}
          className={`flex items-center gap-2 ${padding} border transition-all`}
          style={{
            borderColor: `${link.color}50`,
            backgroundColor: `${link.color}10`,
            color: link.color,
          }}
          onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = `${link.color}20`; }}
          onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = `${link.color}10`; }}
        >
          <span className={iconSize} style={{ color: link.color }}>
            {link.icon}
          </span>
          <span className="text-xs">{link.label}</span>
        </a>
      ))}
    </div>
  );
}
