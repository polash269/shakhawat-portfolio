import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Reveal } from './Reveal';

export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="bg-white py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-medium tracking-wide text-[#0071e3]">
            Capabilities
          </p>
          <h2
            id="skills-heading"
            className="mt-3 font-display text-3xl font-semibold leading-[1.12] tracking-[-0.025em] text-[#1d1d1f] sm:text-4xl"
          >
            Focused across automation, APIs, local AI, and IT infrastructure.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#6e6e73] sm:text-lg">
            A clear overview of practical tools, operating environments, and integration workflows.
          </p>
        </Reveal>

        <div className="mt-14 border-t border-black/[0.08]">
          {SKILL_CATEGORIES.map((category, idx) => (
            <Reveal
              key={category.id}
              delay={idx * 0.05}
              className="grid grid-cols-1 gap-6 border-b border-black/[0.08] py-8 md:grid-cols-12 md:items-start md:gap-10"
            >
              <div className="flex items-baseline gap-4 md:col-span-4">
                <span className="font-mono text-xs text-[#86868b] tabular-nums">
                  0{idx + 1}
                </span>
                <h3 className="font-display text-xl font-semibold tracking-tight text-[#1d1d1f]">
                  {category.title}
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-[#6e6e73] md:col-span-4">
                {category.summary}
              </p>

              <ul className="space-y-2 md:col-span-4">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-sm font-medium text-[#1d1d1f]"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
