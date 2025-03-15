import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Loading, ErrorMessage } from "@/components";
import ProjectDetailsPage from "@/pages/ProjectDetailsPage";
import { fetchProject, fetchProjectSlugs } from "@/utils/fetchCMSContent";
import { getAssetUrl } from "@/utils/imageUtils";

// Generate static paths for project slugs
export async function generateStaticParams() {
  try {
    const { data, error } = await fetchProjectSlugs();
    if (error || !data?.length) {
      console.error("No project slugs found:", error);
      return [];
    }
    return data.map((slug) => ({ slug }));
  } catch (error) {
    console.error("Error generating project slugs:", error);
    return [];
  }
}

// Generate metadata dynamically based on the project details
export async function generateMetadata({ params }) {
  const { data: project, error } = await fetchProject(params.slug);

  if (error || !project) {
    return {
      title: "Project Not Found | Emanuele Sgroi",
      description: "Oops! This page doesn't exist.",
    };
  }

  return {
    title: project.projectTitle || "Project Details | Emanuele Sgroi",
    description: project.smallDescription || "Check this project.",
    keywords: project.metaKeywords?.split(", ") || [
      "Web Development",
      "React",
      "Next.js",
      "Mobile Development",
      "Computer Science",
      "Software Engineer",
    ],
    openGraph: {
      title: project.postTitle || "Blog Post | Emanuele Sgroi",
      description: project.smallDescription || "Read this blog post.",
      url: `https://somedomain.com/blog/${params.slug}`,
      type: "article",
      images: [
        { url: getAssetUrl(project.mainImage) || "/images/og-image.jpg" },
      ],
    },
  };
}

// Fetch and display the project details
async function ProjectContent({ slug }) {
  const { data: project, error } = await fetchProject(slug);

  if (error || !project) {
    console.error(`Error fetching project for slug: ${slug}`, error);
    notFound();
  }

  return <ProjectDetailsPage project={project} />;
}

// Error boundary to handle rendering issues
function ErrorBoundary({ children }) {
  try {
    return children;
  } catch (error) {
    console.error("ErrorBoundary caught an error:", error);
    return <ErrorMessage />;
  }
}

// Main project details page component
export default function Project({ params }) {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <ProjectContent slug={params.slug} />
      </ErrorBoundary>
    </Suspense>
  );
}
