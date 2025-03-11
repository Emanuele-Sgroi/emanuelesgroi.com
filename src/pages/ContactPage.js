"use client";

import React from "react";
import ContactForm from "@/components/ContactPage/ContactForm";
import { ProfileBar, Loading, ErrorMessage } from "@/components";

const ContactPage = ({ generalInfoContent, error }) => {
  if (error) {
    return <ErrorMessage />;
  }

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
