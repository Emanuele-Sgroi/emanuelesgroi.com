import React from "react";
import Image from "next/image";
import { images } from "@/utils/imageImport";

/**
 * AttachFileOverlay Component
 *
 * Displays an overlay when a file is being dragged over the page.
 * - Provides a visual cue to indicate file attachment is possible.
 * - Supports adding text or code files to the chat.
 *
 * Props:
 * - isDraggingFile: Boolean indicating whether a file is being dragged.
 */

const AttachFileOverlay = ({ isDraggingFile }) => {
  if (isDraggingFile) {
    return (
      <div className="h-svh w-full fixed top-0 left-0 center flex-col gap-3 bg-bg-hover opacity-85 z-[9999999]">
        <Image
          src={images.attach_files}
          alt="Attach file"
          quality={100}
          className="h-[100px] w-auto object-contain"
          priority
        />
        <h1 className="font-bold">Add this file</h1>
        <p className="text-center">Add a txt or code file to this chat</p>
      </div>
    );
  } else {
    return null;
  }
};

export default AttachFileOverlay;
