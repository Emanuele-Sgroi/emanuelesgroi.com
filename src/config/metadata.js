const ogImageUrl = "/images/og-image.jpg"; // Stored in `public/images/`

export const defaultMetadata = {
  title: "Emanuele Sgroi | Full-Stack Developer",
  description:
    "Welcome to the portfolio of Emanuele Sgroi, a full-stack developer specializing in React, Next.js, and mobile development. Explore my projects, writings, and interactive Dev Quiz.",
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
    title: "Emanuele Sgroi | Full-Stack Developer, React & Next.js Expert",
    description:
      "Explore Emanuele Sgroi’s portfolio, featuring projects in web and mobile development. Learn from writings, Dev Quiz, and AI-powered ManuPilot.",
    url: "https://somedomain.com",
    type: "website",
    images: [{ url: ogImageUrl }],
  },
};

export const metadataByPage = {
  "/welcome": {
    title: "Welcome | Emanuele Sgroi",
    description:
      "Hi, I'm Emanuele Sgroi, a full-stack developer passionate about building web and mobile applications. Explore my projects, writings, and interactive Dev Quiz!",
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
    description:
      "Improve your coding knowledge with my interactive Dev Quiz. Topics include JavaScript, React, Next.js, and algorithms.",
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
    description: "Join discussions and say hi. just like on GitHub",
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
      "Meet ManuPilot, an AI-powered assistant dinspired by GitHub Copilot",
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
