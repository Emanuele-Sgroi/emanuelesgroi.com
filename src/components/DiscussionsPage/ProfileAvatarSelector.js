"use client";

import React from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Base URL for generating avatars using DiceBear API
const DICEBEAR_BASE_URL = "https://api.dicebear.com/9.x";

// Available avatar styles
const avatarStyles = [
  { value: "adventurer", label: "Adventurer" },
  { value: "avataaars", label: "Avataaars" },
  { value: "big-ears", label: "Big Ears" },
  { value: "big-smile", label: "Big Smile" },
  { value: "croodles", label: "Croodles" },
  { value: "identicon", label: "Identicon" },
  { value: "pixel-art", label: "Pixel Art" },
  { value: "bottts", label: "Bottts" },
  { value: "micah", label: "Micah" },
  { value: "personas", label: "Personas" },
];

/**
 * ProfileAvatarSelector Component
 *
 * Allows users to input a name and select an avatar style, generating a dynamic avatar preview.
 *
 * Props:
 * - name: The user's input name.
 * - setName: Function to update the name state.
 * - avatarType: The currently selected avatar style.
 * - setAvatarType: Function to update the avatar style state.
 */
const ProfileAvatarSelector = ({
  name,
  setName,
  avatarType,
  setAvatarType,
}) => {
  const avatarUrl = name
    ? `${DICEBEAR_BASE_URL}/${avatarType}/svg?seed=${encodeURIComponent(
        name
      )}&backgroundType=solid,gradientLinear&accessoriesProbability=50&facialHairProbability=50&mask[]&maskProbability=0&skinColor=edb98a,ffdbb4&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4`
    : null; // Show placeholder if name is empty

  return (
    <div className="flex items-start gap-4 flex-col sm:flex-row">
      {/* Profile Picture */}
      <div className="flex items-center justify-center w-[70px] h-[70px] rounded-full border border-accent-border bg-bg-hover">
        {name ? (
          <div className="relative w-[70px] h-[70px] flex items-center justify-center text-base font-semibold text-accent-icon overflow-hidden rounded-full">
            <Image
              src={avatarUrl}
              alt="Dynamic Avatar"
              width={70}
              height={70}
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-[70px] h-[70px] rounded-full bg-bg-button flex items-center justify-center text-base font-semibold text-accent-icon border border-accent-border z-10">
            ?
          </div>
        )}
      </div>

      {/* Name and Avatar Type */}
      <div className="flex gap-4 w-full flex-col md:flex-row">
        {/* Input Field for Name */}
        <div className="flex-1 flex flex-col">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-text-primary"
          >
            Your Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name..."
            className="w-full p-2 border border-accent-border rounded-md text-sm text-text-primary bg-bg-primary focus:outline-none"
          />
        </div>

        {/* Dropdown for Avatar Type */}
        <div className="flex-1 flex flex-col">
          <label
            htmlFor="avatarType"
            className="block text-sm font-medium text-text-primary"
          >
            Avatar Style
          </label>
          <Select
            onValueChange={(value) => setAvatarType(value)}
            value={avatarType}
          >
            <SelectTrigger
              id="avatarType"
              className="w-full ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0 !bg-bg-primary"
            >
              <SelectValue placeholder="Select an avatar style" />
            </SelectTrigger>
            <SelectContent>
              {avatarStyles.map((style) => (
                <SelectItem key={style.value} value={style.value}>
                  {style.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ProfileAvatarSelector;
