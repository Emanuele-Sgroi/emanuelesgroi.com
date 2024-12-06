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
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { PiChatText } from "react-icons/pi";
import { GrLocation } from "react-icons/gr";
import { TfiEmail } from "react-icons/tfi";
import { IoLogoGithub, IoMdDownload } from "react-icons/io";
import { FaLinkedin, FaInstagram, FaFacebook, FaDiscord } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { CgFileDocument } from "react-icons/cg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import "react-toastify/dist/ReactToastify.css";

// Define the form schema using Zod
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
});

const ContactForm = ({ generalInfo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showCopy, setShowCopy] = useState(false);

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
      <div className="md:hidden main-container ">
        <div className="borded-container">
          <div className="w-full flex justify-start max-md:px-4">
            <p className="w-full text-xs monospace-text">
              Emanuele-Sgroi
              <span className="text-accent-icon mx-[2px]">/</span>
              Contact
              <span className="text-accent-icon">.js</span>
            </p>
          </div>
          <div className="w-full mt-6 mb-4 border-b border-accent-border pb-1 max-md:px-4">
            <h4 className="font-semibold max-md:text-xl">Connect With Me:</h4>
          </div>
          {/* Socials */}
          <div className="w-full flex flex-col justify-start items-start gap-4 px-4">
            <div className="flex items-center gap-2">
              <IoLogoGithub size={18} className="text-accent-icon" />
              <a
                href={`${generalInfo?.gitHubLink}`}
                target="_blank"
                className="text-text-primary hover:text-text-link hover:underline"
              >
                {generalInfo?.gitHubDisplayName}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FaLinkedin size={18} className="text-accent-icon" />
              <a
                href={`${generalInfo?.linkedInLink}`}
                target="_blank"
                className="text-text-primary hover:text-text-link hover:underline"
              >
                {generalInfo?.linkedInDisplayName}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FaInstagram size={18} className="text-accent-icon" />
              <a
                href={`${generalInfo?.instagramLink}`}
                target="_blank"
                className="text-text-primary hover:text-text-link hover:underline"
              >
                {generalInfo?.instagramDisplayName}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FaFacebook size={18} className="text-accent-icon" />
              <a
                href={`${generalInfo?.facebookLink}`}
                target="_blank"
                className="text-text-primary hover:text-text-link hover:underline"
              >
                {generalInfo?.facebookDisplayName}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FaDiscord size={18} className="text-accent-icon" />
              <p className="text-text-primary text-sm">
                {generalInfo?.discordDisplayName}
              </p>
              <button
                onClick={() => copyText(generalInfo?.discordDisplayName)}
                className="md:hidden"
              >
                <IoCopy size={18} className="text-text-primary" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="main-container ">
        <div className="borded-container">
          <div className="w-full flex justify-start max-md:px-4">
            <p className="max-md:hidden w-full text-xs monospace-text">
              Emanuele-Sgroi
              <span className="text-accent-icon mx-[2px]">/</span>
              Contact
              <span className="text-accent-icon">.js</span>
            </p>
          </div>
          <div className="w-full md:mt-4 mb-4 border-b border-accent-border pb-4 md:pb-1 max-md:px-4 max-md:flex max-md:items-center max-md:gap-2">
            <h4 className="font-semibold max-md:text-xl">Contact Form:</h4>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-4 max-md:px-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>
                      Name<span className="ml-1 text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your name"
                        {...field}
                        className="focus:outline-none !border !border-accent-border !bg-bg-tertiary"
                        style={{ outline: "none", boxShadow: "none" }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>
                        Email<span className="ml-1 text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your email"
                          {...field}
                          className="focus:outline-none !border !border-accent-border !bg-bg-tertiary"
                          style={{ outline: "none", boxShadow: "none" }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Message<span className="ml-1 text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your message"
                        {...field}
                        rows={8}
                        className="focus:outline-none !border !border-accent-border !bg-bg-tertiary"
                        style={{ outline: "none", boxShadow: "none" }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
          <p className="max-md:hidden w-full text-left max-lg:flex-col flex justify-start items-start lg:items-center gap-2 mt-8 text-sm text-text-secondary">
            <FaArrowLeftLong size={20} className="text-accent-icon" />{" "}
            Alternatively, you can reach out via any of the social media links
            or directly through my email address.
          </p>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
