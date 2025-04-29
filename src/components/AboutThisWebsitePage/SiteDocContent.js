// This component serves as the main "About This Website" documentation page.
// It explains the portfolio’s design, technologies used, features, and future plans.

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

const SiteDocContent = ({ t }) => {
  const altBaseString = t.altBaseString;
  return (
    <div className="flex-1 flex flex-col items-start justify-start p-6 lg:p-8">
      <div
        id="top"
        className="w-full flex items-start md:items-center justify-between flex-wrap gap-4 border-b border-accent-border pb-4 mb-8"
      >
        {/* Title */}
        <div className="center flex-wrap ">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {t.about}
          </h1>
        </div>
        <Link
          href="https://github.com/Emanuele-Sgroi/emanuelesgroi.com"
          target="blank"
          rel="noopener noreferrer"
          className="btn-primary !bg-[#238636] max-sm:!text-sm center gap-2"
        >
          <IoCode size={18} />
          {t.code}
        </Link>
      </div>
      <Introduction t={t} />
      <DesignAndUI t={t} />
      <TechStack t={t} />
      <Features t={t} altBaseString={altBaseString} />
      <DeploymentAndFuturePlans t={t} />
      <ThankYou t={t} />
      <DocFooter t={t} />
    </div>
  );
};

export default SiteDocContent;

// Introduction - Why I Built This Portfolio
const Introduction = ({ t }) => {
  const intro = t.content.introduction;
  return (
    <div className="flex flex-col gap-6 border-b border-accent-border pb-8">
      <p className="monospace-text font-normal text-sm text-text-secondary">
        {intro.sectionNumber}
      </p>

      {/* WHY I BUILT */}
      <div id="why-built">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          {intro.whyBuilt.title}
        </h2>

        {intro.whyBuilt.paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className={index === 0 ? "mt-4" : index === 2 ? "my-6" : "mt-3"}
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ))}

        <h3 className="my-4 text-2xl font-bold">
          {intro.whyBuilt.keyReasonsTitle}
        </h3>

        <ul className="flex flex-col !list-disc pl-6">
          {intro.whyBuilt.keyReasons.map((reason, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: reason }} />
          ))}
        </ul>
      </div>
      {/* TECHNOLOGIES USED */}
      <div id="technologies-used">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          {intro.technologiesUsed.title}
        </h2>
        {intro.technologiesUsed.paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className={index === 0 ? "mt-4" : "mt-3"}
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ))}

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
        <p
          className="p-4 rounded-md bg-bg-button text-text-secondary"
          dangerouslySetInnerHTML={{ __html: intro.technologiesUsed.note }}
        />
      </div>
    </div>
  );
};

// Design & UI - How I made it look like GitHub
const DesignAndUI = ({ t }) => {
  const design = t.content.designAndUI;

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

  const renderHTML = (htmlString) => (
    <span dangerouslySetInnerHTML={{ __html: htmlString }} />
  );

  return (
    <div className="flex flex-col gap-6 border-b border-accent-border py-8">
      <p className="monospace-text font-normal text-sm text-text-secondary">
        {design.sectionNumber}
      </p>

      {/* GitHub-Style Inspirations */}
      <div id="github-style">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          {design.githubStyle.title}
        </h2>

        {design.githubStyle.paragraphs.map((p, i) => (
          <p key={i} className={i === 0 ? "mt-4" : "mt-3"}>
            {renderHTML(p)}
          </p>
        ))}

        <ul className="flex flex-col !list-disc pl-6 my-6">
          {design.githubStyle.sections.map((item, i) => (
            <li key={i}>{renderHTML(item)}</li>
          ))}
        </ul>
      </div>

      {/* Extracting UI */}
      <div id="extracting-ui">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          {design.extractingUI.title}
        </h2>

        {design.extractingUI.paragraphs.map((p, i) => (
          <p key={i} className={i === 0 ? "mt-4" : "mt-3"}>
            {renderHTML(p)}
          </p>
        ))}

        <Image
          src="/docImages/extracting-ui.png"
          alt="Extracting GitHub UI"
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-6 mb-2 text-sm text-text-secondary">
          {design.extractingUI.darkModeExample}
        </p>

        <div className="w-fit flex flex-wrap border border-accent-border">
          {colorsDark.map((color, i) => (
            <div
              key={i}
              className="w-16 h-16 center p-1"
              style={{ backgroundColor: color.hex }}
            >
              <p className="text-xs text-text-secondary mt-1">{color.hex}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 mb-2 text-sm text-text-secondary">
          {design.extractingUI.lightModeExample}
        </p>

        <div className="w-fit flex flex-wrap border border-accent-border">
          {colorsLight.map((color, i) => (
            <div
              key={i}
              className="w-16 h-16 center p-1"
              style={{ backgroundColor: color.hex }}
            >
              <p className="text-xs text-text-secondary mt-1">{color.hex}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dark Mode */}
      <div id="dark-mode">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          {design.darkMode.title}
        </h2>

        {design.darkMode.paragraphs.map((p, i) => (
          <p key={i} className={i === 0 ? "mt-3" : "mt-3"}>
            {renderHTML(p)}
          </p>
        ))}

        <ul className="flex flex-col !list-disc pl-6 mt-4">
          {design.darkMode.points.map((item, i) => (
            <li key={i}>{renderHTML(item)}</li>
          ))}
        </ul>
      </div>

      {/* Responsiveness */}
      <div id="Responsiveness">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          {design.responsiveness.title}
        </h2>

        {design.responsiveness.paragraphs.map((p, i) => (
          <p key={i} className={i === 0 ? "mt-4" : "mt-3"}>
            {renderHTML(p)}
          </p>
        ))}
      </div>
    </div>
  );
};

// Tech Stack - Technologies and tools used to build this site
const TechStack = ({ t }) => {
  const tech = t.content.techStack;

  return (
    <div className="flex flex-col gap-6 border-b border-accent-border py-8">
      <p className="monospace-text font-normal text-sm text-text-secondary">
        {tech.sectionNumber}
      </p>

      {/* NEXT.JS SECTION */}
      <div id="nextjs">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          {tech.nextjs.title}
        </h2>
        {tech.nextjs.paragraphs.map((paragraph, idx) => (
          <p
            key={idx}
            className={idx === 0 ? "mt-4" : "mt-3"}
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ))}

        <h3 className="my-4 text-2xl font-bold">{tech.nextjs.howIUseTitle}</h3>

        <ul className="flex flex-col !list-disc pl-6">
          {tech.nextjs.howIUsePoints.map((point, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: point }} />
          ))}
        </ul>

        {tech.nextjs.paragraphsAfter.map((paragraph, idx) => (
          <p
            key={idx}
            className="mt-3"
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ))}
      </div>

      {/* TAILWIND CSS SECTION */}
      <div id="tailwind">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          {tech.tailwind.title}
        </h2>

        {tech.tailwind.paragraphs.map((paragraph, idx) => (
          <p
            key={idx}
            className={idx === 0 ? "mt-4" : "mt-3"}
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ))}

        {/* Code Snippet */}
        <p className="monospace-text bg-[#212830] text-white w-fit p-2 rounded-md mt-4">
          <span className="!text-[#FFA73A]">&lt;div</span> id=
          <span className="!text-[#6A8759]">&quot;example&quot;</span>{" "}
          className=
          <span className="!text-[#6A8759]">
            &quot;w-full h-screen absolute top-0 left-0&quot;
          </span>
          <span className="!text-[#FFA73A]"> /&gt;</span>
        </p>

        <Image
          src="/docImages/example-bad-css.png"
          alt="Example bad CSS workaround"
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />
      </div>

      {/* CONTENTFUL CMS SECTION */}
      <div id="contentful">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          {tech.contentful.title}
        </h2>

        {tech.contentful.paragraphs.map((paragraph, idx) => (
          <p
            key={idx}
            className={idx === 0 ? "mt-4" : "mt-3"}
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ))}

        <Image
          src="/docImages/contentful.png"
          alt="Contentful CMS example"
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />
      </div>

      {/* PRISMA & SUPABASE SECTION */}
      <div id="prisma">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          {tech.prisma.title}
        </h2>

        {tech.prisma.paragraphs.map((paragraph, idx) => (
          <p
            key={idx}
            className={idx === 0 ? "mt-4" : "mt-3"}
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ))}

        <Image
          src="/docImages/prisma.png"
          alt="Prisma & Supabase integration"
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />
      </div>

      {/* AI INTEGRATION SECTION */}
      <div id="ai-integration">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          {tech.aiIntegration.title}
        </h2>

        {tech.aiIntegration.paragraphs.map((paragraph, idx) => (
          <p
            key={idx}
            className={idx === 0 ? "mt-4" : "mt-3"}
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ))}

        <div className="mt-4 flex flex-col gap-2">
          {tech.aiIntegration.links.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              target="_blank"
              className="text-text-link underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* UI FRAMEWORKS SECTION */}
      <div id="ui-frameworks">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          {tech.uiFrameworks.title}
        </h2>

        {tech.uiFrameworks.paragraphs.map((paragraph, idx) => (
          <p
            key={idx}
            className={idx === 0 ? "mt-4" : "mt-3"}
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ))}

        <Image
          src="/docImages/shadcn.png"
          alt="ShadCN UI framework example"
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

// Features Breakdown - Explanation of different sections of the portfolio

const Features = ({ t, altBaseString }) => {
  const features = t.content.features;

  // Tiny helper so we don’t repeat the dangerouslySetInnerHTML boilerplate
  const renderHTML = (html) => (
    <span dangerouslySetInnerHTML={{ __html: html }} />
  );

  return (
    <div className="flex flex-col gap-6 border-b border-accent-border py-8">
      {/* ───────────────── 4. Features Breakdown ───────────────── */}
      <p className="monospace-text font-normal text-sm text-text-secondary">
        {features.sectionNumber}
      </p>

      {/* ─────────────────────── Welcome ─────────────────────── */}
      <div id="welcome-page">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          {features.welcome.title}
        </h2>
        <p className="mt-4">{renderHTML(features.welcome.intro)}</p>

        <h3 className="my-4 text-2xl font-bold">
          {features.welcome.profileBarTitle}
        </h3>
        <p className="mt-2">{renderHTML(features.welcome.profileBarText)}</p>
        <Image
          src="/docImages/profile.png"
          alt={`${altBaseString} Profile Bar`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <h3 className="my-4 text-2xl font-bold">
          {features.welcome.readmeTitle}
        </h3>
        <p className="mt-2">{renderHTML(features.welcome.readmeText)}</p>
        <Image
          src="/docImages/readme.png"
          alt={`${altBaseString} README`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <h3 className="my-4 text-2xl font-bold">
          {features.welcome.pinnedTitle}
        </h3>
        <p className="mt-2">{renderHTML(features.welcome.pinnedText)}</p>
        <Image
          src="/docImages/pinned.png"
          alt={`${altBaseString} Pinned Tabs`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <h3 className="my-4 text-2xl font-bold">
          {features.welcome.chartTitle}
        </h3>
        <p className="mt-2">{renderHTML(features.welcome.chartText)}</p>
        <Image
          src="/docImages/chart.png"
          alt={`${altBaseString} Contribution Chart`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-2">{renderHTML(features.welcome.chartExtra)}</p>
        <Image
          src="/docImages/chartemoji.png"
          alt={`${altBaseString} Contribution Chart Emoji`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-2">{renderHTML(features.welcome.chartManual)}</p>
        <Link
          href="https://github.com/Emanuele-Sgroi/emanuelesgroi.com/blob/main/src/utils/characterMapLarge.js"
          target="_blank"
          className="mt-3 text-text-link underline"
        >
          {features.welcome.chartLink}
        </Link>
      </div>

      {/* ─────────────────────── Portfolio ────────────────────── */}
      <div id="portfolio">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          {features.portfolio.title}
        </h2>
        <p className="mt-4">{renderHTML(features.portfolio.intro)}</p>

        <Image
          src="/docImages/portfolio.png"
          alt={`${altBaseString} Portfolio`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-3">{renderHTML(features.portfolio.viewSwitch)}</p>
        <Image
          src="/docImages/portfoliogrid.png"
          alt={`${altBaseString} Portfolio Grid`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <h3 className="my-4 text-2xl font-bold">
          {features.portfolio.projectDetailsTitle}
        </h3>
        <p className="mt-2">
          {renderHTML(features.portfolio.projectDetailsIntro)}
        </p>
        <Image
          src="/docImages/project.png"
          alt={`${altBaseString} Project Details`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-3">
          {renderHTML(features.portfolio.projectScreenshots)}
        </p>
        <Image
          src="/docImages/gallery.png"
          alt={`${altBaseString} Project Gallery`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />
      </div>

      {/* ─────────────────────── Writings ─────────────────────── */}
      <div id="writings">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          {features.writings.title}
        </h2>
        <p className="mt-4">{renderHTML(features.writings.intro)}</p>
        <p className="mt-3">{renderHTML(features.writings.blogText)}</p>

        <Image
          src="/docImages/blog.png"
          alt={`${altBaseString} Blog`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-3">{renderHTML(features.writings.academicText)}</p>

        <Image
          src="/docImages/academic.png"
          alt={`${altBaseString} Academic Writing`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <h3 className="my-4 text-2xl font-bold">
          {features.writings.blogPostTitle}
        </h3>
        <p className="mt-3">{renderHTML(features.writings.blogPostText)}</p>
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

      {/* ────────────────────── Dev-Quiz ─────────────────────── */}
      <div id="dev-quiz">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          {features.devQuiz.title}
        </h2>
        <p className="mt-4">{renderHTML(features.devQuiz.intro)}</p>
        <p className="mt-3">{renderHTML(features.devQuiz.topics)}</p>
        <Image
          src="/docImages/topics.png"
          alt={`${altBaseString} Quiz Topics`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-3">{renderHTML(features.devQuiz.number)}</p>
        <Image
          src="/docImages/questions.png"
          alt={`${altBaseString} Quiz Questions Number`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-3">{renderHTML(features.devQuiz.mcq)}</p>
        <Image
          src="/docImages/quiz.png"
          alt={`${altBaseString} Dev Quiz`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-3">{renderHTML(features.devQuiz.results)}</p>
        <Image
          src="/docImages/result.png"
          alt={`${altBaseString} Quiz Result`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-3">{renderHTML(features.devQuiz.staticData)}</p>
        <Link
          href="https://github.com/Emanuele-Sgroi/emanuelesgroi.com/blob/main/src/utils/devQuizQuestions.js"
          target="_blank"
          className="mt-3 text-text-link underline"
        >
          {features.devQuiz.quizLink}
        </Link>

        <p className="p-4 rounded-md bg-bg-button text-text-secondary mt-6">
          {renderHTML(features.devQuiz.note)}
        </p>
      </div>

      {/* ───────────────────── Discussions ───────────────────── */}
      <div id="discussion">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          {features.discussion.title}
        </h2>
        <p className="mt-4">{renderHTML(features.discussion.intro)}</p>
        <p className="mt-3">{renderHTML(features.discussion.interactions)}</p>
        <p className="mt-3">{renderHTML(features.discussion.avatars)}</p>

        <Image
          src="/docImages/discussion.png"
          alt={`${altBaseString} Discussions`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-3">{renderHTML(features.discussion.backend)}</p>
        <p className="mt-3">{renderHTML(features.discussion.comment)}</p>
      </div>

      {/* ─────────────────────── Contacts ────────────────────── */}
      <div id="contacts">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          {features.contacts.title}
        </h2>
        <p className="mt-4">{renderHTML(features.contacts.intro)}</p>
        <p className="mt-3">{renderHTML(features.contacts.text)}</p>

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

      {/* ──────────────────── Manupilot AI ───────────────────── */}
      <div id="manupilot-ai">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          {features.manupilot.title}
        </h2>
        <p className="mt-4">{renderHTML(features.manupilot.intro)}</p>
        <p className="mt-3">{renderHTML(features.manupilot.description)}</p>
        <p className="mt-3">{renderHTML(features.manupilot.usage)}</p>

        <ul className="list-disc pl-6 my-3">
          {features.manupilot.modes.map((mode, idx) => (
            <li key={idx}>{renderHTML(mode)}</li>
          ))}
          {/* demo images inline with list items, kept as-is */}
          <Image
            src="/docImages/quickchat.png"
            alt={`${altBaseString} ManuPilot Quick Chat`}
            className="my-3 border border-accent-border w-auto max-w-full h-auto"
            width={800}
            height={500}
            quality={100}
            priority
          />
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

        <p className="mt-3">{renderHTML(features.manupilot.additional)}</p>
        <Image
          src="/docImages/aiprojects.png"
          alt={`${altBaseString} ManuPilot Browse Projects`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-3">{renderHTML(features.manupilot.uploads)}</p>
        <Image
          src="/docImages/upload.png"
          alt={`${altBaseString} ManuPilot Upload`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-3">{renderHTML(features.manupilot.formatting)}</p>
        <Image
          src="/docImages/aicode.png"
          alt={`${altBaseString} ManuPilot Formatted Chat`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />

        <p className="mt-3">{renderHTML(features.manupilot.closing)}</p>
      </div>

      {/* ────────────────── Multilanguage Support ─────────────── */}
      <div id="languages">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          {features.languages.title}
        </h2>
        <p className="mt-4">{renderHTML(features.languages.intro)}</p>
        <p className="mt-3">{renderHTML(features.languages.dynamic)}</p>
        <p className="mt-3">{renderHTML(features.languages.custom)}</p>

        <p className="mt-3 font-semibold">Key points:</p>
        <ul className="list-disc pl-6 my-3">
          {features.languages.keypoints.map((kp, idx) => (
            <li key={idx}>{renderHTML(kp)}</li>
          ))}
        </ul>

        <p className="mt-3">{features.languages.example}</p>
        <Image
          src="/docImages/language.png"
          alt={`${altBaseString} Language example`}
          className="my-6 border border-accent-border w-auto max-w-full h-auto"
          width={800}
          height={500}
          quality={100}
          priority
        />
      </div>
    </div>
  );
};

// Deployment & Future Plans - How it's hosted & what's next
const DeploymentAndFuturePlans = ({ t }) => {
  const deploymentAndPlans = t.content.deploymentAndFuturePlans;

  return (
    <div className="flex flex-col gap-6 border-b border-accent-border py-8">
      <p className="monospace-text font-normal text-sm text-text-secondary">
        {deploymentAndPlans.sectionNumber}
      </p>

      <div id="hosting">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          {deploymentAndPlans.hosting.title}
        </h2>

        <p
          className="mt-4"
          dangerouslySetInnerHTML={{ __html: deploymentAndPlans.hosting.p1 }}
        />
        <p
          className="mt-3"
          dangerouslySetInnerHTML={{ __html: deploymentAndPlans.hosting.p2 }}
        />
        <p
          className="mt-3"
          dangerouslySetInnerHTML={{ __html: deploymentAndPlans.hosting.p3 }}
        />
        <p
          className="mt-3"
          dangerouslySetInnerHTML={{ __html: deploymentAndPlans.hosting.p4 }}
        />
      </div>

      <div id="future-plans">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          {deploymentAndPlans.futurePlans.title}
        </h2>

        <p
          className="mt-4"
          dangerouslySetInnerHTML={{
            __html: deploymentAndPlans.futurePlans.p1,
          }}
        />
        <p
          className="mt-3"
          dangerouslySetInnerHTML={{
            __html: deploymentAndPlans.futurePlans.p2,
          }}
        />
        <p
          className="mt-3"
          dangerouslySetInnerHTML={{
            __html: deploymentAndPlans.futurePlans.p3,
          }}
        />
        <p
          className="mt-3"
          dangerouslySetInnerHTML={{
            __html: deploymentAndPlans.futurePlans.p4,
          }}
        />

        <ul className="list-disc pl-6 mt-3">
          {deploymentAndPlans.futurePlans.list.map((item, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>

        <p
          className="mt-3"
          dangerouslySetInnerHTML={{
            __html: deploymentAndPlans.futurePlans.p5,
          }}
        />
      </div>
    </div>
  );
};

// Thank You - Closing message & useful links
const ThankYou = ({ t }) => {
  const thankYou = t.content.thankYou;

  return (
    <div className="flex flex-col gap-6 border-b border-accent-border py-8">
      <div id="hosting">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          {thankYou.title}
        </h2>

        <p className="mt-4" dangerouslySetInnerHTML={{ __html: thankYou.p1 }} />

        <h3 className="my-4 text-2xl font-bold">{thankYou.subtitle}</h3>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/"
            className="text-text-link underline hover:text-text-primary"
          >
            {thankYou.links.welcome}
          </Link>
          <Link
            href="/portfolio"
            className="text-text-link underline hover:text-text-primary"
          >
            {thankYou.links.portfolio}
          </Link>
          <Link
            href="/writings"
            className="text-text-link underline hover:text-text-primary"
          >
            {thankYou.links.writings}
          </Link>
          <Link
            href="/dev-quiz"
            className="text-text-link underline hover:text-text-primary"
          >
            {thankYou.links.devQuiz}
          </Link>
          <Link
            href="/discussions"
            className="text-text-link underline hover:text-text-primary"
          >
            {thankYou.links.discussions}
          </Link>
          <Link
            href="/contact"
            className="text-text-link underline hover:text-text-primary"
          >
            {thankYou.links.contact}
          </Link>
          <Link
            href="/manupilot"
            className="text-text-link underline hover:text-text-primary"
          >
            {thankYou.links.manupilot}
          </Link>
        </div>
      </div>
    </div>
  );
};

// Footer - For this page only the footer has a different component
const DocFooter = ({ t }) => {
  const footer = t.content.docFooter;
  const currentYear = new Date().getFullYear();
  return (
    <footer id="bottom" className="w-full mt-auto pt-16 pb-16 sm:pb-12">
      <div className="w-full flex items-start justify-start flex-col-reverse gap-4 ">
        <div className="flex items-start justify-start gap-4 flex-wrap">
          <Link
            href="/contact"
            className="text-center text-xs text-text-secondary hover:text-accent-extra"
          >
            {footer.contact}
          </Link>

          <Link
            href="https://www.linkedin.com/in/emanuele-sgroi/"
            className="text-center text-xs text-text-secondary hover:text-accent-extra"
          >
            LinkedIn
          </Link>

          <Link
            href="https://github.com/Emanuele-Sgroi/emanuelesgroi.com"
            target="_blank"
            className="text-center text-xs text-text-secondary hover:text-accent-extra "
          >
            {footer.star}
          </Link>
        </div>

        <div className="center gap-2 flex-wrap max-[315px]:flex-col max-[315px]:items-start">
          <Link
            href="/"
            className="text-text-primary center text-lg w-[26px] h-[26px] border border-text-primary center "
          >
            E
          </Link>
          <p className="text-xs text-center text-text-secondary ">
            &copy; {currentYear} {footer.made}{" "}
            <span className="font-semibold">Emanuele Sgroi</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
