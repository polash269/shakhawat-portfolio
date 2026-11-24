import { useState } from 'react';
import { ArrowUpRight, ExternalLink, Github, Layers } from 'lucide-react';
import {
  COMPLETED_PROJECTS,
  IN_DEVELOPMENT_PROJECTS,
} from '../data/portfolioData';
import type { ProjectCategory, ProjectItem } from '../types/portfolio';
import { filterProjects, isValidExternalUrl } from '../utils/portfolioLogic';
import { Reveal } from './Reveal';

const FILTER_CATEGORIES: ProjectCategory[] = [
  'All',
  'AI Systems',
  'Workflow Automation',
  'Local LLMs',
];

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const visibleCompleted = filterProjects(COMPLETED_PROJECTS, activeCategory);

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="projects" aria-labelledby="projects-heading">
      {/* Completed Projects Showcase — Warm Off-White Canvas */}
      <div className="bg-[#f5f5f7] py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-wide text-[#0071e3]">
                Selected Work
              </p>
              <h2
                id="projects-heading"
                className="mt-3 font-display text-3xl font-semibold leading-[1.12] tracking-[-0.025em] text-[#1d1d1f] sm:text-4xl"
              >
                Built for practical AI & workflow automation.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#6e6e73] sm:text-lg">
                Completed assistant platforms, n8n pipelines, and local language model deployments.
              </p>
            </div>

            <div
              role="group"
              aria-label="Filter completed projects by category"
              className="flex flex-wrap items-center gap-1 self-start rounded-full bg-black/[0.05] p-1 lg:self-auto"
            >
              {FILTER_CATEGORIES.map((category) => {
                const isSelected = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={isSelected}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white text-[#1d1d1f] shadow-sm'
                        : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Large Product-Launch Project Cards */}
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {visibleCompleted.map((project, idx) => {
              const hasGithub = isValidExternalUrl(project.githubUrl);
              const hasDemo = isValidExternalUrl(project.liveDemoUrl);
              const isFlagshipWide =
                activeCategory === 'All' && idx === 0 && visibleCompleted.length === 5;
              const imgFailed = failedImages[project.id];

              return (
                <Reveal
                  key={project.id}
                  delay={idx * 0.05}
                  className={isFlagshipWide ? 'md:col-span-2' : ''}
                >
                  <article
                    className={`group apple-card-light flex h-full flex-col overflow-hidden rounded-3xl transition-shadow duration-300 hover:shadow-[0_24px_60px_-22px_rgba(15,23,42,0.16)] ${
                      isFlagshipWide ? 'lg:grid lg:grid-cols-12' : ''
                    }`}
                  >
                    {/* Studio Visual */}
                    <div
                      className={`relative overflow-hidden bg-[#f5f5f7] ${
                        isFlagshipWide
                          ? 'aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:h-full'
                          : 'aspect-[4/3]'
                      }`}
                    >
                      {project.imagePath && !imgFailed ? (
                        <img
                          src={project.imagePath}
                          alt={project.imageAlt ?? project.title}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          onError={() => handleImageError(project.id)}
                          className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#f5f5f7] to-[#e8e8ed] p-8 text-center">
                          <Layers className="h-8 w-8 text-[#0071e3]" aria-hidden="true" />
                          <p className="mt-2 font-mono text-xs text-[#6e6e73]">
                            Project {project.index}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Editorial Body */}
                    <div
                      className={`flex flex-1 flex-col justify-between p-7 sm:p-9 ${
                        isFlagshipWide ? 'lg:col-span-5' : ''
                      }`}
                    >
                      <div>
                        <p className="font-mono text-xs text-[#6e6e73] tabular-nums">
                          Project {project.index} · {project.category}
                        </p>

                        <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[#1d1d1f]">
                          {project.title}
                        </h3>

                        <p className="mt-4 text-sm leading-relaxed text-[#424245] sm:text-base">
                          {project.shortDescription}
                        </p>
                      </div>

                      <div className="mt-8">
                        <div className="border-t border-black/[0.06] pt-4 text-xs text-[#6e6e73]">
                          {project.technologies.join(' · ')}
                        </div>

                        <div className="mt-5 flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            onClick={() => onSelectProject(project)}
                            aria-label={`View details for ${project.title}`}
                            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-[#1d1d1f] px-4 py-2 text-xs font-medium text-white hover:bg-[#333336] transition-colors cursor-pointer"
                          >
                            <span>View Details</span>
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>

                          {hasGithub && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`GitHub repository for ${project.title}`}
                              className="inline-flex min-h-[40px] items-center gap-1.5 px-2.5 py-2 text-xs font-medium text-[#1d1d1f] hover:text-[#0071e3] transition-colors"
                            >
                              <Github className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>GitHub</span>
                            </a>
                          )}

                          {hasDemo && (
                            <a
                              href={project.liveDemoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Live demo for ${project.title}`}
                              className="inline-flex min-h-[40px] items-center gap-1.5 px-2.5 py-2 text-xs font-medium text-[#0071e3] hover:underline"
                            >
                              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>Live Demo</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sophisticated Dark Titanium Cinematic Band — Projects In Development */}
      <div
        id="in-development"
        aria-labelledby="in-dev-heading"
        className="relative overflow-hidden bg-[#0b0d12] py-20 text-[#f5f5f7] sm:py-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,113,227,0.14)_0%,rgba(99,102,241,0.06)_45%,transparent_75%)]"
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-[#60a5fa]">
              Active Research
            </p>
            <h3
              id="in-dev-heading"
              className="mt-3 font-display text-3xl font-semibold leading-[1.12] tracking-[-0.025em] text-white sm:text-4xl"
            >
              Projects In Development
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[#a1a1aa] sm:text-lg">
              Next-stage systems currently under architecture and prototyping, separate from completed deliverables.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {IN_DEVELOPMENT_PROJECTS.map((project, idx) => {
              const imgFailed = failedImages[project.id];
              return (
                <Reveal key={project.id} delay={idx * 0.08}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.05]">
                    {/* Project Visual */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-white/10 bg-[#0d1118]">
                      {project.imagePath && !imgFailed ? (
                        <img
                          src={project.imagePath}
                          alt={project.imageAlt ?? project.title}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          onError={() => handleImageError(project.id)}
                          className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#121620] to-[#0b0d12] p-8 text-center">
                          <Layers className="h-8 w-8 text-[#60a5fa]" aria-hidden="true" />
                          <p className="mt-2 font-mono text-xs text-[#71717a]">
                            Initiative {project.index}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-7 sm:p-8">
                      <div>
                        <div className="flex items-center justify-between gap-4 font-mono text-xs">
                          <span className="text-[#60a5fa]">In Development</span>
                          <span className="text-[#71717a] tabular-nums">
                            Initiative {project.index}
                          </span>
                        </div>

                        <h4 className="mt-4 font-display text-2xl font-semibold tracking-tight text-white">
                          {project.title}
                        </h4>

                        <p className="mt-3 text-sm leading-relaxed text-[#a1a1aa] sm:text-base">
                          {project.shortDescription}
                        </p>

                        {project.targetEnvironments && (
                          <p className="mt-5 text-xs text-[#d4d4d8]">
                            <span className="text-[#71717a]">Target Environments: </span>
                            {project.targetEnvironments.join(' · ')}
                          </p>
                        )}
                      </div>

                      <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                        <span className="text-xs text-[#71717a]">
                          {project.technologies.join(' · ')}
                        </span>

                        <button
                          type="button"
                          onClick={() => onSelectProject(project)}
                          aria-label={`View scope details for ${project.title}`}
                          className="inline-flex min-h-[36px] shrink-0 items-center gap-1 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-white hover:border-white/35 hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          <span>Scope</span>
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
