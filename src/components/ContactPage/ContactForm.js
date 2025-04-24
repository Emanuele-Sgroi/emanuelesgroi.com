"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import sendEmail from "@/utils/send-email";
import { ToastContainer, toast } from "react-toastify";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io";
import { FaLinkedin, FaInstagram, FaFacebook, FaDiscord } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { useLanguage } from "@/context/LanguageContext";
import contactTranslations from "@/translations/contact";

/**
 * ContactForm Component
 *
 * This component provides a contact form and social links for reaching out.
 * It handles:
 * - Form validation using React Hook Form & Zod
 * - Sending messages via email using Email.js
 * - Copying contact details to clipboard
 * - Displaying social media links
 */

const ContactForm = ({ generalInfo }) => {
  // translation
  const { language } = useLanguage();
  const t = contactTranslations[language];

  // Define the form schema using Zod
  const formSchema = z.object({
    name: z.string().min(1, { message: t.nameRequired }),
    email: z.string().email({ message: t.emailNotVaild }),
    message: z
      .string()
      .min(1, {
        message:
          language === "it"
            ? "Il messaggio é obbligatorio"
            : "Message is required",
      }),
  });

  const [isLoading, setIsLoading] = useState(false);

  // Initialize the form with React Hook Form and Zod for validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    form.clearErrors();
  }, [language]);

  // Function to handle form submission
  const onSubmit = async (values) => {
    setIsLoading(true);

    try {
      // Call the sendEmail function from utils to send the form data
      const result = await sendEmail(values);
      if (result.status === 200) {
        toast.success(t.sentSuccess);
        form.reset(); // Clear form fields on success
      } else {
        toast.error(t.sentFail);
      }
    } catch (error) {
      toast.error(t.sentFail);
    } finally {
      setIsLoading(false);
    }
  };

  // copies text and show notification
  const copyText = (text) => {
    let copiedText = `${text}`;

    navigator.clipboard
      .writeText(copiedText)
      .then(() => {
        toast(t.copySuccess);
      })
      .catch((err) => {
        alert(t.copyFail);
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <>
      {/* Mobile view social links */}
      <div className="md:hidden main-container">
        <div className="borded-container">
          <div className="w-full  mb-4 border-b border-accent-border pb-1 max-md:px-4">
            <h4 className="font-semibold max-md:text-xl">{t.mobileTitle}</h4>
          </div>
          {/* Social Media Links */}
          <div className="w-full flex flex-col gap-4 px-4">
            {[
              {
                icon: <IoLogoGithub size={18} className="text-accent-icon" />,
                link: generalInfo?.gitHubLink,
                display: generalInfo?.gitHubDisplayName,
              },
              {
                icon: <FaLinkedin size={18} className="text-accent-icon" />,
                link: generalInfo?.linkedInLink,
                display: generalInfo?.linkedInDisplayName,
              },
              {
                icon: <FaInstagram size={18} className="text-accent-icon" />,
                link: generalInfo?.instagramLink,
                display: generalInfo?.instagramDisplayName,
              },
              {
                icon: <FaFacebook size={18} className="text-accent-icon" />,
                link: generalInfo?.facebookLink,
                display: generalInfo?.facebookDisplayName,
              },
            ].map(({ icon, link, display }, index) => (
              <div key={index} className="flex items-center gap-2">
                {icon}
                <a
                  href={link}
                  target="_blank"
                  className="text-text-primary hover:text-text-link hover:underline"
                >
                  {display}
                </a>
              </div>
            ))}
            {/* Discord (Copy to Clipboard) */}
            <div className="flex items-center gap-2">
              <FaDiscord size={18} className="text-accent-icon" />
              <p className="text-text-primary text-sm">
                {generalInfo?.discordDisplayName}
              </p>
              <button onClick={() => copyText(generalInfo?.discordDisplayName)}>
                <IoCopy size={18} className="text-text-primary" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="main-container">
        <div className="borded-container">
          <div className="w-full flex justify-start max-md:px-4 mb-6">
            <p className="w-full text-xs monospace-text">
              Emanuele-Sgroi<span className="text-accent-icon mx-[2px]">/</span>
              Contact<span className="text-accent-icon">.js</span>
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-4 max-md:px-4"
            >
              {["name", "email", "message"].map((field) => (
                <FormField
                  key={field}
                  control={form.control}
                  name={field}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {field.name.charAt(0).toUpperCase() +
                          field.name.slice(1)}
                        <span className="ml-1 text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        {field.name === "message" ? (
                          <Textarea
                            placeholder={t.yourMessage}
                            {...field}
                            rows={8}
                            className="contact-input"
                          />
                        ) : (
                          <Input
                            placeholder={
                              field.name === "name"
                                ? `${t.your} ${t.name}`
                                : field.name === "email"
                                ? `${t.your} ${t.emailAddress}`
                                : t.yourMessage
                            }
                            {...field}
                            className="contact-input"
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <div className="w-full">
                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-[124px] !bg-accent-extra !text-white font-semibold"
                >
                  {isLoading ? t.sending : t.send}
                </Button>
              </div>
            </form>
          </Form>

          <div className="w-full flex items-center justify-start mt-8 max-md:px-4">
            <p className="max-md:hidden flex items-center gap-4">
              <span>
                <FaArrowLeftLong size={18} className="text-accent-icon" />
              </span>{" "}
              {t.alternative}
            </p>
            <p className="md:hidden text-sm">
              {t.viaEmail}{" "}
              <a href={`mailto:${generalInfo?.email}`}>{generalInfo?.email}</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
