import { useEffect, useState } from 'react';
import { ExternalLink, Github, Layers, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { ProjectItem } from '../types/portfolio';
import { isValidExternalUrl } from '../utils/portfolioLogic';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

const APPLE_EASE = [0.16, 1, 0.3, 1] as const;

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  const hasGithub = project ? isValidExternalUrl(project.githubUrl) : false;
  const hasDemo = project ? isValidExternalUrl(project.liveDemoUrl) : false;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
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
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-black/[0.08] bg-white shadow-[0_32px_80px_-20px_rgba(0,0,0,0.28)]"
          >
            {/* Header Bar */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-black/[0.06] bg-white/90 px-6 py-4 backdrop-blur-xl">
              <div className="flex items-center gap-2 font-mono text-xs text-[#6e6e73]">
                <span
                  className={
                    project.status === 'Completed'
                      ? 'text-[#0071e3]'
                      : 'text-[#6366f1]'
                  }
                >
                  {project.status}
                </span>
                <span aria-hidden="true">·</span>
                <span>{project.category}</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed] transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Visual Frame */}
            {project.imagePath && (
              <div className="border-b border-black/[0.06] bg-[#f5f5f7]">
                <div className="aspect-[16/9] w-full overflow-hidden">
                  {!imageError ? (
                    <img
                      src={project.imagePath}
                      alt={project.imageAlt ?? project.title}
                      referrerPolicy="no-referrer"
                      onError={() => setImageError(true)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#f5f5f7] to-[#e8e8ed] p-6 text-center">
                      <Layers className="h-9 w-9 text-[#0071e3]" aria-hidden="true" />
                      <p className="mt-2 font-mono text-xs text-[#6e6e73]">
                        {project.title}
                      </p>
                    </div>
                  )}
                </div>
                <p className="border-t border-black/[0.04] px-6 py-2 text-[11px] text-[#6e6e73]">
                  Illustrative concept visual representing project architecture
                </p>
              </div>
            )}

            {/* Modal Content */}
            <div className="p-7 sm:p-9">
              <h3
                id="project-modal-title"
                className="font-display text-2xl font-semibold tracking-tight text-[#1d1d1f]"
              >
                {project.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-[#424245] sm:text-base">
                {project.detailedOverview}
              </p>

              {project.targetEnvironments && project.targetEnvironments.length > 0 && (
                <div className="mt-6 border-t border-black/[0.06] pt-5">
                  <h4 className="text-xs font-medium tracking-wide text-[#6e6e73]">
                    Target Operating Environments
                  </h4>
                  <p className="mt-2 text-sm font-medium text-[#1d1d1f]">
                    {project.targetEnvironments.join(' · ')}
                  </p>
                </div>
              )}

              <div className="mt-6 border-t border-black/[0.06] pt-5">
                <h4 className="text-xs font-medium tracking-wide text-[#6e6e73]">
                  Scope & Focus Areas
                </h4>
                <ul className="mt-3 space-y-2 text-sm text-[#424245]">
                  {project.architectureHighlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0071e3]"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-black/[0.06] pt-5">
                <h4 className="text-xs font-medium tracking-wide text-[#6e6e73]">
                  Technologies & Concepts
                </h4>
                <p className="mt-2 text-sm font-medium text-[#1d1d1f]">
                  {project.technologies.join(' · ')}
                </p>
              </div>

              {/* Link Footer */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.06] pt-5">
                {hasGithub || hasDemo ? (
                  <div className="flex flex-wrap items-center gap-3">
                    {hasGithub && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-[#f5f5f7] px-4 py-2 text-xs font-medium text-[#1d1d1f] hover:bg-[#e8e8ed] transition-colors"
                      >
                        <Github className="h-4 w-4" aria-hidden="true" />
                        <span>View Repository</span>
                      </a>
                    )}
                    {hasDemo && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-[#0071e3] px-4 py-2 text-xs font-medium text-white hover:bg-[#0077ed] transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        <span>Open Live Demo</span>
                      </a>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-[#6e6e73]">
                    Public repository and live links are not yet published for this project.
                  </p>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex min-h-[40px] items-center rounded-full bg-[#1d1d1f] px-5 py-2 text-xs font-medium text-white hover:bg-[#333336] transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
