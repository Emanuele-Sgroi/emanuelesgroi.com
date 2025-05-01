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

import metadataTranslations from "@/translations/metadataTranslation";

const my_url = process.env.NEXT_PUBLIC_BASE_URL; // Fallback
const ogImageUrl = `${my_url}/images/og-image.jpg`; // Absolute URL for OG images

/**
 * Fetch default metadata dynamically based on language
 *
 * @param {string} lang - Language code ("en" or "it")
 * @returns {object} Default metadata
 */
export const getDefaultMetadata = (lang = "en") => {
  const translation = metadataTranslations[lang] || metadataTranslations.en;

  return {
    metadataBase: new URL(my_url),
    title: translation.default.title,
    description: translation.default.description,
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
      title: translation.default.title,
      description: translation.default.description,
      url: my_url,
      type: "website",
      images: [{ url: ogImageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: translation.default.title,
      description: translation.default.description,
      images: [ogImageUrl],
    },
  };
};

/**
 * Fetch page-specific metadata dynamically based on page and language
 *
 * @param {string} page - Page key (e.g., "welcome", "portfolio")
 * @param {string} lang - Language code ("en" or "it")
 * @returns {object} Metadata object for the page
 */
export const getMetadataByPage = (page, lang = "en") => {
  const translation = metadataTranslations[lang] || metadataTranslations.en;

  return {
    title: translation.pages[page]?.title || translation.default.title,
    description:
      translation.pages[page]?.description || translation.default.description,
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
      title: translation.pages[page]?.title || translation.default.title,
      description:
        translation.pages[page]?.description || translation.default.description,
      url: my_url,
      type: "website",
      images: [{ url: ogImageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: translation.pages[page]?.title || translation.default.title,
      description:
        translation.pages[page]?.description || translation.default.description,
      images: [ogImageUrl],
    },
  };
};
