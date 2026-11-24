import { ArrowLeft } from 'lucide-react';
import { PROFILE_CONFIG } from '../data/portfolioData';

interface NotFoundViewProps {
  pathname: string;
  onNavigateHome: () => void;
}

export function NotFoundView({ pathname, onNavigateHome }: NotFoundViewProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f5f5f7] px-4 text-center">
      <div className="apple-card-light max-w-md rounded-3xl p-8 sm:p-10">
        <p className="font-mono text-xs text-[#0071e3] tabular-nums">404</p>
        <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-[#1d1d1f]">
          Page Not Found
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#6e6e73]">
          The route <span className="font-mono text-[#1d1d1f]">{pathname}</span> does not exist on {PROFILE_CONFIG.name}&apos;s portfolio.
        </p>
        <button
          type="button"
          onClick={onNavigateHome}
          className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#0071e3] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#0077ed] transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Return to Portfolio</span>
        </button>
      </div>
    </main>
  );
}
