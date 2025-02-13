"use client";

import React from "react";
import { getAssetUrl } from "@/utils/imageUtils";
import Masonry from "react-masonry-css";
import ModalImage from "react-modal-image";

// Breakpoints for Masonry Grid
const breakpointColumns = {
  default: 2, // Large screens → 2 columns
  1024: 2, // Medium screens → 2 columns
  640: 1, // Mobile screens → 1 column
};

const ProjectGallery = ({ project }) => {
  const { projectTitle, hasMixedSideImages, isMobileOnly, projectImages } =
    project;

  // If no images, show message
  if (!projectImages || projectImages.length === 0) {
    return (
      <div className="w-full center p-8">
        <p className="text-text-secondary text-center">
          No screenshots available
        </p>
      </div>
    );
  }

  return (
    <div className="w-full center md:p-8  max-md:pb-8 max-md:py-4 max-md:px-4 max-md:min-w-full max-[916px]:min-w-[546.88px]">
      {/* Check if we need Masonry Grid or Standard Grid */}
      {hasMixedSideImages ? (
        // Masonry Grid
        <Masonry
          breakpointCols={breakpointColumns}
          className="flex gap-4"
          columnClassName="masonry-column"
        >
          {projectImages?.map((image, index) => (
            <div key={index} className="mb-4">
              <ModalImage
                small={getAssetUrl(image)}
                large={getAssetUrl(image)}
                alt={`${projectTitle.replace(/\s+/g, "_")}_Screenshot_${
                  index + 1
                }_Emanuele_Sgroi`}
                hideDownload={false} // Hides the download button
                hideZoom={false} // Enables zooming
                className="w-full h-auto cursor-pointer rounded-md object-center object-cover transition-transform transform hover:scale-[1.03] duration-200"
              />
            </div>
          ))}
        </Masonry>
      ) : (
        // Standard Grid for Uniform Images
        <div
          className={`max-md:max-w-full max-md:w-full  grid grid-cols-1 ${
            isMobileOnly ? "sm:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-1"
          } gap-4`}
        >
          {projectImages.map((image, index) => (
            <div
              key={index}
              className="max-md:max-w-full max-md:w-full rounded-md max-md:flex max-md:items-center max-md:justify-center"
            >
              {/* Lightbox Image */}
              <ModalImage
                small={getAssetUrl(image)}
                large={getAssetUrl(image)}
                alt={`${projectTitle.replace(/\s+/g, "_")}_Screenshot_${
                  index + 1
                }_Emanuele_Sgroi`}
                hideDownload={false} // Hides the download button
                hideZoom={false} // Enables zooming
                className="max-md:max-w-full w-full h-auto cursor-pointer rounded-md object-center object-cover transition-transform transform md:hover:scale-[1.03] duration-200"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
