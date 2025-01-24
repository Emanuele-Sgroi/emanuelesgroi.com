import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const AcademicWritingsPage = () => {
  return (
    <div className="w-full max-w-full center px-4">
      <div className="writings-container">
        <div className="w-full flex justify-between items-end">
          <h1 className="font-extrabold text-7xl">Academic Writings</h1>
          <Link
            href={"/writings/blog"}
            className="text-base text-accent-extra font-semibold hover:underline center gap-2"
          >
            View Blog
            <FaArrowRight size={18} className="text-accent-extra" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AcademicWritingsPage;
