import { ExternalLink } from 'lucide-react';
import { PROFILE_CONFIG } from '../data/portfolioData';
import { isValidExternalUrl } from '../utils/portfolioLogic';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const availableSocials = PROFILE_CONFIG.socialLinks.filter((s) =>
    isValidExternalUrl(s.url)
  );

  return (
    <footer className="border-t border-black/[0.08] bg-[#f5f5f7] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <p className="text-xs text-[#6e6e73]">
          Copyright © {currentYear} {PROFILE_CONFIG.name}. All rights reserved.
        </p>

        {availableSocials.length > 0 ? (
          <nav aria-label="Social links" className="flex flex-wrap items-center gap-6">
            {availableSocials.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-[#1d1d1f] hover:text-[#0071e3] transition-colors"
              >
                <span>{social.label}</span>
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            ))}
          </nav>
        ) : (
          <p className="text-xs text-[#86868b]">
            {PROFILE_CONFIG.title} · {PROFILE_CONFIG.location}
          </p>
        )}
      </div>
    </footer>
  );
}
