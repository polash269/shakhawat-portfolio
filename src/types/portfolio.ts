export type ProjectCategory =
  | 'All'
  | 'AI Systems'
  | 'Workflow Automation'
  | 'Local LLMs';

export interface SocialLinkConfig {
  id: 'github' | 'linkedin';
  label: string;
  url: string;
  placeholderNote: string;
}

export interface WorkspaceFocusNode {
  id: string;
  label: string;
  summary: string;
  components: string[];
}

export interface ProfileConfig {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  phoneHref: string;
  heroIntro: string;
  heroVisualPath: string;
  cvPublicPath: string;
  cvUploadFilePath: string;
  cvFileName: string;
  aboutParagraphs: string[];
  technicalInterests: string[];
  workspaceFocusNodes: WorkspaceFocusNode[];
  socialLinks: SocialLinkConfig[];
}

export interface SkillCategory {
  id: string;
  title: string;
  summary: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  shortDescription: string;
  detailedOverview: string;
  category: Exclude<ProjectCategory, 'All'>;
  status: 'Completed' | 'In Development';
  technologies: string[];
  imagePath?: string;
  imageAlt?: string;
  githubUrl: string;
  liveDemoUrl: string;
  architectureHighlights: string[];
  targetEnvironments?: string[];
}

export interface EducationItem {
  id: string;
  qualification: string;
  statusOrYear: string;
  institution: string;
  boardOrBatch: string;
  result?: string;
}

export interface TrainingItem {
  id: string;
  organization: string;
  role: string;
  duration: string;
  classificationNote: string;
  exposures: string[];
}

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormValues, string>>;
}
