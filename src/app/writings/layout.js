// src/app/writings/layout.js

import React from "react";
import Link from "next/link";

const WritingsLayout = ({ children }) => {
  return (
    <div>
      <header className="writings-header">
        <h1>Writings</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/writings/blog">Blog</Link>
            </li>
            <li>
              <Link href="/writings/academic">Academic</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default WritingsLayout;
