import { useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { PROFILE_CONFIG } from '../data/portfolioData';

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'education', label: 'Education', href: '#education' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

interface NavbarProps {
  activeSection: string;
  onDownloadCv: () => void;
  isCheckingCv: boolean;
}

export function Navbar({ activeSection, onDownloadCv, isCheckingCv }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Wordmark */}
        <a
          href="#home"
          onClick={handleLinkClick}
          className="font-display text-base font-semibold tracking-tight text-[#1d1d1f] whitespace-nowrap shrink-0 hover:opacity-75 transition-opacity"
        >
          {PROFILE_CONFIG.name}
        </a>

        {/* Zone 2: Desktop Navigation Links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-xs font-medium tracking-tight whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'text-[#1d1d1f]'
                    : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-[#0071e3]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onDownloadCv}
            disabled={isCheckingCv}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#0071e3] px-4 py-1.5 text-xs font-medium text-white whitespace-nowrap shrink-0 hover:bg-[#0077ed] disabled:opacity-60 transition-colors cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{isCheckingCv ? 'Checking...' : 'Download CV'}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#1d1d1f] hover:bg-black/[0.04] md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-menu"
          aria-label="Mobile navigation"
          className="border-t border-black/[0.06] bg-white/95 px-4 py-4 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={handleLinkClick}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex min-h-[44px] items-center rounded-xl px-3.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#f5f5f7] text-[#0071e3]'
                        : 'text-[#1d1d1f] hover:bg-[#f5f5f7]'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="mt-3 border-t border-black/[0.06] pt-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onDownloadCv();
              }}
              disabled={isCheckingCv}
              className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[#0071e3] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#0077ed] disabled:opacity-60 transition-colors cursor-pointer"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>{isCheckingCv ? 'Checking CV...' : 'Download CV'}</span>
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
