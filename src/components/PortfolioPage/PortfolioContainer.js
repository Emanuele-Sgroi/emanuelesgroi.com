"use client";

import React, { useState } from "react";
import {
  SortBar,
  ListLayout,
  GridLayout,
  AboutThisWebsite,
} from "@/components";
import { useLanguage } from "@/context/LanguageContext";
import portfolioTranslations from "@/translations/portfolio";
/**
 * PortfolioContainer Component
 *
 * Manages the display of portfolio projects with sorting and layout options.
 * - Allows switching between list and grid layouts.
 * - Filters projects based on selected tags.
 * - Displays an "About This Website" section at the bottom.
 *
 * Props:
 * - portfolio: Array of portfolio projects.
 */

const PortfolioContainer = ({ portfolio }) => {
  // translation
  const { language } = useLanguage();
  const t = portfolioTranslations[language];

  const [activeLayout, setActiveLayout] = useState("list");
  const [selectedTag, setSelectedTag] = useState("");

  return (
    <div className="main-container">
      <SortBar
        portfolio={portfolio}
        activeLayout={activeLayout}
        setActiveLayout={setActiveLayout}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        t={t}
      />
      {activeLayout === "list" ? (
        <ListLayout portfolio={portfolio} selectedTag={selectedTag} t={t} />
      ) : (
        <GridLayout portfolio={portfolio} selectedTag={selectedTag} t={t} />
      )}
      <AboutThisWebsite portfolio={portfolio} t={t} />
    </div>
  );
};

export default PortfolioContainer;
