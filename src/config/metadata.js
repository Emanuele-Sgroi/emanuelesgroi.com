/**
 * Metadata Configuration
 *
 * This file contains the default metadata and page-specific metadata for the portfolio website.
 * It provides SEO-friendly metadata, including Open Graph and Twitter card information, for all pages.
 * The metadata is dynamically populated for each page of the site.
 *
 * The `defaultMetadata` includes:
 * - **Metadata base URL**: This is the base URL for the website, typically retrieved from the environment variable.
 * - **Title**: A generic title for the website.
 * - **Description**: A brief description of the website for search engines and social media.
 * - **Keywords**: A list of keywords that represent the content of the site for search engines.
 * - **Open Graph**: Meta tags for sharing on social media (like Facebook and LinkedIn).
 * - **Twitter**: Meta tags for sharing on Twitter, including card type and image.

 * The `metadataByPage` contains specific metadata for each page of the site:
 * - **Home**: Metadata for the homepage, including a brief introduction and portfolio-related keywords.
 * - **Portfolio**: Metadata for the portfolio section of the website.
 * - **Writings**: Metadata for the blog and academic writings section.
 * - **Dev Quiz**: Metadata for the interactive coding quiz section.
 * - **Discussions**: Metadata for the discussions page, where users can engage with content.
 * - **Contact**: Metadata for the contact page.
 * - **ManuPilot**: Metadata for the AI assistant page.
 * - **About This Website**: Metadata for the page explaining how the website was built.
 * - **Not Found**: Metadata for the 404 page that appears when a page is not found.
 *
 * The metadata for each page includes:
 * - **Title**: The title of the page.
 * - **Description**: A description of the page content.
 * - **Keywords**: A list of keywords related to the content on the page, helping with search engine optimization.
 */

const my_url = process.env.NEXT_PUBLIC_BASE_URL; // Fallback for safety
const ogImageUrl = `${my_url}/images/og-image.jpg`; // Absolute URL for Open Graph images

export const defaultMetadata = {
  metadataBase: new URL(my_url), // Required for correct OG image paths
  title: "Emanuele Sgroi | Full-Stack Developer",
  description:
    "Hi, I’m Emanuele Sgroi — a full-stack developer who enjoys building web and mobile apps with React, Next.js, and modern tools. This portfolio showcases my projects, writings, and a few interactive features I’ve built along the way.",
  keywords: [
    "Emanuele Sgroi",
    "Full-Stack Developer",
    "React Developer",
    "Next.js",
    "JavaScript",
    "Mobile Development",
    "Web Development",
    "Software Engineer",
    "Freelance Developer",
    "GitHub Portfolio",
    "Open Source",
    "Coding Tutorials",
  ],
  openGraph: {
    title: "Emanuele Sgroi | Full-Stack Developer",
    description:
      "A portfolio by Emanuele Sgroi — full-stack developer building web and mobile apps with React, Next.js, and modern tools.",
    url: my_url,
    type: "website",
    images: [{ url: ogImageUrl }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emanuele Sgroi | Full-Stack Developer",
    description:
      "A portfolio by Emanuele Sgroi — full-stack developer building web and mobile apps with React, Next.js, and modern tools.",
    images: [ogImageUrl],
  },
};

export const metadataByPage = {
  "/": {
    title: "Welcome | Emanuele Sgroi",
    description:
      "Hi, I’m Emanuele Sgroi — a full-stack developer who enjoys building web and mobile apps with React, Next.js, and modern tools. This portfolio showcases my projects, writings, and a few interactive features I’ve built along the way.",
    keywords: [
      "Portfolio",
      "Projects",
      "React",
      "Next.js",
      "Web Developer",
      "Software Engineering",
      "Interactive",
      "GitHub Portfolio",
    ],
  },
  "/portfolio": {
    title: "Portfolio | Dev Projects by Emanuele Sgroi",
    description:
      "Browse my portfolio of applications built with React, Next.js, and other modern technologies.",
    keywords: [
      "Web Development Portfolio",
      "Mobile Development",
      "Next.js Projects",
      "React Projects",
      "Open Source Contributions",
      "Freelance Developer",
      "Software Engineer Portfolio",
    ],
  },
  "/writings": {
    title: "Writings | Blogs & Academic Papers by Emanuele Sgroi",
    description:
      "Read my latest blog posts on web development, software engineering, and my academic papers.",
    keywords: [
      "Technical Blog",
      "Web Development Blog",
      "Software Engineering Articles",
      "Academic Research",
      "JavaScript Tutorials",
      "Next.js Guides",
    ],
  },
  "/dev-quiz": {
    title: "Dev Quiz | Get prepared for interviews",
    description: "Improve your coding knowledge with my interactive Dev Quiz.",
    keywords: [
      "Dev Quiz",
      "Coding Quiz",
      "JavaScript Challenges",
      "React Interview Questions",
      "Frontend Developer Quiz",
      "Next.js Trivia",
      "Software Engineering Questions",
    ],
  },
  "/discussions": {
    title: "Discussions | Engage & Share Insights",
    description: "Join discussions and say hi, just like on GitHub.",
    keywords: [
      "Developer Discussions",
      "Web Development Forum",
      "Coding Questions",
      "React Discussions",
      "Next.js Community",
    ],
  },
  "/contact": {
    title: "Contact | Reach Emanuele Sgroi",
    description:
      "Get in touch with me if you would like. I usually respond fast!",
    keywords: [
      "Contact Developer",
      "Hire a React Developer",
      "Freelance Developer",
      "Networking",
      "Software Engineering Jobs",
      "Collaboration",
    ],
  },
  "/manupilot": {
    title: "ManuPilot AI | GitHub Copilot Clone",
    description:
      "Meet ManuPilot, an AI-powered assistant inspired by GitHub Copilot.",
    keywords: [
      "AI Chatbot",
      "Coding Assistant",
      "Web Development AI",
      "JavaScript AI",
      "ManuPilot",
      "Next.js Assistant",
    ],
  },
  "/about-this-website": {
    title: "About This Website | Emanuele Sgroi",
    description: "Learn how I built this website if you are interested.",
    keywords: [
      "Next.js Portfolio",
      "React Website",
      "GitHub-Like UI",
      "Frontend Development",
      "Tailwind CSS",
    ],
  },
  "/not-found": {
    title: "Page Not Found | Emanuele Sgroi",
    description: "Oops! The page you're looking for doesn't exist.",
    keywords: [
      "404 Page",
      "Page Not Found",
      "Error",
      "Lost Page",
      "Web Development",
      "Portfolio",
    ],
  },
};
