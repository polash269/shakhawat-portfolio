import { useRef, useState } from 'react';
import { ArrowRight, Cpu, Download, ExternalLink } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { PROFILE_CONFIG } from '../data/portfolioData';
import { isValidExternalUrl } from '../utils/portfolioLogic';

interface HeroSectionProps {
  onDownloadCv: () => void;
  isCheckingCv: boolean;
}

const APPLE_EASE = [0.16, 1, 0.3, 1] as const;

export function HeroSection({ onDownloadCv, isCheckingCv }: HeroSectionProps) {
  const [selectedNodeId, setSelectedNodeId] = useState(
    PROFILE_CONFIG.workspaceFocusNodes[0].id
  );
  const [imageError, setImageError] = useState(false);

  const visualContainerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: visualContainerRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [-14, 22]);
  const parallaxScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.01, 1, 1.03]);

  const activeNode =
    PROFILE_CONFIG.workspaceFocusNodes.find((n) => n.id === selectedNodeId) ??
    PROFILE_CONFIG.workspaceFocusNodes[0];

  const availableSocials = PROFILE_CONFIG.socialLinks.filter((s) =>
    isValidExternalUrl(s.url)
  );
  const pendingSocials = PROFILE_CONFIG.socialLinks.filter(
    (s) => !isValidExternalUrl(s.url)
  );

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-white pt-14 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28"
    >
      {/* Subtle Ambient Radial Light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[520px] w-[960px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,113,227,0.06)_0%,rgba(99,102,241,0.03)_45%,transparent_75%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Centered Editorial Hero Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: APPLE_EASE }}
            className="text-sm font-medium tracking-tight text-[#6e6e73]"
          >
            {PROFILE_CONFIG.title} · {PROFILE_CONFIG.location}
          </motion.p>

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.06, ease: APPLE_EASE }}
            className="mt-4 font-display text-[clamp(2.75rem,6vw,4.75rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-[#1d1d1f]"
          >
            {PROFILE_CONFIG.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: APPLE_EASE }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#6e6e73] sm:text-xl"
          >
            {PROFILE_CONFIG.heroIntro}
          </motion.p>

          {/* CTA Hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: APPLE_EASE }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
          >
            <a
              href="#projects"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#0071e3] px-6 py-2.5 text-sm font-medium text-white whitespace-nowrap shrink-0 hover:bg-[#0077ed] transition-colors"
            >
              <span>View Projects</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={onDownloadCv}
              disabled={isCheckingCv}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#f5f5f7] px-6 py-2.5 text-sm font-medium text-[#1d1d1f] whitespace-nowrap shrink-0 hover:bg-[#e8e8ed] disabled:opacity-60 transition-colors cursor-pointer"
            >
              <Download className="h-4 w-4 text-[#0071e3]" aria-hidden="true" />
              <span>{isCheckingCv ? 'Checking CV...' : 'Download CV'}</span>
            </button>

            <a
              href="#contact"
              className="inline-flex min-h-[44px] items-center gap-1 px-4 py-2.5 text-sm font-medium text-[#0071e3] whitespace-nowrap shrink-0 hover:underline"
            >
              <span>Contact Me</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </motion.div>

          {/* Social Links / Clean Editable Placeholders */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#6e6e73]"
          >
            {availableSocials.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-[#1d1d1f] hover:text-[#0071e3] transition-colors"
              >
                <span>{social.label}</span>
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            ))}
            {pendingSocials.map((social) => (
              <span key={social.id} title={social.placeholderNote}>
                {social.label} · Link Pending
              </span>
            ))}
          </motion.div>
        </div>

        {/* Cinematic Studio Showcase & Interactive Focus Architecture */}
        <motion.div
          ref={visualContainerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: APPLE_EASE }}
          className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl border border-black/[0.06] bg-[#f5f5f7] shadow-[0_28px_70px_-28px_rgba(15,23,42,0.16)] sm:mt-14"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#f5f5f7]">
            {!imageError ? (
              <motion.img
                style={
                  shouldReduceMotion
                    ? undefined
                    : { y: parallaxY, scale: parallaxScale }
                }
                src={PROFILE_CONFIG.heroVisualPath}
                alt="Illustrative AI automation developer workstation displaying node-based workflow pipelines and modular assistant panels"
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="h-full w-full object-cover will-change-transform"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#f5f5f7] via-white to-[#eef2f6] p-8 text-center">
                <Cpu className="h-10 w-10 text-[#0071e3]" aria-hidden="true" />
                <p className="mt-3 font-display text-base font-medium text-[#1d1d1f]">
                  AI Automation & Intelligent Systems
                </p>
              </div>
            )}
          </div>

          {/* Interactive Focus Switcher Dock */}
          <div className="border-t border-black/[0.06] bg-white px-5 py-6 sm:px-8">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div
                role="tablist"
                aria-label="Core workspace focus areas"
                className="grid w-full grid-cols-2 gap-1 rounded-full bg-[#f5f5f7] p-1 sm:inline-grid sm:w-auto sm:grid-cols-4"
              >
                {PROFILE_CONFIG.workspaceFocusNodes.map((node) => {
                  const isSelected = node.id === activeNode.id;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`rounded-full px-3.5 py-2 text-center text-xs font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white text-[#1d1d1f] shadow-sm'
                          : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                      }`}
                    >
                      {node.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex-1 lg:pl-6">
                <p className="text-sm leading-relaxed text-[#424245]">
                  {activeNode.summary}
                </p>
                <p className="mt-2 font-mono text-xs text-[#6e6e73]">
                  {activeNode.components.join(' · ')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
