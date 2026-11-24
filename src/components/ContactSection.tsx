import { useState, type FormEvent } from 'react';
import { Check, Copy, ExternalLink, Mail, MapPin, Phone, Send } from 'lucide-react';
import { PROFILE_CONFIG } from '../data/portfolioData';
import type { ContactFormValues } from '../types/portfolio';
import {
  buildMailtoHref,
  isValidExternalUrl,
  validateContactForm,
} from '../utils/portfolioLogic';
import { Reveal } from './Reveal';

export function ContactSection() {
  const [formValues, setFormValues] = useState<ContactFormValues>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});
  const [preparedMailto, setPreparedMailto] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  const availableSocials = PROFILE_CONFIG.socialLinks.filter((s) =>
    isValidExternalUrl(s.url)
  );
  const pendingSocials = PROFILE_CONFIG.socialLinks.filter(
    (s) => !isValidExternalUrl(s.url)
  );

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_CONFIG.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Clipboard API unavailable in restricted contexts
    }
  };

  const handleCopyDraft = async () => {
    const formatted = `To: ${PROFILE_CONFIG.email}\nSubject: ${formValues.subject.trim()}\nFrom: ${formValues.name.trim()} (${formValues.email.trim()})\n\n${formValues.message.trim()}`;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopiedDraft(true);
      window.setTimeout(() => setCopiedDraft(false), 2000);
    } catch {
      // Clipboard API unavailable in restricted contexts
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateContactForm(formValues);
    setErrors(validation.errors);
    if (!validation.valid) {
      setPreparedMailto(null);
      return;
    }

    const href = buildMailtoHref(PROFILE_CONFIG.email, formValues);
    setPreparedMailto(href);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-[#f5f5f7] py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-medium tracking-wide text-[#0071e3]">
            Contact
          </p>
          <h2
            id="contact-heading"
            className="mt-3 font-display text-3xl font-semibold leading-[1.12] tracking-[-0.025em] text-[#1d1d1f] sm:text-4xl"
          >
            Let&apos;s build practical systems together.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#6e6e73] sm:text-lg">
            Open to junior AI automation roles, workflow engineering collaborations, and technology projects.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Direct Contact Details */}
          <Reveal className="lg:col-span-5">
            <div className="apple-card-light flex h-full flex-col justify-between rounded-3xl p-7 sm:p-8">
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-medium text-[#6e6e73]">
                    Direct Email
                  </p>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                    <a
                      href={`mailto:${PROFILE_CONFIG.email}`}
                      className="inline-flex items-center gap-2 text-base font-medium text-[#1d1d1f] hover:text-[#0071e3] transition-colors"
                    >
                      <Mail className="h-4 w-4 text-[#0071e3]" aria-hidden="true" />
                      <span>{PROFILE_CONFIG.email}</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label="Copy contact address"
                      title={`Copy ${PROFILE_CONFIG.email}`}
                      className="inline-flex items-center gap-1 rounded-full bg-[#f5f5f7] px-3 py-1 text-xs font-medium text-[#1d1d1f] hover:bg-[#e8e8ed] transition-colors cursor-pointer"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#0071e3]" aria-hidden="true" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-[#6e6e73]">Phone</p>
                  <a
                    href={PROFILE_CONFIG.phoneHref}
                    className="mt-2 inline-flex items-center gap-2 text-base font-medium text-[#1d1d1f] tabular-nums hover:text-[#0071e3] transition-colors"
                  >
                    <Phone className="h-4 w-4 text-[#0071e3]" aria-hidden="true" />
                    <span>{PROFILE_CONFIG.phone}</span>
                  </a>
                </div>

                <div>
                  <p className="text-xs font-medium text-[#6e6e73]">Location</p>
                  <p className="mt-2 inline-flex items-center gap-2 text-base font-medium text-[#1d1d1f]">
                    <MapPin className="h-4 w-4 text-[#0071e3]" aria-hidden="true" />
                    <span>{PROFILE_CONFIG.location}</span>
                  </p>
                </div>

                <div className="border-t border-black/[0.06] pt-5">
                  <p className="text-xs font-medium text-[#6e6e73]">
                    Professional Profiles
                  </p>
                  <div className="mt-3 flex flex-col gap-2 text-sm">
                    {availableSocials.map((social) => (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-medium text-[#1d1d1f] hover:text-[#0071e3] transition-colors"
                      >
                        <span>{social.label}</span>
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    ))}
                    {pendingSocials.map((social) => (
                      <p
                        key={social.id}
                        title={social.placeholderNote}
                        className="text-[#6e6e73]"
                      >
                        {social.label} · Link placeholder (editable in config)
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-black/[0.06] pt-6">
                <a
                  href={`mailto:${PROFILE_CONFIG.email}?subject=${encodeURIComponent(
                    'Opportunity for Shakhawat Hossain'
                  )}`}
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[#0071e3] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#0077ed] transition-colors"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>Email Me</span>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Contact Draft Composer */}
          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="apple-card-light rounded-3xl p-7 sm:p-8">
              <h3 className="font-display text-xl font-semibold tracking-tight text-[#1d1d1f]">
                Compose an Email Message
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#6e6e73]">
                Prepares a validated email draft for your mail client without storing data on a backend server.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-[#1d1d1f]"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={formValues.name}
                      onChange={(e) =>
                        setFormValues((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="Your name"
                      className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#f5f5f7] px-3.5 py-2.5 text-sm text-[#1d1d1f] placeholder:text-[#86868b] focus:border-[#0071e3] focus:bg-white focus:outline-none transition-colors"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-rose-600" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-medium text-[#1d1d1f]"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formValues.email}
                      onChange={(e) =>
                        setFormValues((prev) => ({ ...prev, email: e.target.value }))
                      }
                      placeholder="you@company.com"
                      className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#f5f5f7] px-3.5 py-2.5 text-sm text-[#1d1d1f] placeholder:text-[#86868b] focus:border-[#0071e3] focus:bg-white focus:outline-none transition-colors"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-rose-600" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-medium text-[#1d1d1f]"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={formValues.subject}
                    onChange={(e) =>
                      setFormValues((prev) => ({ ...prev, subject: e.target.value }))
                    }
                    placeholder="Project collaboration or role inquiry"
                    className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#f5f5f7] px-3.5 py-2.5 text-sm text-[#1d1d1f] placeholder:text-[#86868b] focus:border-[#0071e3] focus:bg-white focus:outline-none transition-colors"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-xs text-rose-600" role="alert">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-[#1d1d1f]"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formValues.message}
                    onChange={(e) =>
                      setFormValues((prev) => ({ ...prev, message: e.target.value }))
                    }
                    placeholder="Share details about your automation project or team..."
                    className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#f5f5f7] px-3.5 py-2.5 text-sm text-[#1d1d1f] placeholder:text-[#86868b] focus:border-[#0071e3] focus:bg-white focus:outline-none transition-colors"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-rose-600" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#1d1d1f] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#333336] transition-colors cursor-pointer"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>Prepare Email Draft</span>
                  </button>
                </div>
              </form>

              {preparedMailto && (
                <div
                  role="status"
                  className="mt-6 rounded-2xl border border-[#0071e3]/20 bg-[#0071e3]/[0.04] p-5"
                >
                  <p className="text-sm font-medium text-[#1d1d1f]">
                    Email draft ready for {PROFILE_CONFIG.email}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#6e6e73]">
                    No backend form endpoint is configured yet, so nothing was transmitted automatically. Open your email client below to send directly.
                  </p>
                  <div className="mt-3.5 flex flex-wrap items-center gap-3">
                    <a
                      href={preparedMailto}
                      className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-[#0071e3] px-4 py-2 text-xs font-medium text-white hover:bg-[#0077ed] transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Open in Email App</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyDraft}
                      className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-medium text-[#1d1d1f] border border-black/10 hover:bg-[#f5f5f7] transition-colors cursor-pointer"
                    >
                      {copiedDraft ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#0071e3]" aria-hidden="true" />
                          <span>Draft Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Copy Draft Text</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
