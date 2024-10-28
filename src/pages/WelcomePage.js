"use client";

import React from "react";
import { useGeneralInfoContent } from "@/hooks/useGeneralInfoContent";
import { useWelcomeContent } from "@/hooks/useWelcomeContent";

const WelcomePage = () => {
  const { welcomeContent, isWelcomeLoading, isWelcomeError } =
    useWelcomeContent();

  return (
    <section>
      <p>
        {welcomeContent &&
          welcomeContent.readmeTitle &&
          welcomeContent.readmeTitle}
      </p>{" "}
    </section>
  );
};

export default WelcomePage;
