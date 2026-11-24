import { EDUCATION_HISTORY, INDUSTRIAL_TRAINING } from '../data/portfolioData';
import { Reveal } from './Reveal';

export function EducationTrainingSection() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="bg-white py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-medium tracking-wide text-[#0071e3]">
            Background
          </p>
          <h2
            id="education-heading"
            className="mt-3 font-display text-3xl font-semibold leading-[1.12] tracking-[-0.025em] text-[#1d1d1f] sm:text-4xl"
          >
            Education & Industrial Training
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#6e6e73] sm:text-lg">
            Technical foundation in general electrical works paired with hands-on electronics industrial training.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Education Timeline */}
          <Reveal className="lg:col-span-6">
            <h3 className="text-xs font-medium tracking-wide text-[#6e6e73]">
              Academic Education
            </h3>

            <div className="mt-5 space-y-5">
              {EDUCATION_HISTORY.map((item) => (
                <article
                  key={item.id}
                  className="apple-card-soft rounded-3xl p-7"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                    <span className="text-[#0071e3]">{item.statusOrYear}</span>
                    {item.result && (
                      <span className="font-medium text-[#1d1d1f] tabular-nums">
                        {item.result}
                      </span>
                    )}
                  </div>

                  <h4 className="mt-3 font-display text-xl font-semibold tracking-tight text-[#1d1d1f]">
                    {item.qualification}
                  </h4>

                  <p className="mt-1.5 text-sm text-[#424245]">
                    {item.institution}
                  </p>

                  <p className="mt-4 border-t border-black/[0.06] pt-3.5 text-xs text-[#6e6e73]">
                    {item.boardOrBatch}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>

          {/* Industrial Training */}
          <Reveal delay={0.08} className="lg:col-span-6">
            <h3 className="text-xs font-medium tracking-wide text-[#6e6e73]">
              Industrial Training
            </h3>

            <article className="apple-card-soft mt-5 rounded-3xl p-7 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                <span className="text-[#0071e3]">
                  {INDUSTRIAL_TRAINING.classificationNote}
                </span>
                <span className="text-[#6e6e73]">Hands-On Electronics</span>
              </div>

              <h4 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[#1d1d1f]">
                {INDUSTRIAL_TRAINING.organization}
              </h4>

              <p className="mt-1.5 text-sm font-medium text-[#424245]">
                {INDUSTRIAL_TRAINING.role}
              </p>

              <p className="mt-2 text-sm text-[#6e6e73]">
                Duration: {INDUSTRIAL_TRAINING.duration}
              </p>

              <div className="mt-7 border-t border-black/[0.06] pt-6">
                <h5 className="text-xs font-medium tracking-wide text-[#6e6e73]">
                  Practical Exposure
                </h5>
                <ul className="mt-4 grid grid-cols-1 gap-2.5 text-sm text-[#1d1d1f] sm:grid-cols-2">
                  {INDUSTRIAL_TRAINING.exposures.map((exposure) => (
                    <li key={exposure} className="font-medium">
                      {exposure}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
