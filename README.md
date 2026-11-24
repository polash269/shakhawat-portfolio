# Shakhawat Hossain — Junior AI Automation Developer Portfolio

Personal developer portfolio for **Shakhawat Hossain** (Junior AI Automation Developer, Dhaka, Bangladesh), built with React, TypeScript, Vite, and Tailwind CSS.

## Project Structure

```text
public/
  favicon.svg                              # Site icon
  robots.txt                               # Search indexing directive
  Shakhawat_Hossain_Professional_ATS_CV.pdf  # Place your CV PDF here before deploying
src/
  assets/images/                           # Generated portfolio visuals
  components/
    AboutSection.tsx
    ContactSection.tsx
    CvModal.tsx
    EducationTrainingSection.tsx
    Footer.tsx
    HeroSection.tsx
    Navbar.tsx
    NotFoundView.tsx
    ProjectModal.tsx
    ProjectsSection.tsx
    SkillsSection.tsx
  data/
    portfolioData.ts                       # Centralized content & link configuration
  types/
    portfolio.ts                           # TypeScript interfaces
  utils/
    portfolioLogic.ts                      # Pure filtering, validation, & URL helpers
    portfolioLogic.test.ts                 # Node.js unit tests
  App.tsx
  index.css
  main.tsx
index.html                                 # SEO, Open Graph, Twitter cards & JSON-LD
vercel.json                                # Vercel SPA routing configuration
```

## Content Management

All personal details, social links, skills, completed projects, in-development initiatives, education, and industrial training records live in:

- `src/data/portfolioData.ts`

### Adding Your GitHub, LinkedIn, and Project URLs

1. Open `src/data/portfolioData.ts`.
2. In `PROFILE_CONFIG.socialLinks`, replace the empty `url: ''` strings with your actual GitHub and LinkedIn URLs.
3. In `COMPLETED_PROJECTS` and `IN_DEVELOPMENT_PROJECTS`, add `githubUrl` or `liveDemoUrl` values whenever a repository or live deployment is ready. Unavailable links stay hidden automatically on the live site.

### Adding Your Downloadable CV PDF

1. Export your ATS-friendly resume as a PDF named exactly:
   `Shakhawat_Hossain_Professional_ATS_CV.pdf`
2. Place it inside the `public/` folder:
   `public/Shakhawat_Hossain_Professional_ATS_CV.pdf`
3. When present, the **Download CV** buttons in the navigation bar and hero section verify the PDF response and download it directly. If the file is missing, the site clearly informs visitors instead of serving a broken link.

### Connecting a Backend Contact Form (Optional)

The contact composer currently validates inputs and prepares a `mailto:` email draft without pretending to store submissions. To accept direct web submissions later, you can point `handleSubmit` in `src/components/ContactSection.tsx` to a static-friendly form endpoint such as Formspree, Web3Forms, or a Vercel Serverless Function (`/api/contact`).

## Local Development & Verification

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Run Type Check, Unit Tests, and Production Build

```bash
npm run lint
npx --yes tsx --test src/utils/portfolioLogic.test.ts
npm run build
```

Preview the production bundle locally:

```bash
npm run preview
```

## Connecting to GitHub

1. Initialize Git (if not already initialized) and commit your project:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   ```
2. Create a new repository on GitHub (do not initialize it with a README if pushing an existing repo).
3. Link and push your local branch:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

## Deploying to Vercel (Free Tier)

1. Sign in to [Vercel](https://vercel.com) with your GitHub account.
2. Click **Add New... -> Project** and import your GitHub repository.
3. Verify the build settings (Vercel auto-detects Vite):
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**. Every future push to `main` automatically triggers a new production deployment.

## Connecting a Custom Domain on Vercel

1. Open your deployed project in the Vercel Dashboard.
2. Navigate to **Settings -> Domains**.
3. Enter your domain name (for example, `shakhawathossain.dev`) and click **Add**.
4. Update your domain registrar's DNS records with the `A` record (`76.76.21.21`) or `CNAME` (`cname.vercel-dns.com`) shown by Vercel.
5. Wait for DNS propagation and automatic HTTPS certificate provisioning.
