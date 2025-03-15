"use client";

import React from "react";
import ContactForm from "@/components/ContactPage/ContactForm";
import { ProfileBar, Loading, ErrorMessage } from "@/components";

/**
 * Contact Page
 * Displays the contact form and profile bar with general info.
 */
const ContactPage = ({ generalInfoContent, error }) => {
  // Show error message if data fetching fails
  if (error) {
    return <ErrorMessage />;
  }

  // Show loading state if general info is not available
  if (!generalInfoContent) {
    return <Loading />;
  }

  return (
    <section className="with-profile-bar">
      <ProfileBar generalInfo={generalInfoContent} />
      <ContactForm generalInfo={generalInfoContent} />
    </section>
  );
};

export default ContactPage;
