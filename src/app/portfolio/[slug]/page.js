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

  const metadataBase = new URL(process.env.NEXT_PUBLIC_BASE_URL);

  if (error || !project) {
    return {
      metadataBase,
      title: "Project Not Found | Emanuele Sgroi",
      description: "Oops! This page doesn't exist.",
    };
  }

  const ogImage = getAssetUrl(project.mainImage) || "/images/og-image.jpg";

  return {
    metadataBase,
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
      title: project.postTitle || "Project Details | Emanuele Sgroi",
      description: project.smallDescription || "Check this project.",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}portfolio/${params.slug}`,
      type: "website",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.projectTitle || "Project Details | Emanuele Sgroi",
      description: project.smallDescription || "Check this project.",
      images: [ogImage],
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
