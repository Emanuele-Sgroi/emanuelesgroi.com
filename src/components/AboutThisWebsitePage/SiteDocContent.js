"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { TbBrandNextjs } from "react-icons/tb";
import { IoLogoCss3, IoCode } from "react-icons/io5";
import {
  SiTailwindcss,
  SiPrisma,
  SiSupabase,
  SiContentful,
  SiShadcnui,
  SiVercel,
} from "react-icons/si";
import { AiOutlineOpenAI } from "react-icons/ai";
import { IoLogoGithub } from "react-icons/io";

const altBaseString = "Emanuele Sgroi - About this website -";

const SiteDocContent = () => {
  return (
    <div className="flex-1 flex flex-col items-start justify-start p-6 lg:p-8">
      <div
        id="top"
        className="w-full flex items-start md:items-center justify-between flex-wrap gap-4 border-b border-accent-border pb-4 mb-8"
      >
        {/* Title */}
        <div className="center flex-wrap ">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            About this website
          </h1>
        </div>
        <Link
          href="https://github.com/Emanuele-Sgroi/emanuelesgroi.com"
          target="blank"
          rel="noopener noreferrer"
          className="btn-primary !bg-[#238636] max-sm:!text-sm center gap-2"
        >
          <IoCode size={18} />
          Source Code
        </Link>
      </div>
      <Introduction />
      <DesignAndUI />
      <TechStack />
      <Features />
      <DeploymentAndFuturePlans />
      <ThankYou />
      <DocFooter />
    </div>
  );
};

export default SiteDocContent;

const Introduction = () => {
  return (
    <div className="flex flex-col gap-6 border-b border-accent-border pb-8">
      <p className="monospace-text font-normal text-sm text-text-secondary">
        1. Introduction
      </p>
      <div id="why-built">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          Why I Built This
        </h2>
        <p className="mt-4">
          I had a portfolio before, one of my first React projects. It was cool,
          with a built-in bot pretending to be me, but over time, I felt it was
          too generic. It looked like every other portfolio out there, and
          that&apos;s not who I am. I like to do things differently, to create
          something unusual.{" "}
          <b>
            Isn&apos;t that already part of what makes a portfolio interesting?
          </b>
        </p>
        <p className="mt-3">
          I started looking for inspiration, browsing portfolios across
          different fields: software engineers, UI/UX designers, photographers,
          graphic artists. Many were visually stunning, but none felt like the
          kind of portfolio I wanted. They inspired me not in design, but in
          concept. I wanted my portfolio to feel like a real project, not just a
          showcase. A portfolio where people could interact, not just browse.
        </p>
        <p className="my-6">
          💡 Then, it hit me. <b>GitHub</b>
        </p>
        <p>
          I love GitHub&apos;s minimalist yet effective design. It&apos;s built
          for developers, and let&apos;s be real:{" "}
          <b>what developer hasn&apos;t used GitHub at least once?</b>{" "}
          That&apos;s when I knew: I wanted my portfolio to feel like a GitHub
          clone. Not just in aesthetics, but in functionality:{" "}
          <b>interactive, intuitive, and dev-friendly</b>.
        </p>
        <h3 className="my-4 text-2xl font-bold">Key reasons I built this</h3>
        <ul className="flex flex-col !list-disc pl-6">
          <li>
            <b>Showcase my work and writing:</b> A portfolio&apos;s core
            purpose. But beyond projects, I&apos;ve always wanted a personal
            blog to share thoughts and ideas.
          </li>
          <li>
            <b>
              Create something dev-friendly {"("}and beyond{")"}:
            </b>{" "}
            Inspired by GitHub, but designed so that anyone can navigate it
            easily.
          </li>
          <li>
            <b>Make it interactive:</b> I didn&apos;t want visitors to just look
            at my site; I wanted them to use it. Features like ManuPilot,
            Discussion, and Dev Quiz make it engaging and unique, making this
            portfolio feel like a proper GitHub-like project {"("}or at least in
            part{")"}.
          </li>
          <li>
            <b>Improve my own skills:</b> This project pushed me to learn new
            things, solve challenges, and refine my development workflow.
          </li>
        </ul>
      </div>
      <div id="technologies-used">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          Technologies I Used
        </h2>
        <p className="mt-4">
          To bring this project to life, I used a combination of modern web
          technologies, libraries, and tools. Here&apos;s what I used to build
          it.
        </p>
        <p className="mt-3">
          Don&apos;t worry, I&apos;ll go into more detail about each one in the
          next sections.
        </p>

        <ul className="flex items-center justify-start flex-wrap gap-2 my-6">
          <li className="max-md:text-sm w-fit center px-3 py-[6px] gap-1 bg-black text-white rounded-md font-medium">
            <TbBrandNextjs size={20} className="text-white" /> Next.js
          </li>
          <li className="max-md:text-sm  w-fit center px-3 py-[6px] gap-1 bg-[#1572B6] text-white rounded-md font-medium">
            <IoLogoCss3 size={20} className="text-white" /> CSS
          </li>
          <li className="max-md:text-sm  w-fit center px-3 py-[6px] gap-1 bg-[#06B6D4] text-white rounded-md font-medium">
            <SiTailwindcss size={20} className="text-white" /> Tailwind CSS
          </li>
          <li className="max-md:text-sm w-fit center px-3 py-[6px] gap-1 bg-[#2D3748] text-white rounded-md font-medium">
            <SiPrisma size={20} className="text-white" /> Prisma
          </li>
          <li className="max-md:text-sm w-fit center px-3 py-[6px] gap-1 bg-[#3ECF8E] text-white rounded-md font-medium">
            <SiSupabase size={20} className="text-white" /> Supabase
          </li>
          <li className="max-md:text-sm w-fit center px-3 py-[6px] gap-1 bg-[#10A37F] text-white rounded-md font-medium">
            <AiOutlineOpenAI size={20} className="text-white" /> OpenAI
          </li>
          <li className="max-md:text-sm w-fit center px-3 py-[6px] gap-1 bg-[#2478CC] text-white rounded-md font-medium">
            <SiContentful size={20} className="text-white" /> Contentful CMS
          </li>
          <li className="max-md:text-sm w-fit center px-3 py-[6px] gap-1 bg-[#2a2a33] text-white rounded-md font-medium">
            <SiShadcnui size={20} className="text-white" /> ShadCN
          </li>
          <li className="max-md:text-sm w-fit center px-3 py-[6px] gap-1 bg-[#010409] text-white rounded-md font-medium">
            <IoLogoGithub size={20} className="text-white" /> GitHub
          </li>
          <li className="max-md:text-sm w-fit center px-3 py-[6px] gap-1 bg-[#000000] text-white rounded-md font-medium">
            <SiVercel size={20} className="text-white" /> Vercel
          </li>
        </ul>
        <p className="p-4 rounded-md bg-bg-button text-text-secondary">
          You can grab the source code above. But here&apos;s the deal: this
          project is still a work in progress. Some sections are
          well-structured, others need refinement. I built it fast, fixed bugs
          on the fly, and balanced it with other commitments. Whenever I get
          time, I&apos;ll keep improving and optimizing the code.
        </p>
      </div>
    </div>
  );
};

const DesignAndUI = () => {
  const colorsDark = [
    { name: "BG Primary", hex: "#0d1117" },
    { name: "BG Secondary", hex: "#010409" },
    { name: "BG Tertiary", hex: "#151b23" },
    { name: "BG Quartiary", hex: "#15191f" },
    { name: "BG Button", hex: "#212830" },
    { name: "BG Hover", hex: "#15191f" },
    { name: "BG Hover 2", hex: "#262c36" },
    { name: "BG Extra", hex: "#57606a" },
  ];

  const colorsLight = [
    { name: "BG Primary", hex: "#ffffff" },
    { name: "BG Secondary", hex: "#fffeff" },
    { name: "BG Tertiary", hex: "#f6f8fa" },
    { name: "BG Quartiary", hex: "#dee1e5" },
    { name: "BG Button", hex: "#f6f8fa" },
    { name: "BG Hover", hex: "#eaedf0" },
    { name: "BG Hover 2", hex: "#eff2f5" },
    { name: "BG Extra", hex: "#d1d5da80" },
  ];

  return (
    <div className="flex flex-col gap-6 border-b border-accent-border py-8">
      <p className="monospace-text font-normal text-sm text-text-secondary">
        2. Design & UI
      </p>
      <div id="github-style">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          GitHub-Style Inspirations
        </h2>
        <p className="mt-4">
          As mentioned in the introduction, I wanted my portfolio to{" "}
          <b>look and feel like GitHub</b>, from the <b>layout</b> to the{" "}
          <b>colours</b>, <b>fonts</b>, and overall <b>structure</b>. Some might
          disagree, but I personally love{" "}
          <b>GitHub&apos;s minimalistic design</b>. Plus, using GitHub as a
          design inspiration makes sense for a portfolio aimed at{" "}
          <b>developers</b>, who {"("}hopefully{")"} might find it a cool idea.
        </p>

        <p className="mt-3">
          While the <b>layout</b> is <b>heavily inspired by GitHub</b>, I still
          made my own modifications where needed. My site doesn&apos;t have all
          the features that the real GitHub does, but I{" "}
          <b>replicated as many UI elements as possible</b> {"("}buttons, links,
          tags, and so on{")"} to maintain a <b>familiar experience</b>.
        </p>

        <p className="my-6">
          Here&apos;s how different sections of my portfolio map to GitHub:
        </p>

        <ul className="flex flex-col !list-disc pl-6">
          <li>
            <b>Welcome Page</b> → Mirrors a <b>GitHub profile page</b>.
          </li>
          <li>
            <b>Portfolio Page</b> → Inspired by the <b>repositories page</b>,
            but I added my own touch, like the option to switch between{" "}
            <b>list view</b> (GitHub-style) and <b>grid view</b>.
          </li>
          <li>
            <b>Project Details Page</b> → Partially inspired by a{" "}
            <b>GitHub repository page</b>, but with changes, like{" "}
            <b>no file navigation</b> and a different way of{" "}
            <b>displaying images</b>.
          </li>
          <li>
            <b>Writings Page</b> → A mix between <b>GitHub Blog</b> and{" "}
            <b>GitHub Marketplace</b>.
          </li>
          <li>
            <b>Blog Posts</b> → Mimic the <b>GitHub Blog post layout</b>.
          </li>
          <li>
            <b>Dev Quiz</b> → A unique feature <b>not found on GitHub</b>, but
            designed in a way that follows <b>GitHub&apos;s UI style</b>.
          </li>
          <li>
            <b>Discussions</b> → Closely resembles a{" "}
            <b>GitHub Discussion thread</b>.
          </li>
          <li>
            <b>Contact Page</b> → Doesn&apos;t copy a specific GitHub page but
            follows a <b>similar layout to a profile page</b>.
          </li>
          <li>
            <b>ManuPilot</b> → Both the <b>ManuPilot page</b> and{" "}
            <b>quick chat interface</b> are heavily inspired by{" "}
            <b>GitHub Copilot</b>, making it feel like a natural extension of
            the GitHub ecosystem.
          </li>
          <li>
            <b>Navigation Menu, Profile Bar, and Other UI Elements</b> → All{" "}
            <b>mimic GitHub&apos;s UI</b>, keeping the design consistent.
          </li>
        </ul>
      </div>
      <div id="extracting-ui">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          Extracting GitHub&apos;s UI Elements
        </h2>
        <p className="mt-4">
          To make this portfolio feel like <b>GitHub</b>, I didn&apos;t just
          eyeball the design, instead I went straight to the source. Using the
          browser&apos;s <b>Inspect Element</b> tool, I extracted key UI details
          I was looking for.
        </p>
        <Image
          src="/docImages/extracting-ui.png"
          alt={`${altBaseString} Extracting GitHub UI`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800} // Set a width
          height={500} // Keep aspect ratio
          quality={100} // Force high quality
          priority // Ensures it loads fast
        />
        <p className="mt-3">
          This allowed me to get the same UI elements such as{" "}
          <b>spacing, font sizes, colors, padding, border-radius</b>, and more.
          GitHub&apos;s color palette follows a very simple and, as I&apos;ve
          already mentioned, minimalistic pattern.
        </p>
        <p className="mt-6 mb-2 text-sm text-text-secondary">
          Example background colours - Dark mode
        </p>
        <div className="w-fit flex flex-wrap border border-accent-border">
          {colorsDark.map((color) => (
            <div
              key={color.hex}
              className="w-16 h-16 center p-1"
              style={{ backgroundColor: color.hex }}
            >
              <p className="text-xs text-text-secondary mt-1">{color.hex}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 mb-2 text-sm text-text-secondary">
          Example background colours - Light mode
        </p>
        <div className="w-fit flex flex-wrap border border-accent-border">
          {colorsLight.map((color) => (
            <div
              key={color.hex}
              className="w-16 h-16 center p-1"
              style={{ backgroundColor: color.hex }}
            >
              <p className="text-xs text-text-secondary mt-1">{color.hex}</p>
            </div>
          ))}
        </div>
      </div>

      <div id="dark-mode">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          Dark Mode
        </h2>
        <p className="mt-3">
          Unlike GitHub, which offers multiple light and dark themes, I decided
          to <b>keep it simple</b> with just{" "}
          <b>one light theme and one dark theme</b>. The goal was to stay true
          to GitHub&apos;s aesthetic while ensuring an easy-to-maintain color
          system.
        </p>
        <ul className="flex flex-col !list-disc pl-6 mt-4">
          <li>
            The theme switches <b>automatically based on system preferences</b>,
            but users can toggle it manually if they prefer.
          </li>
          <li>
            To stay as close as possible to GitHub&apos's look, I{" "}
            <b>extracted the colors directly using the browser inspector</b>
            (as shown in the previous section).
          </li>
          <li>
            I paid extra attention to <b>contrast and readability</b>, making
            sure that text, buttons, and borders remain clear and accessible in
            both themes.
          </li>
        </ul>
      </div>

      <div id="Responsiveness">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          Responsiveness
        </h2>
        <p className="mt-4">
          This website is <b>fully responsive</b> across multiple devices.
          However, to enhance the mobile experience, I made the design{" "}
          <b>closer to GitHub&apos;s mobile app</b> when viewed on smaller
          screens. This was a deliberate choice because, well... I think it
          looks cool.
        </p>
        <p className="mt-3">
          Of course, elements <b>resize dynamically</b> as the screen gets
          smaller, ensuring a smooth and consistent experience. Aside from the
          color adjustments that resemble GitHub&apos;s mobile app, the{" "}
          <b>responsiveness follows the same principles as GitHub itself</b>.
        </p>
        <p className="mt-3">
          I personally believe that{" "}
          <b>responsiveness is crucial in web development</b>, and I made sure
          this portfolio adapts well across all devices.
        </p>
      </div>
    </div>
  );
};

const TechStack = () => {
  return (
    <div className="flex flex-col gap-6 border-b border-accent-border py-8">
      <p className="monospace-text font-normal text-sm text-text-secondary">
        3. Tech Stack
      </p>
      <div id="nextjs">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Next.js</h2>
        <p className="mt-4">
          I chose <b>Next.js</b> with the <b>App Router</b> because it offers
          the best mix of <b>simplicity, performance, and flexibility</b>. One
          of its biggest advantages is <b>SEO benefits</b>, who knows, maybe
          someone will stumble upon my portfolio through search engines. But
          beyond that, I picked Next.js mainly because of its{" "}
          <b>
            Server-Side Rendering (SSR) and Client-Side Rendering (CSR)
            capabilities
          </b>
          , which help make the website load faster and more efficiently.
        </p>

        <p className="mt-3">
          Another major reason is <b>API Routes</b>. With Next.js, I don&apos;t
          need a separate backend framework like Express.js. Everything can be
          done <b>directly within Next.js API routes</b>, all in JavaScript.
        </p>

        <p className="mt-3">
          Also, I just{" "}
          <b>love how the App Router structures folders and files</b>. It keeps
          things organized and makes development much smoother.
        </p>

        <h3 className="my-4 text-2xl font-bold">
          How I Use Next.js Features in This Portfolio
        </h3>

        <ul className="flex flex-col !list-disc pl-6">
          <li>
            <b>Server-Side Fetching for Performance</b> → I fetch data on the{" "}
            <b>server-side</b> for things like retrieving content from the{" "}
            <b>CMS (Contentful)</b> or handling <b>OpenAI API</b> requests for
            ManuPilot AI. This approach helps reduce client-side workload and
            ensures <b>faster load times</b>.{" "}
            <Link
              href="https://github.com/Emanuele-Sgroi/emanuelesgroi.com/blob/main/src/hooks/useGeneralInfoContent.js"
              target="_blank"
              className="text-text-link underline"
            >
              see example
            </Link>
            .
          </li>

          <li className="mt-2">
            <b>Next.js Image Optimization</b> → I always use{" "}
            <b>
              Next.js <code>&lt;Image /&gt;</code> component
            </b>{" "}
            instead of the regular <code>&lt;img /&gt;</code> tag. It
            automatically optimizes images by{" "}
            <b>resizing, compressing, and serving them in modern formats</b> for
            better performance.
          </li>
        </ul>

        <p className="mt-3">
          My website relies primarily on <b>Server-Side Rendering (SSR)</b> and
          <b>Client-Side Rendering (CSR)</b>. While I initially considered using
          <b>Static Site Generation (SSG)</b>, I realized that most of my
          content is dynamic—pulling data from <b>Contentful CMS</b>,{" "}
          <b>Supabase</b>, and <b>OpenAI&apos;s API</b>. Because of this, I
          opted for SSR to ensure that visitors always see the latest data
          without requiring manual re-builds.
        </p>

        <p className="mt-3">
          The downside of this approach is that it can make the site slightly
          slower compared to a fully static approach. I&apos;ll admit, this
          might not have been the most optimal choice due to my limited
          experience with Next.js at the time. It&apos;s something I plan to
          improve. In the future, I might implement{" "}
          <b>Incremental Static Regeneration (ISR)</b> to strike a better
          balance between performance and up-to-date content. (see example)
        </p>
      </div>

      <div id="tailwind">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          Tailwind CSS & Plain CSS
        </h2>

        <p className="mt-4">
          I chose <b>Tailwind CSS</b> because it&apos;s an incredibly efficient
          and flexible utility-first framework. It allows me to write{" "}
          <b>less</b> CSS and keeps my styling <b>directly in the components</b>
          , which means fewer files to manage. The built-in classes make it easy
          to maintain consistency across the website while speeding up
          development.
        </p>

        <p className="monospace-text bg-[#212830] text-white w-fit p-2 rounded-md mt-4">
          <span className="!text-[#FFA73A]">{"<div"}</span> id=
          <span className="!text-[#6A8759]">{'"example"'}</span> className=
          <span className="!text-[#6A8759]">
            {'"w-full h-screen absolute top-0 left-0"'}
          </span>
          <span className="!text-[#FFA73A]">{" />"}</span>
        </p>

        <p className="mt-3">
          However, I didn&apos;t rely solely on Tailwind. I also used{" "}
          <b>plain CSS</b> for global styles, which I handled in{" "}
          <b>globals.css</b>. This was mainly for things like{" "}
          <b>
            custom utility classes, animations, and overriding default styles
          </b>{" "}
          where needed.
        </p>

        <p className="mt-3">
          I did face some <b>visual challenges</b>, and I&apos;ll be honest,
          there are probably some sections where I could have done things
          better. In a few cases, I ran into layout issues, and to save time, I
          ended up <b>fixing them with a lot of media queries</b> in{" "}
          <b>globals.css</b>. While this worked, it also
          <b>increased the file size significantly</b>, which is something I
          plan to investigate and optimize in the future.
        </p>

        <Image
          src="/docImages/example-bad-css.png"
          alt={`${altBaseString} CSS Workaround for Visual Bug`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-3">
          That said, my priority was to{" "}
          <b>fix the bugs and make sure everything worked</b>, even if some
          solutions weren&apos;t the most elegant. Continuous improvement is
          part of the journey, and I&apos;ll be refining this over time. 🚀
        </p>
      </div>

      <div id="contentful">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          Contentful as a CMS
        </h2>

        <p className="mt-4">
          The <b>CMS</b> plays an important role in this project, allowing me to
          manage content without having to modify the code every time. Honestly,
          that&apos;s the main reason I chose to use a CMS for this portfolio:
          to keep things <b>flexible and easy to update</b>.
        </p>

        <p className="mt-3">
          But why <b>Contentful</b>? Simply because it&apos;s{" "}
          <b>fast and easy</b> to use! Setting up content types is incredibly
          intuitive, and the implementation process is straightforward. Within
          minutes, you can structure your data exactly how you need it.
        </p>

        <Image
          src="/docImages/contentful.png"
          alt={`${altBaseString} Contentful CMS`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-3">
          The way I structured content types in Contentful follows my{" "}
          <b>design pattern</b>. I used <b>custom hooks</b> to fetch the data
          and integrate it into my components wherever needed.
        </p>

        <Link
          href="https://github.com/Emanuele-Sgroi/emanuelesgroi.com/blob/main/src/hooks/useWritingsContent.js"
          target="_blank"
          className="mt-3 text-text-link underline"
        >
          See example
        </Link>

        <p className="mt-3">
          While I didn&apos;t use Contentful <b>for everything</b> in this
          project, most of the content that <b>changes frequently</b> comes from
          the CMS. This keeps the site dynamic while reducing the need for
          manual updates in the codebase.
        </p>
      </div>

      <div id="prisma">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          Prisma & Supabase
        </h2>

        <p className="mt-4">
          <b>Prisma</b> and <b>Supabase</b> were used exclusively for the{" "}
          <b>Discussion</b> feature of my portfolio. At the time, I was studying
          these technologies and wanted to gain hands-on experience by
          implementing them in a real project. Since I had never used Prisma and
          Supabase before, this was a great opportunity to experiment.
        </p>

        <Image
          src="/docImages/prisma.png"
          alt={`${altBaseString} Prisma & Supabase Integration`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-3">
          Looking back, I might not have chosen Supabase for such a small
          feature, but it was a valuable learning experience. If I expand the
          project in the future, I already have the foundation for handling{" "}
          <b>database-driven</b> interactions.
        </p>
      </div>

      <div id="ai-integration">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          AI Integration
        </h2>

        <p className="mt-4">
          One of the standout features of this portfolio is <b>ManuPilot</b>, an
          AI-powered assistant designed to function like <b>GitHub Copilot</b>.
          I integrated OpenAI&apos;s API to create a chatbot that can answer
          questions, assist with coding, and interact dynamically with users.
          This was a challenging but exciting implementation, as it required
          handling <b>streaming responses</b>, <b>API rate limits</b>, and{" "}
          <b>token management</b>.
        </p>

        <p className="mt-3">
          The AI works by sending user messages to a{" "}
          <b>server-side API route</b> that interacts with OpenAI&apos;s{" "}
          <b>GPT-4</b> model. The API processes each request and returns a
          response, which is streamed in real time to create a smooth user
          experience. To prevent exceeding OpenAI&apos;s token limit, I
          implemented a summarization feature that condenses conversations when
          they get too long.
        </p>

        <p className="mt-3">
          The main challenge was <b>efficiently handling real-time responses</b>
          . Instead of waiting for the entire response to generate before
          displaying it, I used <b>streaming</b>, which allows text to appear
          word by word, just like ChatGPT&apos;s interface. This makes the
          experience feel much more natural and responsive.
        </p>

        <div className="mt-4 flex flex-col gap-2">
          <Link
            href="https://github.com/Emanuele-Sgroi/emanuelesgroi.com/blob/main/src/app/api/manupilot/route.js"
            target="_blank"
            className="text-text-link underline"
          >
            See example - Back end
          </Link>

          <Link
            href="https://github.com/Emanuele-Sgroi/emanuelesgroi.com/blob/main/src/pages/ManuPilotPage.js"
            target="_blank"
            className="text-text-link underline"
          >
            See example - Front end
          </Link>
        </div>
      </div>

      <div id="ui-frameworks">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          UI Frameworks
        </h2>

        <p className="mt-4">
          To keep the UI consistent with GitHub&apos;s design, I used{" "}
          <b>ShadCN</b> and <b>React Icons</b> extensively throughout the
          project. These two libraries closely align with GitHub&apos;s
          aesthetic, making them the perfect choice for this portfolio.
        </p>

        <Image
          src="/docImages/shadcn.png"
          alt={`${altBaseString} ShadCN example`}
          className="mt-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <div className="flex flex-col gap-6 border-b border-accent-border py-8">
      <p className="monospace-text font-normal text-sm text-text-secondary">
        4. Features Breakdown
      </p>
      <div id="welcome-page">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Welcome</h2>
        <p className="mt-4">
          The <b>Welcome Page</b> serves as the homepage of this website and, as
          mentioned before, it is heavily inspired by the design of
          GitHub&apos;s profile page. It is divided into four key sections: the{" "}
          <b>Profile Bar</b>, <b>README</b>, <b>Pinned Tabs</b>, and the{" "}
          <b>Contribution Chart</b>. The <b>Profile Bar</b> is also present on
          other pages, keeping the layout consistent.
        </p>

        <h3 className="my-4 text-2xl font-bold">Profile Bar</h3>
        <p className="mt-2">
          The <b>Profile Bar</b> closely aligns with GitHub&apos;s, minus
          features like followers and following counts. It includes my{" "}
          <b>photo, name, profession, a short about me, and social links</b>,
          providing a quick overview of who I am.
        </p>
        <Image
          src="/docImages/profile.png"
          alt={`${altBaseString} Profile Bar`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <h3 className="my-4 text-2xl font-bold">README</h3>
        <p className="mt-2">
          The <b>README</b> acts as an <b>About Me</b> section, which is common
          in portfolios. It introduces me, my background, and showcases my
          skills. Just like how GitHub profiles often include a README for
          self-introduction.
        </p>
        <Image
          src="/docImages/readme.png"
          alt={`${altBaseString} README`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <h3 className="my-4 text-2xl font-bold">Pinned Tabs</h3>
        <p className="mt-2">
          The <b>Pinned Tabs</b> provide quick access to projects and other
          important sections. This feature is directly inspired by GitHub, where
          many profiles have pinned repositories for easy access to highlighted
          work.
        </p>
        <Image
          src="/docImages/pinned.png"
          alt={`${altBaseString} Pinned Tabs`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <h3 className="my-4 text-2xl font-bold">Contribution Chart</h3>
        <p className="mt-2">
          What GitHub profile doesn&apos;t have a <b>Contribution Chart</b>? I
          think this is one of the coolest parts of the Welcome Page. However,
          unlike GitHub&apos;s, my contribution chart isn&apos;t based on actual
          commits. Instead, it&apos;s an <b>interactive feature</b> where users
          can write something, which is then mapped into the grid.
        </p>
        <Image
          src="/docImages/chart.png"
          alt={`${altBaseString} Contribution Chart`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-2">
          Users can also <b>change the style</b>, and one of the styles (which I
          personally find really cool) replaces the blocks with <b>emojis</b>{" "}
          instead.
        </p>
        <Image
          src="/docImages/chartemoji.png"
          alt={`${altBaseString} Contribution Chart Emoji`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-2">
          Creating this feature required a bit of <b>manual work</b>, as I had
          to map each letter in JavaScript to display the correct placement on
          the chart.
        </p>

        <Link
          href="https://github.com/Emanuele-Sgroi/emanuelesgroi.com/blob/main/src/utils/characterMapLarge.js"
          target="_blank"
          className="mt-3 text-text-link underline"
        >
          See example
        </Link>
      </div>

      <div id="portfolio">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          Portfolio
        </h2>
        <p className="mt-4">
          The <b>Portfolio Page</b> is inspired by GitHub&apos;s repositories
          page. This is where I showcase my projects. While the design closely
          resembles GitHub&apos;s, there are <b>clear differences</b>, as I
          couldn&apos;t fully replicate it due to the lack of certain features
          that GitHub has. For example, the <b>buttons and filtering</b> at the
          top are placed differently, and their functionality has been adapted
          for a portfolio setting.
        </p>

        <Image
          src="/docImages/portfolio.png"
          alt={`${altBaseString} Profile Bar`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-3">
          Users can <b>switch between views</b>, going from the classic
          GitHub-style repository <b>list view</b> to a <b>grid view</b>. This
          is something I intentionally redesigned. While it still maintains the
          GitHub aesthetic, it doesn&apos;t fully copy the repositories page,
          offering a more visual way to browse projects.
        </p>

        <Image
          src="/docImages/portfoliogrid.png"
          alt={`${altBaseString} Profile Bar`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <h3 className="my-4 text-2xl font-bold">Project Details</h3>
        <p className="mt-2">
          When opening a project, the layout mimics how GitHub displays
          repositories, with <b>some modifications</b>. For instance, I
          didn&apos;t implement file/folder navigation like GitHub does, as I
          felt it was unnecessary for a portfolio. However, I still included a{" "}
          <b>README section</b> and a <b>sidebar</b> that displays project
          information, such as the technologies and languages used, just like on
          GitHub.
        </p>
        <Image
          src="/docImages/project.png"
          alt={`${altBaseString} README`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-3">
          Another difference is how I handle <b>project screenshots</b>. Instead
          of embedding images within the README itself, I created a{" "}
          <b>dedicated tab</b> for project images, keeping them separate from
          the main content.
        </p>
        <Image
          src="/docImages/gallery.png"
          alt={`${altBaseString} Pinned Tabs`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />
      </div>

      <div id="writings">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Writings</h2>
        <p className="mt-4">
          The <b>Writings Page</b> is where I share my technical content, and it
          is divided into two sections:
          <b>Blog</b> and <b>Academic Writings</b>.
        </p>
        <p className="mt-3">
          The <b>Blog</b> is where I write about development and computer
          science topics. I enjoy sharing insights, technical deep dives, and
          best practices.
        </p>

        <Image
          src="/docImages/blog.png"
          alt={`${altBaseString} Blog`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-3">
          The <b>Academic Writings</b> section contains my university papers
          from <b>2021 to 2024</b>. These papers were a significant part of my
          academic journey, and since many people asked for them, I made them
          available for download.
        </p>

        <Image
          src="/docImages/academic.png"
          alt={`${altBaseString} Academic`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <h3 className="my-4 text-2xl font-bold">Blog Post</h3>

        <p className="mt-3">
          The individual <b>Blog Post</b> pages are heavily inspired by{" "}
          <b>GitHub Blog Posts</b>, featuring a clean and minimal layout with
          metadata like publish date, tags, and reading time.
        </p>

        <Image
          src="/docImages/blogpost.png"
          alt={`${altBaseString} Blog Post`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />
      </div>

      <div id="dev-quiz">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Dev-Quiz</h2>
        <p className="mt-4">
          The <b>Dev Quiz</b> is a cool interactive feature of this website,
          created with the goal of practicing for technical interviews.
          Personally, I find quizzes and flashcard-style games extremely useful
          for remembering difficult topics, so I built this hoping others would
          benefit from it as well.
        </p>

        <p className="mt-3">
          The quiz covers multiple topics, allowing users to choose which
          category they want to be tested on.
        </p>

        <Image
          src="/docImages/topics.png"
          alt={`${altBaseString} Quiz Topic`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-3">
          Users can also select the number of questions, with each one being
          randomly selected from the available pool.
        </p>

        <Image
          src="/docImages/questions.png"
          alt={`${altBaseString} Quiz Questions Number`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-3">
          The quiz works like any other multiple-choice test: it provides
          immediate feedback on whether the selected answer is correct or
          incorrect, along with an explanation.
        </p>

        <Image
          src="/docImages/quiz.png"
          alt={`${altBaseString} Dev Quiz`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-3">
          At the end of the quiz, users receive their results, showing their
          score and the time taken to complete the quiz. The score is
          color-coded: <b>red</b> for low scores, <b>yellow</b> for medium
          scores, and <b>green</b> for high scores.
        </p>

        <Image
          src="/docImages/result.png"
          alt={`${altBaseString} Quiz Result`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-3">
          Unlike other features, the quiz data is not managed via the CMS.
          Instead, all questions are stored in JavaScript objects inside an
          array, grouped in a utility file for easy updates. This makes it much
          simpler to modify and expand over time.
        </p>

        <Link
          href="https://github.com/Emanuele-Sgroi/emanuelesgroi.com/blob/main/src/utils/devQuizQuestions.js"
          target="_blank"
          className="mt-3 text-text-link underline"
        >
          See example
        </Link>
      </div>

      <div id="discussion">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          Discussions
        </h2>

        <p className="mt-4">
          The <b>Discussions</b> page is designed to mimic{" "}
          <b>GitHub Discussions</b>, which I believe is one of the coolest
          features of GitHub. The main purpose of this page is to let users
          leave comments if they want to. Whether it&apos;s something like
          <i>"Hey, cool portfolio!"</i> or{" "}
          <i>"Maybe you should quit development..."</i> (who knows?).
        </p>

        <p className="mt-3">
          But beyond just leaving comments, this page offers other interactive
          features! Users can <b>reply</b> to other comments and even{" "}
          <b>react</b> with a like or emojis. Just like on GitHub!
        </p>

        <p className="mt-3">
          One of the details to consider is the <b>input field</b>, which looks
          and functions almost identically to GitHub&apos;s, including{" "}
          <b>Markdown support</b>. However, I added a small twist: the
          user&apos;s <b>profile picture</b> is <b>randomly generated</b> based
          on their username using the DiceBear avatar API. Users can also
          customize their avatar style.
        </p>

        <Image
          src="/docImages/discussion.png"
          alt={`${altBaseString} Discussions`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-3">
          As mentioned earlier, this feature was built using{" "}
          <b>Prisma schemas</b> and <b>Supabase</b>, which I had never worked
          with before this project—making it a great learning experience.
        </p>

        <p className="mt-3">
          If you think this is a cool feature, drop a comment!
        </p>
      </div>

      <div id="contacts">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Contacts</h2>

        <p className="mt-4">
          Honestly, there&apos;s not much to say about this page. It's a{" "}
          <b>contact form</b>. Wow, what a surprise!
        </p>

        <p className="mt-3">
          I included this so that if you ever feel like reaching out, you can
          easily do so through the form. It&apos;s a simple contact form built
          using <b>EmailJS</b>, which I&apos;ve used many times before because
          it perfectly fits my needs.
        </p>

        <Image
          src="/docImages/contacts.png"
          alt={`${altBaseString} Contacts`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />
      </div>

      <div id="manupilot-ai">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          Manupilot AI
        </h2>

        <p className="mt-4">
          A cool feature of <b>GitHub</b> is <b>Copilot</b>, so I really wanted
          to replicate that idea— and that&apos;s how <b>ManuPilot</b> was born.
        </p>

        <p className="mt-3">
          Of course, this is just another <b>AI chatbot</b>, but it adds a nice
          touch to my portfolio since it&apos;s specifically{" "}
          <b>instructed to provide information about me</b>, aside from being a
          general AI assistant.
        </p>

        <p className="mt-3">
          Powered by <b>OpenAI&apos;s GPT-4</b>, ManuPilot is available in two
          ways:
        </p>

        <ul className="list-disc pl-6 my-3">
          <li>
            <b>Quick Chat</b>: A chat that opens in the{" "}
            <b>bottom-right corner</b> of the website, allowing users to ask
            quick questions.
          </li>
          <Image
            src="/docImages/quickchat.png"
            alt={`${altBaseString} ManuPilot Quick Chat`}
            className="my-3 border border-accent-border w-auto max-w-full h-auto"
            width={800}
            height={500}
            quality={100}
            priority
          />

          <li>
            <b>ManuPilot Page</b>: A dedicated page where users can interact
            with the AI in a more immersive way.
          </li>
          <Image
            src="/docImages/manupilot.png"
            alt={`${altBaseString} ManuPilot Immersive`}
            className="my-3 border border-accent-border w-auto max-w-full h-auto"
            width={800}
            height={500}
            quality={100}
            priority
          />
        </ul>

        <p className="mt-3">
          Both chats offer a <b>GitHub Copilot-style experience</b>. Currently,
          the <b>quick chat</b> also allows users to <b>browse projects</b> and
          talk about them in detail. I plan to bring this feature to the full{" "}
          <b>ManuPilot page</b> in the future, but even now, the AI is{" "}
          <b>instructed to discuss my projects</b>.
        </p>

        <Image
          src="/docImages/aiprojects.png"
          alt={`${altBaseString} ManuPilot Browse Projects`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-3">
          In both chats, users can <b>upload code or text files</b> for AI
          analysis.
        </p>

        <Image
          src="/docImages/upload.png"
          alt={`${altBaseString} ManuPilot Upload`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-3">
          The conversation layout closely follows{" "}
          <b>GitHub Copilot&apos;s chat UI</b>. AI responses are properly
          formatted, with <b>Markdown converted into readable text</b>. The AI
          can also <b>generate code</b> and
          <b>return images</b> directly on the screen.
        </p>

        <Image
          src="/docImages/aicode.png"
          alt={`${altBaseString} ManuPilot Formatted Chat`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-3">
          Use this AI with caution and <b>stay tuned</b>. This feature is still
          evolving and will be improved over time!
        </p>
      </div>
    </div>
  );
};

const DeploymentAndFuturePlans = () => {
  return (
    <div className="flex flex-col gap-6 border-b border-accent-border py-8">
      <p className="monospace-text font-normal text-sm text-text-secondary">
        5. Deployment & Future Plans
      </p>
      <div id="hosting">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          Hosting & CI/CD
        </h2>
        <p className="mt-4">
          To deploy my website, I chose <b>Vercel</b>. Since Next.js is built by
          Vercel, it made perfect sense. It provides a seamless deployment
          experience with automatic optimizations and fast global edge
          functions. Plus, it takes care of <b>server-side rendering (SSR)</b>{" "}
          and static optimizations without me having to worry about the
          infrastructure.
        </p>
        <p className="mt-3">
          The project is hosted directly from <b>GitHub</b>, meaning every time
          I push changes to the
          <code>main</code> branch, Vercel automatically builds and deploys the
          latest version of the site. This makes deployment effortless, and I
          don&apos;t have to manually upload files or restart servers.
        </p>

        <p className="mt-3">
          In terms of{" "}
          <b>Continuous Integration / Continuous Deployment (CI/CD)</b>,
          everything runs smoothly with Vercel&apos;s automated pipelines. Every
          commit triggers a new build, and I can preview changes before merging
          them. If something breaks, I can easily roll back to a previous
          deployment with a single click.
        </p>

        <p className="mt-3">
          Overall, Vercel makes my life easier by handling{" "}
          <b>performance optimizations, caching, and CDN distribution</b>{" "}
          automatically. If you&apos;re using Next.js, and also, for projects
          like this one <b>IT&apos;S FREE</b>.
        </p>
      </div>

      <div id="future-plans">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          What&apos;s Next?
        </h2>
        <p className="mt-4">
          Well, as I mentioned before, there are things that{" "}
          <b>need improvement</b>. So if someone asks me{" "}
          <b>"What&apos;s next?"</b>, my first answer would be that I need to
          refine what I&apos;ve already built. There are parts of the project
          where the
          <b>code could be optimized</b>, and that&apos;s a priority before
          adding anything new.
        </p>

        <p className="mt-3">
          Then, there are features that I will continue tweaking over time,
          making them
          <b>even closer to GitHub&apos;s experience</b>. Some sections are
          already well done, but others still have room for improvement.
        </p>

        <p className="mt-3">
          I&apos;ve also considered adding <b>extra features</b>, but at the end
          of the day, this is just a portfolio. It&apos;s already packed with
          interactive elements. Some friends suggested adding <b>minigames</b>,
          but I&apos;m still undecided on that.
        </p>

        <p className="mt-3">
          One thing that&apos;s certain is that I will{" "}
          <b>actively maintain this site</b>. Future plans include:
        </p>

        <ul className="list-disc pl-6 mt-3">
          <li>Adding new projects as I build them.</li>
          <li>
            Keeping the <b>blog updated</b>, because having an empty blog makes
            no sense.
          </li>
          <li>
            Improving <b>ManuPilot</b> with more features and updates.
          </li>
          <li>
            Expanding the <b>Dev Quiz</b> as technologies evolve.
          </li>
        </ul>

        <p className="mt-3">
          So, the future of this site is all about growth and updates. Some
          might see that as extra work, but to me, it&apos;s a{" "}
          <b>great achievement</b>. I&apos;ve built a personal site that I
          actually need to take care of. That means it&apos;s not just a static
          portfolio, but an evolving project.
        </p>
      </div>
    </div>
  );
};

const ThankYou = () => {
  return (
    <div className="flex flex-col gap-6 border-b border-accent-border py-8">
      <div id="hosting">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          Thank You
        </h2>
        <p className="mt-4">
          If you&apos;ve made it this far, <b>thank you</b> for taking the time
          to read about this website. I hope you found it interesting, and maybe
          even picked up some ideas along the way! This portfolio was a{" "}
          <b>fun challenge</b>, and I&apos;ll continue improving it over time.
        </p>
        <h3 className="my-4 text-2xl font-bold">Continue Browsing</h3>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/"
            className="text-text-link underline hover:text-text-primary"
          >
            Welcome page
          </Link>
          <Link
            href="/portfolio"
            className="text-text-link underline hover:text-text-primary"
          >
            Explore My Portfolio
          </Link>
          <Link
            href="/writings"
            className="text-text-link underline hover:text-text-primary"
          >
            Read My Writings
          </Link>
          <Link
            href="/dev-quiz"
            className="text-text-link underline hover:text-text-primary"
          >
            Do a Dev-Quiz
          </Link>
          <Link
            href="/discussions"
            className="text-text-link underline hover:text-text-primary"
          >
            Join the Discussion
          </Link>
          <Link
            href="/contact"
            className="text-text-link underline hover:text-text-primary"
          >
            Get In Touch
          </Link>
          <Link
            href="/manupilot"
            className="text-text-link underline hover:text-text-primary"
          >
            Use ManuPilot AI
          </Link>
        </div>
      </div>
    </div>
  );
};

const DocFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer id="bottom" className="w-full mt-auto pt-10 md:pt-12 pb-10 px-4 ">
      <div className="w-full center max-md:items-start gap-2 max-md:flex-col">
        <Link
          href="/"
          className="text-text-primary center text-[22px] md:text-lg w-[38px] md:w-[26px] h-[38px] md:h-[26px] border border-text-primary center max-md:mb-2"
        >
          E
        </Link>
        <p className="text-xs text-center text-text-secondary ">
          &copy; {currentYear} Made with ❤️ by{" "}
          <span className="font-semibold">Emanuele Sgroi</span>
        </p>
        <div className="max-md:hidden h-px w-2 bg-text-secondary mt-1" />
        <p className="text-center text-xs text-text-secondary center gap-[3px]">
          Inspired by the design of GitHub <IoLogoGithub size={22} />
        </p>
        <div className="max-md:hidden h-px w-2 bg-text-secondary mt-1" />
        <Link
          href="https://github.com/Emanuele-Sgroi/emanuelesgroi.com"
          target="_blank"
          className="text-center text-xs text-text-secondary hover:text-accent-extra "
        >
          Give it a star ⭐
        </Link>
      </div>
    </footer>
  );
};
