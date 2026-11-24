import type {
  ContactFormValues,
  ContactValidationResult,
  ProjectCategory,
  ProjectItem,
} from '../types/portfolio';

export function isValidExternalUrl(url?: string | null): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (!trimmed || trimmed === '#' || trimmed.startsWith('PLACEHOLDER')) {
    return false;
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function filterProjects(
  projects: ProjectItem[],
  category: ProjectCategory
): ProjectItem[] {
  if (category === 'All') {
    return projects;
  }
  return projects.filter((project) => project.category === category);
}

export function validateContactForm(
  values: ContactFormValues
): ContactValidationResult {
  const errors: Partial<Record<keyof ContactFormValues, string>> = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (name.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (subject.length < 3) {
    errors.subject = 'Please enter a short subject (at least 3 characters).';
  }

  if (message.length < 10) {
    errors.message = 'Please enter a message (at least 10 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildMailtoHref(
  recipientEmail: string,
  values: ContactFormValues
): string {
  const subject = encodeURIComponent(values.subject.trim());
  const body = encodeURIComponent(
    `Name: ${values.name.trim()}\nReply-To: ${values.email.trim()}\n\n${values.message.trim()}`
  );
  return `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
}

export function isPdfResponseAvailable(
  status: number,
  contentType: string | null
): boolean {
  if (status < 200 || status >= 300) {
    return false;
  }
  if (!contentType) {
    return false;
  }
  return contentType.toLowerCase().includes('application/pdf');
}
