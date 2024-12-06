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

// Define the form schema using Zod
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
});

const ContactForm = () => {
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

  return (
    <div className="main-container ">
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
          <h4 className="font-semibold max-[375px]:text-[20px]">
            Contact Form:
          </h4>
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
          Alternatively, you can reach out via any of the social media links or
          directly through my email address.
        </p>
      </div>
    </div>
  );
};

export default ContactForm;
