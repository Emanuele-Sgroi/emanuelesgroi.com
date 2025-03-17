import React from "react";

/**
 * DiscussionsHeader Component
 *
 * Displays the title, author, category, and formatted discussion number
 * at the top of the discussions page.
 *
 * Props:
 * - discussionContent: Object containing title, author's name,
 *   introductory text, and category.
 */
const DiscussionsHeader = ({ discussionContent }) => {
  //destructure content from discussion
  const { title, myName, startedConversationText, category } =
    discussionContent;
  // Generate a unique discussion number based on the current date (MMDD format)
  const date = new Date();
  const discussionNumber = `#${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}${String(date.getDate()).padStart(2, "0")}`;

  return (
    <div className="w-full max-w-[1216px] flex flex-col items-start gap-2 max-md:bg-bg-mobile-primary max-md:p-4 max-md:border-b border-accent-border">
      {/* Display discussion title with a unique number */}
      <h1 className="max-md:text-4xl max-md:font-bold">
        {title}{" "}
        <span className="text-accent-icon font-light">{discussionNumber}</span>
      </h1>
      {/* Display author's name, introductory text, and category */}
      <p className="text-sm text-accent-icon cursor-default">
        <span className="font-semibold hover:underline">{myName}</span>{" "}
        {startedConversationText}{" "}
        <span className="font-semibold hover:underline">{category}</span>
      </p>
    </div>
  );
};

export default DiscussionsHeader;
