"use client";

import React, { useState } from "react";
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

// Define the form schema using Zod
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
});

const ContactForm = ({ generalInfo }) => {
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

  // Function to handle form submission
  const onSubmit = async (values) => {
    setIsLoading(true);

    try {
      // Call the sendEmail function from utils to send the form data
      const result = await sendEmail(values);
      if (result.status === 200) {
        toast.success("Got your message. Thank you!");
        form.reset(); // Clear form fields on success
      } else {
        toast.error("Failed to send your message. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send your message. Please try again.");
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
        toast("Copied to clipboard.");
      })
      .catch((err) => {
        alert("Failed to copy. Sorry!");
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <>
      {/* Mobile view social links */}
      <div className="md:hidden main-container">
        <div className="borded-container">
          <div className="w-full flex justify-start max-md:px-4">
            <p className="w-full text-xs monospace-text">
              Emanuele-Sgroi<span className="text-accent-icon mx-[2px]">/</span>
              Contact<span className="text-accent-icon">.js</span>
            </p>
          </div>
          <div className="w-full mt-6 mb-4 border-b border-accent-border pb-1 max-md:px-4">
            <h4 className="font-semibold max-md:text-xl">Connect With Me:</h4>
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
                            placeholder="Your message"
                            {...field}
                            rows={8}
                            className="contact-input"
                          />
                        ) : (
                          <Input
                            placeholder={`Your ${field.name}`}
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
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
