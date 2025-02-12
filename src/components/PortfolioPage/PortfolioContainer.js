"use client";

import React, { useState } from "react";
import {
  SortBar,
  ListLayout,
  GridLayout,
  AboutThisWebsite,
} from "@/components";

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
