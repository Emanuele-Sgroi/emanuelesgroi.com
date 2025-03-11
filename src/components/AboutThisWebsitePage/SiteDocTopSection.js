"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAssetUrl } from "@/utils/imageUtils";
import { usePathname } from "next/navigation";
import { LuClock } from "react-icons/lu";
import { FaWhatsapp, FaLinkedin, FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FiArrowLeftCircle } from "react-icons/fi";
import { IoCode } from "react-icons/io5";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToastContainer, toast } from "react-toastify";

const SiteDocTopSection = () => {
  const router = useRouter();
  return (
    <div className="relative w-full overflow-hidden p-4 lg:p-6 border-b border-accent-border">
      <div className="w-full flex flex-col items-start gap-4 z-50">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-accent-icon font-medium hover:text-text-link hover:underline"
        >
          <FiArrowLeftCircle size={16} /> Go Back
        </button>

        <h1 className="text-xl font-bold">About this website</h1>
      </div>
    </div>
  );
};

export default SiteDocTopSection;
