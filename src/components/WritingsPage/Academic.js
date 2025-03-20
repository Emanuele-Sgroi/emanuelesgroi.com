"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getAssetUrl } from "@/utils/imageUtils";

/**
 * Academic Component
 *
 * Displays a list of academic papers organized by academic year.
 * Each academic year has a set of papers that include:
 * - Title, description, module, and associated image.
 * - Option to download the paper as a PDF.
 * - Marking dissertation papers with a crown emoji.
 *
 * Features:
 * - Toggle between academic years (2021-2022, 2022-2023, 2023-2024) using a year selector.
 * - For each paper, shows an image (if available), title, module, description, and a download link for the PDF.
 * - Dissertation papers are highlighted with a crown emoji.
 *
 * Props:
 * - writingsContent: Object containing academic content data.
 *    - academicTitle: The main title of the academic section.
 *    - academicDescription: A brief description of the academic section.
 *    - bewareText: A warning or notice related to the content.
 *    - academicPdf1, academicPdf2, academicPdf3: Arrays containing academic papers for each year.
 *
 * State:
 * - activeYear: The currently selected academic year, with its corresponding papers.
 *
 * Each paper:
 * - Includes a download link for the corresponding PDF.
 * - Has an image (optional) and a description.
 * - If it's a dissertation, it is marked with a crown emoji.
 */

const Academic = ({ writingsContent }) => {
  const {
    academicTitle,
    academicDescription,
    bewareText,
    academicPdf1,
    academicPdf2,
    academicPdf3,
  } = writingsContent;

  // Access the referenced academic years
  const year1Ref = academicPdf1?.map((paper) => paper.fields);
  const year2Ref = academicPdf2?.map((paper) => paper.fields);
  const year3Ref = academicPdf3?.map((paper) => paper.fields);

  const [activeYear, setActiveYear] = useState({
    ref: year3Ref,
    year: "2023-2024",
  });

  return (
    <div className="w-full center px-4 py-6 md:py-12 max-md:bg-bg-mobile-primary max-md:mt-4 max-md:border-b max-md:border-t max-md:border-accent-border">
      <div className="relative w-full max-w-[1280px]">
        <div className="flex">
          <h2 className="text-4xl md:text-7xl font-bold ">{academicTitle}</h2>
        </div>
        <div className="p-2 md:p-4 border border-accent-border bg-bg-tertiary rounded-lg mt-4 flex flex-col gap-4">
          <p className="text-sm md:text-base text-text-secondary">
            {academicDescription}
          </p>
          <p className="text-sm md:text-base text-red-600">{bewareText}</p>
        </div>

        {/* Pick year menu */}
        <div className="mb-6 mt-6">
          <div className="flex justify-between items-center flex-wrap  gap-2">
            {/* Pick year menu */}
            <div className="flex items-center max-[300px]:bg-transparent bg-bg-button rounded-md flex-wrap">
              <button
                onClick={() =>
                  setActiveYear({ ref: year1Ref, year: "2021-2022" })
                }
                className={`group/item relative center px-3 py-[5px] text-xs sm:text-sm text-text-primary rounded-md ${
                  activeYear.year === "2021-2022"
                    ? "font-bold bg-bg-secondary border border-accent-icon"
                    : ""
                }`}
              >
                2021 - 2022
                {activeYear.year === "2023-2024" && (
                  <div className="max-[300px]:hidden absolute right-[-1px] h-[18px] w-px bg-accent-icon" />
                )}
              </button>
              <button
                onClick={() =>
                  setActiveYear({ ref: year2Ref, year: "2022-2023" })
                }
                className={`center px-3 py-[5px] text-xs sm:text-sm text-text-primary rounded-md  ${
                  activeYear.year === "2022-2023"
                    ? "font-bold bg-bg-secondary border border-accent-icon"
                    : ""
                }`}
              >
                2022 - 2023
              </button>
              <button
                onClick={() =>
                  setActiveYear({ ref: year3Ref, year: "2023-2024" })
                }
                className={`relative center px-3 py-[5px] text-xs sm:text-sm rounded-md  ${
                  activeYear.year === "2023-2024"
                    ? "font-bold bg-bg-secondary border border-accent-icon"
                    : ""
                }`}
              >
                2023 - 2024
                {activeYear.year === "2021-2022" && (
                  <div className="max-[300px]:hidden  absolute left-[-1px] h-[18px] w-px bg-accent-icon" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Papers Cards */}
        <div className="w-full flex max-md:flex-col max-md:items-center flex-wrap gap-4">
          {activeYear.ref.map((paper, index) => {
            const {
              title,
              module,
              description,
              academicYear,
              isDissertation,
              pdf,
              image,
            } = paper;
            return (
              <div
                key={index}
                className="relative w-full md:w-[298.5px] rounded-md p-4 border border-accent-border bg-bg-tertiary hover:bg-bg-hover flex flex-col justify-between min-h-[320px]"
              >
                <div className="flex flex-col items-center">
                  <p
                    className={`text-xs text-accent-extra text-center ${
                      isDissertation && "max-[295px]:px-4"
                    }`}
                  >
                    {module}
                  </p>

                  {/* Image */}
                  {image && image.fields?.file?.url && (
                    <div className="relative p-2 bg-[#6b747e] dark:bg-[#f0f6fc] center rounded-xl mt-3 overflow-hidden">
                      <Image
                        src={getAssetUrl(image)}
                        alt={title}
                        width={40}
                        height={40}
                        quality={100}
                        priority
                        className="object-cover object-center w-[33px] h-[33px]"
                      />
                    </div>
                  )}

                  <h4 className="text-lg font-semibold mt-3 text-center">
                    {title}
                  </h4>
                </div>

                {/* Description (flex-grow ensures it expands while keeping the button at the bottom) */}
                <div className="flex-grow">
                  <p className="text-xs text-text-secondary mt-2 text-center">
                    {description}
                  </p>
                </div>

                {/* Download Button at the Bottom */}
                <a
                  href={getAssetUrl(pdf)}
                  target="_blank"
                  download={`CS_${academicYear}_${module}_${title}_by_Emanuele_Sgroi`}
                  className="btn-primary mt-6 center text-center"
                >
                  📂 Download PDF
                </a>

                {isDissertation && (
                  <div className="absolute top-1 right-2 center text-xl">
                    👑
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Academic;
