"use client";

import React from "react";
import ContactForm from "@/components/ContactPage/ContactForm";
import { ProfileBar, Loading, ErrorMessage } from "@/components";
import { useGeneralInfoContent } from "@/hooks/useGeneralInfoContent";

const ContactPage = () => {
  const { generalInfoContent, isGeneralInfoLoading, isGeneralInfoError } =
    useGeneralInfoContent();

  if (isGeneralInfoLoading || !generalInfoContent) {
    return <Loading />;
  }

  if (isGeneralInfoError) {
    return <ErrorMessage />;
  }

  return (
    <section className="with-profile-bar">
      <ProfileBar generalInfo={generalInfoContent} />
      <ContactForm generalInfo={generalInfoContent} />
    </section>
  );
};

export default ContactPage;
