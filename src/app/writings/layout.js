// src/app/writings/layout.js

import React from "react";

const WritingsLayout = ({ children }) => {
  return (
    <div>
      <header className="writings-header">
        <h1>Writings</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/writings/blog">Blog</a>
            </li>
            <li>
              <a href="/writings/academic">Academic</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default WritingsLayout;
