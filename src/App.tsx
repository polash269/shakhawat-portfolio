import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { CvModal } from './components/CvModal';
import { EducationTrainingSection } from './components/EducationTrainingSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { NAV_ITEMS, Navbar } from './components/Navbar';
import { NotFoundView } from './components/NotFoundView';
import { ProjectModal } from './components/ProjectModal';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { PROFILE_CONFIG } from './data/portfolioData';
import type { ProjectItem } from './types/portfolio';
import { isPdfResponseAvailable } from './utils/portfolioLogic';

export default function App() {
  const [pathname, setPathname] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [cvMissingOpen, setCvMissingOpen] = useState<boolean>(false);
  const [isCheckingCv, setIsCheckingCv] = useState<boolean>(false);

  const isRootRoute = pathname === '/' || pathname === '/index.html';

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (!isRootRoute) return;

    const sectionIds = NAV_ITEMS.map((item) => item.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0 && visible[0].target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isRootRoute]);

  const handleDownloadCv = async () => {
    setIsCheckingCv(true);
    try {
      const response = await fetch(PROFILE_CONFIG.cvPublicPath, {
        method: 'HEAD',
        cache: 'no-store',
      });
      const available = isPdfResponseAvailable(
        response.status,
        response.headers.get('content-type')
      );

      if (available) {
        const anchor = document.createElement('a');
        anchor.href = PROFILE_CONFIG.cvPublicPath;
        anchor.download = PROFILE_CONFIG.cvFileName;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      } else {
        setCvMissingOpen(true);
      }
    } catch {
      setCvMissingOpen(true);
    } finally {
      setIsCheckingCv(false);
    }
  };

  const handleNavigateHome = () => {
    window.history.pushState({}, '', '/');
    setPathname('/');
  };

  if (!isRootRoute) {
    return (
      <MotionConfig reducedMotion="user">
        <NotFoundView
          pathname={pathname}
          onNavigateHome={handleNavigateHome}
        />
      </MotionConfig>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-white text-[#1d1d1f]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-[#0071e3] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to main content
        </a>

        <Navbar
          activeSection={activeSection}
          onDownloadCv={handleDownloadCv}
          isCheckingCv={isCheckingCv}
        />

        <main id="main-content">
          <HeroSection
            onDownloadCv={handleDownloadCv}
            isCheckingCv={isCheckingCv}
          />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection onSelectProject={setSelectedProject} />
          <EducationTrainingSection />
          <ContactSection />
        </main>

        <Footer />

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        <CvModal
          open={cvMissingOpen}
          onClose={() => setCvMissingOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}
