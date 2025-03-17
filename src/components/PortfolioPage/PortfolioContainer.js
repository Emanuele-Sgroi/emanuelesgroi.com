"use client";

import React, { useState } from "react";
import {
  SortBar,
  ListLayout,
  GridLayout,
  AboutThisWebsite,
} from "@/components";

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
      />
      {activeLayout === "list" ? (
        <ListLayout portfolio={portfolio} selectedTag={selectedTag} />
      ) : (
        <GridLayout portfolio={portfolio} selectedTag={selectedTag} />
      )}
      <AboutThisWebsite portfolio={portfolio} />
    </div>
  );
};

export default PortfolioContainer;
