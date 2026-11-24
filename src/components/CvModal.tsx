import { useEffect } from 'react';
import { FileWarning, Mail, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PROFILE_CONFIG } from '../data/portfolioData';

interface CvModalProps {
  open: boolean;
  onClose: () => void;
}

const APPLE_EASE = [0.16, 1, 0.3, 1] as const;

export function CvModal({ open, onClose }: CvModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="cv-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-md"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.28, ease: APPLE_EASE }}
            className="w-full max-w-lg rounded-3xl border border-black/[0.08] bg-white p-7 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.28)] sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <FileWarning className="h-5 w-5 text-amber-500" aria-hidden="true" />
                <h3
                  id="cv-modal-title"
                  className="font-display text-lg font-semibold text-[#1d1d1f]"
                >
                  CV PDF Not Uploaded Yet
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close CV status dialog"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed] transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[#424245]">
              This portfolio is configured to serve the downloadable PDF directly from:
            </p>

            <pre className="mt-3 overflow-x-auto rounded-2xl border border-black/[0.06] bg-[#f5f5f7] px-4 py-3 font-mono text-xs text-[#0071e3]">
              {PROFILE_CONFIG.cvUploadFilePath}
            </pre>

            <p className="mt-3 text-sm leading-relaxed text-[#6e6e73]">
              Once the PDF file is placed in the{' '}
              <span className="font-mono text-[#1d1d1f]">public/</span> folder, clicking Download CV will automatically download{' '}
              <span className="font-mono text-[#1d1d1f]">{PROFILE_CONFIG.cvFileName}</span>.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-black/[0.06] pt-5">
              <a
                href={`mailto:${PROFILE_CONFIG.email}?subject=${encodeURIComponent(
                  'Request for Shakhawat Hossain CV'
                )}`}
                onClick={onClose}
                className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-[#0071e3] px-5 py-2 text-xs font-medium text-white hover:bg-[#0077ed] transition-colors"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Request CV via Email</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-[40px] items-center rounded-full bg-[#f5f5f7] px-5 py-2 text-xs font-medium text-[#1d1d1f] hover:bg-[#e8e8ed] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
