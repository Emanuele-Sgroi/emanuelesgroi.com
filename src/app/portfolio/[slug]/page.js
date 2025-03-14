import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Loading, ErrorMessage } from "@/components";
import ProjectDetailsPage from "@/pages/ProjectDetailsPage";
import { fetchProject, fetchProjectSlugs } from "@/utils/fetchCMSContent";
import { getAssetUrl } from "@/utils/imageUtils";

// Generate Static Paths
export async function generateStaticParams() {
  try {
    const { data, error } = await fetchProjectSlugs();
    if (error || !data?.length) {
      //console.error("No project slugs found:", error);
      return [];
    }
    return data.map((slug) => ({ slug }));
  } catch (error) {
    //console.error("Error generating project slugs:", error);
    return [];
  }
}

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

// Fetch project details
async function ProjectContent({ slug }) {
  const { data: project, error } = await fetchProject(slug);
  //console.log("Project data:", project); // Debugging log
  // console.log("Error:", error); // Debugging log

  if (error || !project) {
    console.error(`Error fetching project for slug: ${slug}`, error);
    notFound();
  }

  return <ProjectDetailsPage project={project} />;
}

// Error Boundary Component (to catch errors)
function ErrorBoundary({ children }) {
  try {
    return children;
  } catch (error) {
    console.error("ErrorBoundary caught an error:", error); // Debugging log
    return <ErrorMessage />;
  }
}

// Main Component
export default function Project({ params }) {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <ProjectContent slug={params.slug} />
      </ErrorBoundary>
    </Suspense>
  );
}

// import { notFound } from "next/navigation";
// import client from "@/utils/contentfulClient";
// import { Suspense } from "react";
// import { Loading, ErrorMessage } from "@/components";
// import ProjectDetailsPage from "@/pages/ProjectDetailsPage";

// export async function generateStaticParams() {
//   try {
//     const response = await client.getEntries({
//       content_type: "project",
//       select: "fields.projectSlug",
//     });

//     if (!response.items.length) {
//       console.error("No project found");
//       return [];
//     }

//     return response.items
//       .map((item) => item.fields?.projectSlug)
//       .filter(Boolean) // Remove any undefined values
//       .map((slug) => ({ slug })); // Ensure correct format
//   } catch (error) {
//     console.error("Error fetching project slugs:", error);
//     return [];
//   }
// }

// async function fetchProject(slug) {
//   try {
//     const response = await client.getEntries({
//       content_type: "project",
//       "fields.projectSlug": slug,
//       limit: 1,
//     });

//     if (!response.items.length || !response.items[0].fields) {
//       console.warn(`No project found for slug: ${slug}`);
//       return null;
//     }

//     return response.items[0].fields;
//   } catch (error) {
//     console.error("Error fetching project:", error);
//     return null;
//   }
// }

// async function ProjectContent({ slug }) {
//   const project = await fetchProject(slug);

//   if (!project) {
//     console.error(`Project not found for slug: ${slug}`);
//     return notFound();
//   }

//   return <ProjectDetailsPage project={project} />;
// }

// export default function Project({ params }) {
//   return (
//     <Suspense fallback={<Loading />}>
//       <ErrorBoundary>
//         <ProjectContent slug={params.slug} />
//       </ErrorBoundary>
//     </Suspense>
//   );
// }

// // Error Boundary Component (to catch errors)
// function ErrorBoundary({ children }) {
//   try {
//     return children;
//   } catch (error) {
//     return <ErrorMessage />;
//   }
// }
