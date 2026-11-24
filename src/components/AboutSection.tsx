import { PROFILE_CONFIG } from '../data/portfolioData';
import { Reveal } from './Reveal';

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-[#f5f5f7] py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="text-xs font-medium tracking-wide text-[#0071e3]">
              About
            </p>
            <h2
              id="about-heading"
              className="mt-3 font-display text-3xl font-semibold leading-[1.12] tracking-[-0.025em] text-[#1d1d1f] sm:text-4xl"
            >
              Practical AI automation built on{' '}
              <span className="text-apple-gradient">systems fundamentals.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="space-y-6 text-base leading-relaxed text-[#424245] sm:text-lg sm:leading-relaxed">
              {PROFILE_CONFIG.aboutParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 border-t border-black/[0.08] pt-6">
              <h3 className="text-xs font-medium tracking-wide text-[#6e6e73]">
                Core Technical Interests
              </h3>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-[#1d1d1f]">
                {PROFILE_CONFIG.technicalInterests.map((interest, idx) => (
                  <span key={interest} className="inline-flex items-center gap-3">
                    <span>{interest}</span>
                    {idx < PROFILE_CONFIG.technicalInterests.length - 1 && (
                      <span aria-hidden="true" className="text-[#86868b]">
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
