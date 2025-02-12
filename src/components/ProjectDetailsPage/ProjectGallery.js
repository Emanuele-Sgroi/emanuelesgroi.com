"use client";

import React, { useState, useEffect, useRef } from "react";
import { getAssetUrl } from "@/utils/imageUtils";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { Link as ScrollLink } from "react-scroll";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism";
import {
  darcula,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { IoCodeDownloadSharp } from "react-icons/io5";
import Masonry from "react-masonry-css";
import ModalImage from "react-modal-image";

// Breakpoints for Masonry Grid
const breakpointColumns = {
  default: 3, // Large screens → 3 columns
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
    <div className="w-full center p-8">
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
          className={`grid grid-cols-1 ${
            isMobileOnly ? "md:grid-cols-3" : "md:grid-cols-2"
          } gap-4`}
        >
          {projectImages.map((image, index) => (
            <div key={index} className=" rounded-md">
              {/* Lightbox Image */}
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
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
