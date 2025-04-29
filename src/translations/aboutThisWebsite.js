const aboutThisWebsiteTranslation = {
  en: {
    goBack: "Go Back",
    about: "About this website",
    code: "Source Code",
    altBaseString: "Emanuele Sgroi - About this website -",
    navigationMenu: {
      titles: {
        introduction: "Introduction",
        design: "Design & UI",
        techStack: "Tech Stack",
        features: "Features Breakdown",
        deployment: "Deployment & Future Plans",
      },
      links: {
        whyBuilt: "Why I Built This",
        technologiesUsed: "Key Technologies",
        githubStyle: "GitHub-Style Inspiration",
        extractingUI: "Extracting GitHub's UI Elements",
        darkMode: "Dark Mode",
        responsiveness: "Responsiveness",
        nextjs: "Next.js",
        tailwind: "Tailwind CSS & Plain CSS",
        contentful: "Contentful as a CMS",
        prisma: "Prisma & Supabase",
        aiIntegration: "AI Integration",
        uiFrameworks: "UI Frameworks",
        welcome: "Welcome",
        portfolio: "Portfolio",
        writings: "Writings",
        devQuiz: "Dev Quiz",
        discussion: "Discussion",
        contacts: "Contacts",
        manupilot: "ManuPilot AI",
        languages: "Multilanguage Support",
        hosting: "Hosting & CI/CD",
        futurePlans: "What's Next?",
      },
      mobileButton: "Navigation Menu",
    },

    content: {
      introduction: {
        sectionNumber: "1. Introduction",
        whyBuilt: {
          title: "Why I Built This",
          paragraphs: [
            `I had a portfolio before, one of my first React projects. It was cool, with a built-in bot pretending to be me, but over time, I felt it was too generic. It looked like every other portfolio out there, and that's not who I am. I like to do things differently, to create something unusual. <b>Isn't that already part of what makes a portfolio interesting?</b>`,
            `I started looking for inspiration, browsing portfolios across different fields: software engineers, UI/UX designers, photographers, graphic artists. Many were visually stunning, but none felt like the kind of portfolio I wanted. They inspired me not in design, but in concept. I wanted my portfolio to feel like a real project, not just a showcase. A portfolio where people could interact, not just browse.`,
            `💡 Then, it hit me. <b>GitHub</b>`,
            `I love GitHub's minimalist yet effective design. It's built for developers, and let's be real: <b>what developer hasn't used GitHub at least once?</b> That's when I knew: I wanted my portfolio to feel like a GitHub clone. Not just in aesthetics, but in functionality: <b>interactive, intuitive, and dev-friendly</b>.`,
          ],
          keyReasonsTitle: "Key reasons I built this",
          keyReasons: [
            `<b>Showcase my work and writing:</b> A portfolio's core purpose. But beyond projects, I've always wanted a personal blog to share thoughts and ideas.`,
            `<b>Create something dev-friendly (and beyond):</b> Inspired by GitHub, but designed so that anyone can navigate it easily.`,
            `<b>Make it interactive:</b> I didn't want visitors to just look at my site; I wanted them to use it. Features like ManuPilot, Discussion, and Dev Quiz make it engaging and unique, making this portfolio feel like a proper GitHub-like project (or at least in part).`,
            `<b>Improve my own skills:</b> This project pushed me to learn new things, solve challenges, and refine my development workflow.`,
          ],
        },
        technologiesUsed: {
          title: "Technologies I Used",
          paragraphs: [
            `To bring this project to life, I used a combination of modern web technologies, libraries, and tools. Here's what I used to build it.`,
            `Don't worry, I'll go into more detail about each one in the next sections.`,
          ],
          technologies: [
            "Next.js",
            "CSS",
            "Tailwind CSS",
            "Prisma",
            "Supabase",
            "OpenAI",
            "Contentful CMS",
            "ShadCN",
            "GitHub",
            "Vercel",
          ],
          note: `You can grab the source code above. But here's the deal: this project is still a work in progress. Some sections are well-structured, others need refinement. I built it fast, fixed bugs on the fly, and balanced it with other commitments. Whenever I get time, I'll keep improving and optimizing the code.`,
        },
      },
      designAndUI: {
        sectionNumber: "2. Design & UI",
        githubStyle: {
          title: "GitHub-Style Inspirations",
          paragraphs: [
            `As mentioned in the introduction, I wanted my portfolio to <b>look and feel like GitHub</b>, from the <b>layout</b> to the <b>colours</b>, <b>fonts</b>, and overall <b>structure</b>. Some might disagree, but I personally love <b>GitHub&apos;s minimalistic design</b>. Plus, using GitHub as a design inspiration makes sense for a portfolio aimed at <b>developers</b>, who {"("}hopefully{")"} might find it a cool idea.`,
            `While the <b>layout</b> is <b>heavily inspired by GitHub</b>, I still made my own modifications where needed. My site doesn&apos;t have all the features that the real GitHub does, but I <b>replicated as many UI elements as possible</b> {"("}buttons, links, tags, and so on{")"} to maintain a <b>familiar experience</b>.`,
            `Here&apos;s how different sections of my portfolio map to GitHub:`,
          ],
          sections: [
            `<b>Welcome Page</b> → Mirrors a <b>GitHub profile page</b>.`,
            `<b>Portfolio Page</b> → Inspired by the <b>repositories page</b>, but I added my own touch, like the option to switch between <b>list view</b> (GitHub-style) and <b>grid view</b>.`,
            `<b>Project Details Page</b> → Partially inspired by a <b>GitHub repository page</b>, but with changes, like <b>no file navigation</b> and a different way of <b>displaying images</b>.`,
            `<b>Writings Page</b> → A mix between <b>GitHub Blog</b> and <b>GitHub Marketplace</b>.`,
            `<b>Blog Posts</b> → Mimic the <b>GitHub Blog post layout</b>.`,
            `<b>Dev Quiz</b> → A unique feature <b>not found on GitHub</b>, but designed in a way that follows <b>GitHub&apos;s UI style</b>.`,
            `<b>Discussions</b> → Closely resembles a <b>GitHub Discussion thread</b>.`,
            `<b>Contact Page</b> → Doesn&apos;t copy a specific GitHub page but follows a <b>similar layout to a profile page</b>.`,
            `<b>ManuPilot</b> → Both the <b>ManuPilot page</b> and <b>quick chat interface</b> are heavily inspired by <b>GitHub Copilot</b>, making it feel like a natural extension of the GitHub ecosystem.`,
            `<b>Navigation Menu, Profile Bar, and Other UI Elements</b> → All <b>mimic GitHub&apos;s UI</b>, keeping the design consistent.`,
          ],
        },
        extractingUI: {
          title: "Extracting GitHub's UI Elements",
          paragraphs: [
            `To make this portfolio feel like <b>GitHub</b>, I didn&apos;t just eyeball the design, instead I went straight to the source. Using the browser&apos;s <b>Inspect Element</b> tool, I extracted key UI details I was looking for.`,
            `This allowed me to get the same UI elements such as <b>spacing, font sizes, colors, padding, border-radius</b>, and more. GitHub&apos;s color palette follows a very simple and, as I&apos;ve already mentioned, minimalistic pattern.`,
          ],
          darkModeExample: "Example background colours - Dark mode",
          lightModeExample: "Example background colours - Light mode",
        },
        darkMode: {
          title: "Dark Mode",
          paragraphs: [
            `Unlike GitHub, which offers multiple light and dark themes, I decided to <b>keep it simple</b> with just <b>one light theme and one dark theme</b>. The goal was to stay true to GitHub&apos;s aesthetic while ensuring an easy-to-maintain color system.`,
          ],
          points: [
            `The theme switches <b>automatically based on system preferences</b>, but users can toggle it manually if they prefer.`,
            `To stay as close as possible to GitHub&apos;s look, I <b>extracted the colors directly using the browser inspector</b> (as shown in the previous section).`,
            `I paid extra attention to <b>contrast and readability</b>, making sure that text, buttons, and borders remain clear and accessible in both themes.`,
          ],
        },
        responsiveness: {
          title: "Responsiveness",
          paragraphs: [
            `This website is <b>fully responsive</b> across multiple devices. However, to enhance the mobile experience, I made the design <b>closer to GitHub&apos;s mobile app</b> when viewed on smaller screens. This was a deliberate choice because, well... I think it looks cool.`,
            `Of course, elements <b>resize dynamically</b> as the screen gets smaller, ensuring a smooth and consistent experience. Aside from the color adjustments that resemble GitHub&apos;s mobile app, the <b>responsiveness follows the same principles as GitHub itself</b>.`,
            `I personally believe that <b>responsiveness is crucial in web development</b>, and I made sure this portfolio adapts well across all devices.`,
          ],
        },
      },
      techStack: {
        sectionNumber: "3. Tech Stack",

        nextjs: {
          title: "Next.js",
          paragraphs: [
            `I chose <b>Next.js</b> with the <b>App Router</b> because it offers the best mix of <b>simplicity, performance, and flexibility</b>. One of its biggest advantages is <b>SEO benefits</b>, who knows, maybe someone will stumble upon my portfolio through search engines. But beyond that, I picked Next.js mainly because of its <b>Server-Side Rendering (SSR) and Client-Side Rendering (CSR) capabilities</b>, which help make the website load faster and more efficiently.`,
            `Another major reason is <b>API Routes</b>. With Next.js, I don't need a separate backend framework like Express.js. Everything can be done <b>directly within Next.js API routes</b>, all in JavaScript.`,
            `Also, I just <b>love how the App Router structures folders and files</b>. It keeps things organized and makes development much smoother.`,
          ],
          howIUseTitle: "How I Use Next.js Features in This Portfolio",
          howIUsePoints: [
            `<b>Server-Side Fetching for Performance</b> → I fetch data on the <b>server-side</b> for things like retrieving content from the <b>CMS (Contentful)</b> or handling <b>OpenAI API</b> requests for ManuPilot AI. This approach helps reduce client-side workload and ensures <b>faster load times</b>. <span class="text-text-link underline">see example</span>.`,
            `<b>Next.js Image Optimization</b> → I always use <b>&lt;Image /&gt;</b> instead of the regular &lt;img /&gt; tag. It automatically optimizes images by <b>resizing, compressing, and serving them in modern formats</b> for better performance.`,
          ],
          paragraphsAfter: [
            `My website relies primarily on <b>Server-Side Rendering (SSR)</b> and <b>Client-Side Rendering (CSR)</b>. While I initially considered using <b>Static Site Generation (SSG)</b>, I realized that most of my content is dynamic—pulling data from <b>Contentful CMS</b>, <b>Supabase</b>, and <b>OpenAI's API</b>. Because of this, I opted for SSR to ensure that visitors always see the latest data without requiring manual re-builds.`,
            `The downside of this approach is that it can make the site slightly slower compared to a fully static approach. I'll admit, this might not have been the most optimal choice due to my limited experience with Next.js at the time. It's something I plan to improve. In the future, I might implement <b>Incremental Static Regeneration (ISR)</b> to strike a better balance between performance and up-to-date content.`,
          ],
        },

        tailwind: {
          title: "Tailwind CSS & Plain CSS",
          paragraphs: [
            `I chose <b>Tailwind CSS</b> because it's an incredibly efficient and flexible utility-first framework. It allows me to write <b>less</b> CSS and keeps my styling <b>directly in the components</b>, which means fewer files to manage. The built-in classes make it easy to maintain consistency across the website while speeding up development.`,
            `However, I didn't rely solely on Tailwind. I also used <b>plain CSS</b> for global styles, which I handled in <b>globals.css</b>. This was mainly for things like <b>custom utility classes, animations, and overriding default styles</b> where needed.`,
            `I did face some <b>visual challenges</b>, and I'll be honest, there are probably some sections where I could have done things better. In a few cases, I ran into layout issues, and to save time, I ended up <b>fixing them with a lot of media queries</b> in <b>globals.css</b>. While this worked, it also <b>increased the file size significantly</b>, which is something I plan to investigate and optimize in the future.`,
            `That said, my priority was to <b>fix the bugs and make sure everything worked</b>, even if some solutions weren't the most elegant. Continuous improvement is part of the journey, and I'll be refining this over time. 🚀`,
          ],
        },

        contentful: {
          title: "Contentful as a CMS",
          paragraphs: [
            `The <b>CMS</b> plays an important role in this project, allowing me to manage content without having to modify the code every time. Honestly, that's the main reason I chose to use a CMS for this portfolio: to keep things <b>flexible and easy to update</b>.`,
            `But why <b>Contentful</b>? Simply because it's <b>fast and easy</b> to use! Setting up content types is incredibly intuitive, and the implementation process is straightforward. Within minutes, you can structure your data exactly how you need it.`,
            `While I didn't use Contentful <b>for everything</b> in this project, most of the content that <b>changes frequently</b> comes from the CMS. This keeps the site dynamic while reducing the need for manual updates in the codebase.`,
          ],
        },

        prisma: {
          title: "Prisma & Supabase",
          paragraphs: [
            `<b>Prisma</b> and <b>Supabase</b> were used exclusively for the <b>Discussion</b> feature of my portfolio. At the time, I was studying these technologies and wanted to gain hands-on experience by implementing them in a real project. Since I had never used Prisma and Supabase before, this was a great opportunity to experiment.`,
            `Looking back, I might not have chosen Supabase for such a small feature, but it was a valuable learning experience. If I expand the project in the future, I already have the foundation for handling <b>database-driven</b> interactions.`,
          ],
        },

        aiIntegration: {
          title: "AI Integration",
          paragraphs: [
            `One of the standout features of this portfolio is <b>ManuPilot</b>, an AI-powered assistant designed to function like <b>GitHub Copilot</b>. I integrated OpenAI's API to create a chatbot that can answer questions, assist with coding, and interact dynamically with users. This was a challenging but exciting implementation, as it required handling <b>streaming responses</b>, <b>API rate limits</b>, and <b>token management</b>.`,
            `The AI works by sending user messages to a <b>server-side API route</b> that interacts with OpenAI's <b>GPT-4</b> model. The API processes each request and returns a response, which is streamed in real time to create a smooth user experience. To prevent exceeding OpenAI's token limit, I implemented a summarization feature that condenses conversations when they get too long.`,
            `The main challenge was <b>efficiently handling real-time responses</b>. Instead of waiting for the entire response to generate before displaying it, I used <b>streaming</b>, which allows text to appear word by word, just like ChatGPT's interface. This makes the experience feel much more natural and responsive.`,
          ],
          links: [
            {
              label: "See example - Back end",
              href: "https://github.com/Emanuele-Sgroi/emanuelesgroi.com/blob/main/src/app/api/manupilot/route.js",
            },
            {
              label: "See example - Front end",
              href: "https://github.com/Emanuele-Sgroi/emanuelesgroi.com/blob/main/src/pages/ManuPilotPage.js",
            },
          ],
        },

        uiFrameworks: {
          title: "UI Frameworks",
          paragraphs: [
            `To keep the UI consistent with GitHub's design, I used <b>ShadCN</b> and <b>React Icons</b> extensively throughout the project. These two libraries closely align with GitHub's aesthetic, making them the perfect choice for this portfolio.`,
          ],
        },
      },
      features: {
        sectionNumber: "4. Features Breakdown",
        welcome: {
          title: "Welcome",
          intro:
            "The <b>Welcome Page</b> serves as the homepage of this website and, as mentioned before, it is heavily inspired by the design of GitHub&apos;s profile page. It is divided into four key sections: the <b>Profile Bar</b>, <b>README</b>, <b>Pinned Tabs</b>, and the <b>Contribution Chart</b>. The <b>Profile Bar</b> is also present on other pages, keeping the layout consistent.",
          profileBarTitle: "Profile Bar",
          profileBarText:
            "The <b>Profile Bar</b> closely aligns with GitHub&apos;s, minus features like followers and following counts. It includes my <b>photo, name, profession, a short about me, and social links</b>, providing a quick overview of who I am.",
          readmeTitle: "README",
          readmeText:
            "The <b>README</b> acts as an <b>About Me</b> section, which is common in portfolios. It introduces me, my background, and showcases my skills. Just like how GitHub profiles often include a README for self-introduction.",
          pinnedTitle: "Pinned Tabs",
          pinnedText:
            "The <b>Pinned Tabs</b> provide quick access to projects and other important sections. This feature is directly inspired by GitHub, where many profiles have pinned repositories for easy access to highlighted work.",
          chartTitle: "Contribution Chart",
          chartText:
            "What GitHub profile doesn&apos;t have a <b>Contribution Chart</b>? I think this is one of the coolest parts of the Welcome Page. However, unlike GitHub&apos;s, my contribution chart isn&apos;t based on actual commits. Instead, it&apos;s an <b>interactive feature</b> where users can write something, which is then mapped into the grid.",
          chartExtra:
            "Users can also <b>change the style</b>, and one of the styles (which I personally find really cool) replaces the blocks with <b>emojis</b> instead.",
          chartManual:
            "Creating this feature required a bit of <b>manual work</b>, as I had to map each letter in JavaScript to display the correct placement on the chart.",
          chartLink: "See example",
        },
        portfolio: {
          title: "Portfolio",
          intro:
            "The <b>Portfolio Page</b> is inspired by GitHub&apos;s repositories page. This is where I showcase my projects. While the design closely resembles GitHub&apos;s, there are <b>clear differences</b>, as I couldn&apos;t fully replicate it due to the lack of certain features that GitHub has. For example, the <b>buttons and filtering</b> at the top are placed differently, and their functionality has been adapted for a portfolio setting.",
          viewSwitch:
            "Users can <b>switch between views</b>, going from the classic GitHub-style repository <b>list view</b> to a <b>grid view</b>. This is something I intentionally redesigned. While it still maintains the GitHub aesthetic, it doesn&apos;t fully copy the repositories page, offering a more visual way to browse projects.",
          projectDetailsTitle: "Project Details",
          projectDetailsIntro:
            "When opening a project, the layout mimics how GitHub displays repositories, with <b>some modifications</b>. For instance, I didn&apos;t implement file/folder navigation like GitHub does, as I felt it was unnecessary for a portfolio. However, I still included a <b>README section</b> and a <b>sidebar</b> that displays project information, such as the technologies and languages used, just like on GitHub.",
          projectScreenshots:
            "Another difference is how I handle <b>project screenshots</b>. Instead of embedding images within the README itself, I created a <b>dedicated tab</b> for project images, keeping them separate from the main content.",
        },
        writings: {
          title: "Writings",
          intro:
            "The <b>Writings Page</b> is where I share my technical content, and it is divided into two sections: <b>Blog</b> and <b>Academic Writings</b>.",
          blogText:
            "The <b>Blog</b> is where I write about development and computer science topics. I enjoy sharing insights, technical deep dives, and best practices.",
          academicText:
            "The <b>Academic Writings</b> section contains my university papers from <b>2021 to 2024</b>. These papers were a significant part of my academic journey, and since many people asked for them, I made them available for download.",
          blogPostTitle: "Blog Post",
          blogPostText:
            "The individual <b>Blog Post</b> pages are heavily inspired by <b>GitHub Blog Posts</b>, featuring a clean and minimal layout with metadata like publish date, tags, and reading time.",
        },
        devQuiz: {
          title: "Dev-Quiz",
          intro:
            "The <b>Dev Quiz</b> is a cool interactive feature of this website, created with the goal of practicing for technical interviews. Personally, I find quizzes and flashcard-style games extremely useful for remembering difficult topics, so I built this hoping others would benefit from it as well.",
          topics:
            "The quiz covers multiple topics, allowing users to choose which category they want to be tested on.",
          number:
            "Users can also select the number of questions, with each one being randomly selected from the available pool.",
          mcq: "The quiz works like any other multiple-choice test: it provides immediate feedback on whether the selected answer is correct or incorrect, along with an explanation.",
          results:
            "At the end of the quiz, users receive their results, showing their score and the time taken to complete the quiz. The score is color-coded: <b>red</b> for low scores, <b>yellow</b> for medium scores, and <b>green</b> for high scores.",
          staticData:
            "Unlike other features, the quiz data is not managed via the CMS. Instead, all questions are stored in JavaScript objects inside an array, grouped in a utility file for easy updates. This makes it much simpler to modify and expand over time.",
          quizLink: "See example",
          note: "Please note that the quiz questions are currently available only in English. The quiz contains more than 450 questions across many topics, and because I handle localization manually, translating every question, along with its correct and incorrect answers, into Italian would be a considerable task. For now, I think it’s reasonable to keep the quiz in English only.",
        },
        discussion: {
          title: "Discussions",
          intro:
            "The <b>Discussions</b> page is designed to mimic <b>GitHub Discussions</b>, which I believe is one of the coolest features of GitHub. The main purpose of this page is to let users leave comments if they want to. Whether it&apos;s something like <i>&quot;Hey, cool portfolio!&quot;</i> or <i>&quot;Maybe you should quit development...&quot;</i> (who knows?).",
          interactions:
            "But beyond just leaving comments, this page offers other interactive features! Users can <b>reply</b> to other comments and even <b>react</b> with a like or emojis. Just like on GitHub!",
          avatars:
            "One of the details to consider is the <b>input field</b>, which looks and functions almost identically to GitHub&apos;s, including <b>Markdown support</b>. However, I added a small twist: the user&apos;s <b>profile picture</b> is <b>randomly generated</b> based on their username using the DiceBear avatar API. Users can also customize their avatar style.",
          backend:
            "As mentioned earlier, this feature was built using <b>Prisma schemas</b> and <b>Supabase</b>, which I had never worked with before this project—making it a great learning experience.",
          comment: "If you think this is a cool feature, drop a comment!",
        },
        contacts: {
          title: "Contacts",
          intro:
            "Honestly, there&apos;s not much to say about this page. It&apos;s a <b>contact form</b>. Wow, what a surprise!",
          text: "I included this so that if you ever feel like reaching out, you can easily do so through the form. It&apos;s a simple contact form built using <b>EmailJS</b>, which I&apos;ve used many times before because it perfectly fits my needs.",
        },
        manupilot: {
          title: "Manupilot AI",
          intro:
            "A cool feature of <b>GitHub</b> is <b>Copilot</b>, so I really wanted to replicate that idea— and that&apos;s how <b>ManuPilot</b> was born.",
          description:
            "Of course, this is just another <b>AI chatbot</b>, but it adds a nice touch to my portfolio since it&apos;s specifically <b>instructed to provide information about me</b>, aside from being a general AI assistant.",
          usage:
            "Powered by <b>OpenAI&apos;s GPT-4</b>, ManuPilot is available in two ways:",
          modes: [
            "<b>Quick Chat</b>: A chat that opens in the <b>bottom-right corner</b> of the website, allowing users to ask quick questions.",
            "<b>ManuPilot Page</b>: A dedicated page where users can interact with the AI in a more immersive way.",
          ],
          additional:
            "Both chats offer a <b>GitHub Copilot-style experience</b>. Currently, the <b>quick chat</b> also allows users to <b>browse projects</b> and talk about them in detail. I plan to bring this feature to the full <b>ManuPilot page</b> in the future, but even now, the AI is <b>instructed to discuss my projects</b>.",
          uploads:
            "In both chats, users can <b>upload code or text files</b> for AI analysis.",
          formatting:
            "The conversation layout closely follows <b>GitHub Copilot&apos;s chat UI</b>. AI responses are properly formatted, with <b>Markdown converted into readable text</b>. The AI can also <b>generate code</b> and <b>return images</b> directly on the screen.",
          closing:
            "Use this AI with caution and <b>stay tuned</b>. This feature is still evolving and will be improved over time!",
        },
        languages: {
          title: "Multilanguage Support",
          intro:
            "The website supports both English and Italian, with seamless switching between the two languages. The default language is detected based on the user's browser settings, but users can manually change it at any time from the navigation bar or sidebar.",
          dynamic:
            "When switching language, both static translations (UI elements) and dynamic CMS content are updated simultaneously for a consistent experience.",
          custom:
            "This was achieved without using heavy i18n libraries. Instead, a lightweight custom Language Context was implemented, alongside locale-specific queries to Contentful.",
          keypoints: [
            "English (en) and Italian (it) are supported.",
            "Default based on browser detection (fallback to English).",
            "Manual switch via buttons.",
            "Full Contentful integration for multilingual fields.",
            "Automatic persistence using cookies and localStorage.",
          ],
          example: "Example:",
        },
      },
      deploymentAndFuturePlans: {
        sectionNumber: "5. Deployment & Future Plans",
        hosting: {
          title: "Hosting & CI/CD",
          p1: "To deploy my website, I chose <b>Vercel</b>. Since Next.js is built by Vercel, it made perfect sense. It provides a seamless deployment experience with automatic optimizations and fast global edge functions. Plus, it takes care of <b>server-side rendering (SSR)</b> and static optimizations without me having to worry about the infrastructure.",
          p2: "The project is hosted directly from <b>GitHub</b>, meaning every time I push changes to the <code>main</code> branch, Vercel automatically builds and deploys the latest version of the site. This makes deployment effortless, and I don't have to manually upload files or restart servers.",
          p3: "In terms of <b>Continuous Integration / Continuous Deployment (CI/CD)</b>, everything runs smoothly with Vercel's automated pipelines. Every commit triggers a new build, and I can preview changes before merging them. If something breaks, I can easily roll back to a previous deployment with a single click.",
          p4: "Overall, Vercel makes my life easier by handling <b>performance optimizations, caching, and CDN distribution</b> automatically. If you're using Next.js, and also, for projects like this one <b>IT'S FREE</b>.",
        },
        futurePlans: {
          title: "What's Next?",
          p1: "Well, as I mentioned before, there are things that <b>need improvement</b>. So if someone asks me <b>\"What's next?\"</b>, my first answer would be that I need to refine what I've already built. There are parts of the project where the <b>code could be optimized</b>, and that's a priority before adding anything new.",
          p2: "Then, there are features that I will continue tweaking over time, making them <b>even closer to GitHub's experience</b>. Some sections are already well done, but others still have room for improvement.",
          p3: "I've also considered adding <b>extra features</b>, but at the end of the day, this is just a portfolio. It's already packed with interactive elements. Some friends suggested adding <b>minigames</b>, but I'm still undecided on that.",
          p4: "One thing that's certain is that I will <b>actively maintain this site</b>. Future plans include:",
          list: [
            "Adding new projects as I build them.",
            "Keeping the <b>blog updated</b>, because having an empty blog makes no sense.",
            "Improving <b>ManuPilot</b> with more features and updates.",
            "Expanding the <b>Dev Quiz</b> as technologies evolve.",
          ],
          p5: "So, the future of this site is all about growth and updates. Some might see that as extra work, but to me, it's a <b>great achievement</b>. I've built a personal site that I actually need to take care of. That means it's not just a static portfolio, but an evolving project.",
        },
      },
      thankYou: {
        title: "Thank You",
        p1: `If you've made it this far, <b>thank you</b> for taking the time
             to read about this website. I hope you found it interesting, and maybe
             even picked up some ideas along the way! This portfolio was a
             <b>fun challenge</b>, and I'll continue improving it over time.`,
        subtitle: "Continue Browsing",
        links: {
          welcome: "Welcome page",
          portfolio: "Explore My Portfolio",
          writings: "Read My Writings",
          devQuiz: "Do a Dev-Quiz",
          discussions: "Join the Discussion",
          contact: "Get In Touch",
          manupilot: "Use ManuPilot AI",
        },
      },
      docFooter: {
        contact: "Contact",
        star: "Give it a star",
        made: "Made by",
      },
    },
    rightBar: {
      title: "What's this?",
      paragraph:
        'Welcome to "About This Website", a behind-the-scenes look at how I built this GitHub-inspired portfolio. If you\'re curious about the design choices, tech stack, or unique features (like the AI chatbot), this is the right place!',
      viewGitHub: "View on GitHub",
      top: "Go to Top",
      bottom: "Go to Bottom",
    },
  },

  it: {
    goBack: "Torna indietro",
    about: "Informazioni su questo sito",
    code: "Codice",
    altBaseString: "Emanuele Sgroi - Info sul sito -",
    navigationMenu: {
      titles: {
        introduction: "Introduzione",
        design: "Design e UI",
        techStack: "Stack Tecnologico",
        features: "Funzionalità",
        deployment: "Deployment e Piani Futuri",
      },
      links: {
        whyBuilt: "Perché l’ho costruito",
        technologiesUsed: "Tecnologie chiave",
        githubStyle: "Ispirazione stile GitHub",
        extractingUI: "Estrarre l’UI di GitHub",
        darkMode: "Modalità scura",
        responsiveness: "Responsività",
        nextjs: "Next.js",
        tailwind: "Tailwind CSS & puro CSS",
        contentful: "Contentful come CMS",
        prisma: "Prisma & Supabase",
        aiIntegration: "Integrazione IA",
        uiFrameworks: "Framework UI",
        welcome: "Benvenuto",
        portfolio: "Portfolio",
        writings: "Articoli",
        devQuiz: "Quiz Dev",
        discussion: "Discussioni",
        contacts: "Contatti",
        manupilot: "ManuPilot AI",
        languages: "Supporto multilingua",
        hosting: "Hosting & CI/CD",
        futurePlans: "E adesso?",
      },
      mobileButton: "Menu di navigazione",
    },

    content: {
      introduction: {
        sectionNumber: "1. Introduzione",
        whyBuilt: {
          title: "Perché l’ho costruito",
          paragraphs: [
            `Avevo già un portfolio, uno dei miei primi progetti React. Era carino, con un bot integrato che fingeva di essere me, ma col tempo l’ho trovato troppo generico. Sembrava uguale a ogni altro portfolio in circolazione, e non è quello che sono. Mi piace fare le cose in modo diverso, creare qualcosa di insolito. <b>Non è proprio questo che rende interessante un portfolio?</b>`,
            `Ho iniziato a cercare ispirazione tra vari portfoli: ingegneri software, UI/UX designer, fotografi, artisti grafici. Molti erano visivamente stupendi, ma nessuno rispecchiava il portfolio che volevo. Mi hanno ispirato non tanto nel design quanto nel concetto: volevo che il mio portfolio sembrasse un vero progetto, non solo una vetrina. <b>Un posto dove interagire, non solo da sfogliare.</b>`,
            `💡 Poi l’illuminazione: <b>GitHub</b>`,
            `Adoro il design minimalista ma efficace di GitHub. È costruito per sviluppatori e, diciamolo onestamente, <b>quale dev non lo ha usato almeno una volta?</b> Ho capito che volevo un portfolio che sembrasse un clone di GitHub: <b>interattivo, intuitivo e dev-friendly</b>.`,
          ],
          keyReasonsTitle: "Perché l’ho realizzato",
          keyReasons: [
            `<b>Mostrare lavori e articoli:</b> è lo scopo principale di un portfolio, ma volevo anche un blog personale per condividere idee.`,
            `<b>Creare qualcosa di dev-friendly (e non solo):</b> ispirato a GitHub, ma navigabile da chiunque.`,
            `<b>Renderlo interattivo:</b> funzioni come ManuPilot, Discussion e Dev-Quiz coinvolgono l’utente e rendono il portfolio un vero progetto in stile GitHub.`,
            `<b>Migliorare le mie competenze:</b> questo progetto mi ha costretto a imparare, risolvere problemi e affinare il workflow.`,
          ],
        },
        technologiesUsed: {
          title: "Tecnologie utilizzate",
          paragraphs: [
            "Per realizzare questo progetto ho usato una combinazione di tecnologie web moderne, librerie e strumenti.",
            "Nelle sezioni successive entrerò nel dettaglio di ognuna.",
          ],
          technologies: [
            "Next.js",
            "CSS",
            "Tailwind CSS",
            "Prisma",
            "Supabase",
            "OpenAI",
            "Contentful CMS",
            "ShadCN",
            "GitHub",
            "Vercel",
          ],
          note: "Il codice sorgente è disponibile sopra. Il progetto è ancora in evoluzione: alcune parti sono già solide, altre richiedono rifiniture. Appena ho tempo continuo a migliorare e ottimizzare il codice.",
        },
      },

      designAndUI: {
        sectionNumber: "2. Design e UI",
        githubStyle: {
          title: "Ispirazione stile GitHub",
          paragraphs: [
            `Come detto nell’introduzione, volevo che il mio portfolio <b>somigliasse a GitHub</b> in <b>layout</b>, <b>colori</b>, <b>font</b> e <b>struttura</b>. Amo il <b>minimalismo di GitHub</b> e, per un portfolio destinato agli sviluppatori, ha perfettamente senso.`,
            `Sebbene il <b>layout</b> sia <b>fortemente ispirato</b>, ho apportato modifiche dove necessario. Non ho tutte le feature di GitHub, ma ho <b>replicato molti elementi UI</b> (bottoni, link, tag...) per offrire un’esperienza familiare.`,
            "Ecco come le sezioni del mio sito mappano su GitHub:",
          ],
          sections: [
            "<b>Pagina Benvenuto</b> → come una <b>pagina profilo</b> di GitHub.",
            "<b>Pagina Portfolio</b> → ispirata alla <b>pagina repository</b> con switch lista/griglia.",
            "<b>Pagina Dettagli sul Progetto</b> → simile a una <b>repository</b> ma senza navigazione file.",
            "<b>Pagina Articoli</b> → un mix tra <b>GitHub Blog</b> e <b>Marketplace</b>.",
            "<b>Pagina Blog Post</b> → ricalcano il layout degli articoli GitHub Blog.",
            "<b>Paginas Quiz Dev</b> → funzione unica ma con UI in stile GitHub.",
            "<b>Discussioni</b> → ricorda un <b>thread Discussion</b> di GitHub.",
            "<b>Contatti</b> → layout tipo pagina profilo.",
            "<b>ManuPilot</b> → quick-chat e pagina dedicata in stile <b>GitHub Copilot</b>.",
            "<b>Menu, Barra Profilo e altri elementi</b> → tutti ispirati a GitHub.",
          ],
        },
        extractingUI: {
          title: "Estrarre l’UI di GitHub",
          paragraphs: [
            "Per ottenere l’aspetto GitHub non mi sono affidato all’occhio: con lo strumento <b>Inspect</b> del browser ho estratto <b>spaziature, font-size, colori, padding, border-radius</b> e così via.",
            "La palette di GitHub è semplice e minimalista, perfetta per mantenere coerenza.",
          ],
          darkModeExample: "Esempio colori sfondo – Dark mode",
          lightModeExample: "Esempio colori sfondo – Light mode",
        },
        darkMode: {
          title: "Modalità scura",
          paragraphs: [
            "A differenza di GitHub, che offre molti temi, io ho mantenuto <b>un solo tema chiaro e uno scuro</b> per semplicità e coerenza.",
          ],
          points: [
            "Il tema segue <b>automaticamente</b> le preferenze di sistema, ma si può cambiare manualmente.",
            "Ho <b>estratto</b> i colori direttamente da GitHub per restare fedele al look.",
            "Massima attenzione a <b>contrasto e leggibilità</b> su entrambi i temi.",
          ],
        },
        responsiveness: {
          title: "Responsività",
          paragraphs: [
            "Il sito è <b>completamente responsivo</b>. Su mobile l’interfaccia si avvicina all’app GitHub, scelta voluta perché… è più cool 😎.",
            "Gli elementi si ridimensionano in modo fluido, seguendo gli stessi principi di GitHub.",
            "La <b>responsività è cruciale</b> e ho curato attentamente ogni breakpoint.",
          ],
        },
      },

      techStack: {
        sectionNumber: "3. Stack Tecnologico",
        nextjs: {
          title: "Next.js",
          paragraphs: [
            "Ho scelto <b>Next.js</b> (App Router) per il suo mix di <b>semplicità, performance e flessibilità</b>. Il bonus SEO non guasta. Le <b>SSR/CSR</b> garantiscono caricamenti rapidi.",
            "Con le <b>API Routes</b> non serve Express: tutto resta in Next.js.",
            "Adoro come l’App Router organizza cartelle e file: sviluppo più scorrevole.",
          ],
          howIUseTitle: "Come sfrutto Next.js",
          howIUsePoints: [
            '<b>Fetch lato server</b> da CMS e OpenAI → pagine più veloci. <span class="text-text-link underline">vedi esempio</span>.',
            "<b>&lt;Image /&gt;</b> per ottimizzare immagini → resize, compressione, formati moderni.",
          ],
          paragraphsAfter: [
            "Uso principalmente <b>SSR</b> e <b>CSR</b>. Avevo valutato SSG ma dati e contenuti sono dinamici (Contentful, Supabase, OpenAI). Più avanti potrei passare a <b>ISR</b> per bilanciare performance e freschezza dei dati.",
          ],
        },
        tailwind: {
          title: "Tailwind CSS & puro CSS",
          paragraphs: [
            "Tailwind è <b>utility-first</b>: meno CSS, stile nei componenti e sviluppo rapido.",
            "Uso <b>globals.css</b> per utilità custom, animazioni e override.",
            "Alcune parti hanno molte media query per fix rapidi: il file è cresciuto, lo ottimizzerò.",
            "Prima i bug, poi l’eleganza: miglioramenti continui in arrivo 🚀.",
          ],
        },
        contentful: {
          title: "Contentful come CMS",
          paragraphs: [
            "Il <b>CMS</b> mi permette di aggiornare i contenuti senza toccare il codice.",
            "Scelto <b>Contentful</b> perché <b>veloce e intuitivo</b>: definisci i content-type in pochi minuti.",
            "Non è usato per tutto, ma gestisce la parte più dinamica del sito.",
          ],
        },
        prisma: {
          title: "Prisma & Supabase",
          paragraphs: [
            "Usati solo per la sezione <b>Discussioni</b>: volevo impararli facendo pratica.",
            "Forse Supabase è overkill per una feature piccola, ma ora ho le basi per futuri sviluppi database-driven.",
          ],
        },
        aiIntegration: {
          title: "Integrazione AI",
          paragraphs: [
            "<b>ManuPilot</b> è l’assistente AI in stile GitHub Copilot: integra l’API OpenAI.",
            "Richieste gestite in <b>streaming</b> via API route server-side → risposta parola per parola.",
            "Gestione rate-limit e sintesi delle conversazioni al superamento dei token.",
          ],
          links: [
            {
              label: "Vedi esempio – Back-end",
              href: "https://github.com/Emanuele-Sgroi/emanuelesgroi.com/blob/main/src/app/api/manupilot/route.js",
            },
            {
              label: "Vedi esempio – Front-end",
              href: "https://github.com/Emanuele-Sgroi/emanuelesgroi.com/blob/main/src/pages/ManuPilotPage.js",
            },
          ],
        },
        uiFrameworks: {
          title: "Framework UI",
          paragraphs: [
            "Per restare vicini al look GitHub ho usato <b>ShadCN</b> e <b>React Icons</b> in tutto il progetto.",
          ],
        },
      },

      /* ───────────────────── Funzionalità ───────────────────── */
      features: {
        sectionNumber: "4. Panoramica delle Funzionalità",
        welcome: {
          title: "Benvenuto",
          intro:
            "La <b>Welcome Page</b> è la home del sito ed è ispirata alla pagina profilo GitHub. Quattro sezioni: <b>Barra Profilo</b>, <b>README</b>, <b>Evidenza</b> e <b>Contribution Chart</b>. La <b>Barra Profilo</b> resta visibile anche nelle altre pagine.",
          profileBarTitle: "Barra Profilo",
          profileBarText:
            "La <b>Barra Profilo</b> riprende quella di GitHub ma senza follower/following. Include <b>foto, nome, professione, breve bio e link social</b>.",
          readmeTitle: "README",
          readmeText:
            "Il <b>README</b> è la sezione <b>About Me</b>: presentazione, background e competenze, proprio come nei profili GitHub.",
          pinnedTitle: "Contentuti in evidenza",
          pinnedText:
            "I contenuti in evidenza, o <b>Pinned Tabs</b>, danno accesso rapido a progetti e sezioni chiave, ispirate ai repository in evidenza di GitHub.",
          chartTitle: "Contribution Chart",
          chartText:
            "Che profilo GitHub sarebbe senza <b>Contribution Chart</b>? Qui è un <b>chart interattivo</b> dove scrivere testo che viene mappato sulla griglia.",
          chartExtra:
            "Si può <b>cambiare stile</b>; uno sostituisce i blocchi con <b>emoji</b>, molto cool.",
          chartManual:
            "Ho dovuto mappare manualmente ogni lettera in JavaScript per posizionarla correttamente.",
          chartLink: "Vedi esempio",
        },

        portfolio: {
          title: "Portfolio",
          intro:
            "La <b>Pagina Portfolio</b> riprende la pagina repository di GitHub. Mostro i miei progetti con alcune <b>differenze</b>: layout dei <b>bottoni/filtri</b> adattato a un portfolio.",
          viewSwitch:
            "Si può <b>cambiare vista</b>: <b>lista</b> stile GitHub o <b>griglia</b> più visiva.",
          projectDetailsTitle: "Dettagli progetto",
          projectDetailsIntro:
            "La pagina progetto imita GitHub con <b>modifiche</b>: niente navigazione file, ma <b>README</b> e <b>sidebar</b> con tecnologie usate.",
          projectScreenshots:
            "Le <b>screenshots</b> sono in una <b>scheda dedicata</b>, non dentro il README.",
        },

        writings: {
          title: "Articoli",
          intro:
            "La pagina <b>Articoli</b> contiene i miei contenuti tecnici, divisa in <b>Blog</b> e <b>Scritti Accademici</b>.",
          blogText:
            "Nel <b>Blog</b> parlo di sviluppo e informatica: approfondimenti, best practice, ecc.",
          academicText:
            "Gli <b>Scritti Accademici</b> raccolgono i miei elaborati universitari <b>2021-2024</b>, disponibili al download.",
          blogPostTitle: "Articolo Blog",
          blogPostText:
            "I singoli <b>Blog Post</b> seguono il layout pulito del <b>GitHub Blog</b> con metadata (data, tag, tempo di lettura).",
        },

        devQuiz: {
          title: "Quiz Dev",
          intro:
            "Il <b>Quiz Dev</b> è un quiz interattivo pensato per prepararsi ai colloqui tecnici.",
          topics:
            "Copre vari argomenti; l’utente sceglie la categoria da testare.",
          number: "Si può scegliere il numero di domande, pescate casualmente.",
          mcq: "Funziona come un test a scelta multipla con feedback immediato e spiegazione.",
          results:
            "A fine quiz si vedono punteggio (rosso/giallo/verde) e tempo impiegato.",
          staticData:
            "Le domande non stanno nel CMS ma in un array JS per aggiornamenti rapidi.",
          quizLink: "Vedi esempio",
          note: "Le domande sono solo in inglese (450+). Tradurle tutte richiederebbe troppo: per ora va bene così.",
        },

        discussion: {
          title: "Discussioni",
          intro:
            "La pagina <b>Discussioni</b> imita le <b>GitHub Discussions</b>. Scopo: permettere commenti—dal <i>«Bello il portfolio!»</i> al <i>«Molla la programmazione…»</i> 😅",
          interactions:
            "Oltre ai commenti, si può <b>rispondere</b> e <b>reagire</b> con emoji/like, proprio come su GitHub.",
          avatars:
            "Il <b>campo input</b> supporta Markdown e genera l’avatar con DiceBear in base all’username (stilizzabile).",
          backend:
            "Costruito con <b>Prisma schemas</b> e <b>Supabase</b>: ottimo esercizio di apprendimento.",
          comment: "Se ti piace questa funzionalitá, lascia un commento!",
        },

        contacts: {
          title: "Contatti",
          intro:
            "Non c’è molto da dire: è un <b>contact form</b>. Sorprendente, vero? 😜",
          text: "Se vuoi contattarmi, compila il form. È fatto con <b>EmailJS</b>, che uso spesso perché fa al caso mio.",
        },

        manupilot: {
          title: "Manupilot IA",
          intro:
            "<b>GitHub Copilot</b> è fantastico: ecco perché è nato <b>ManuPilot</b>.",
          description:
            "È un <b>chatbot IA</b> con istruzioni specifiche per parlare di me, oltre che assistente generico.",
          usage:
            "Basato su <b>GPT-4o di OpenAI</b>, disponibile in due modalità:",
          modes: [
            "<b>Chat Veloce</b>: piccola chat in basso a destra per domande veloci.",
            "<b>Pagina ManuPilot</b>: pagina dedicata per un’esperienza immersiva.",
          ],
          additional:
            "Entrambe le chat emulano l’esperienza <b>GitHub Copilot</b>. La chat veloce consente di <b>sfogliare progetti</b>; porterò la funzione anche nella pagina completa.",
          uploads:
            "Si possono <b>caricare file</b> di codice o testo per l’analisi.",
          formatting:
            "Layout chat simile a Copilot, con Markdown renderizzato. L’IA può <b>generare codice</b> e <b>immagini</b> inline.",
          closing:
            "Usa l’IA con giudizio e <b>resta sintonizzato</b>: migliorie in arrivo!",
        },

        languages: {
          title: "Supporto multilingua",
          intro:
            "Il sito supporta Inglese e Italiano con switch istantaneo. Di default segue la lingua del browser, ma puoi cambiarla dalla navbar o sidebar.",
          dynamic:
            "Sia testi statici che contenuti CMS si aggiornano insieme quando cambi lingua.",
          custom:
            "Senza librerie i18n pesanti: ho usato un <b>Language Context leggero</b> e query Contentful localizzate.",
          keypoints: [
            "Supporto Inglese (en) e Italiano (it).",
            "Default dal browser (fallback en).",
            "Switch manuale via pulsanti.",
            "Integrazione completa con Contentful.",
            "Persistenza con cookie e localStorage.",
          ],
          example: "Esempio:",
        },
      },

      deploymentAndFuturePlans: {
        sectionNumber: "5. Deployment e Piani Futuri",
        hosting: {
          title: "Hosting & CI/CD",
          p1: "Per il deploy uso <b>Vercel</b>: integrazione perfetta con Next.js, ottimizzazioni automatiche e edge functions rapide.",
          p2: "Il progetto è collegato a <b>GitHub</b>: ogni push su <code>main</code> genera automaticamente build e deploy.",
          p3: "Le pipeline <b>CI/CD</b> di Vercel testano ogni commit; posso fare rollback con un click se qualcosa va storto.",
          p4: "Vercel gestisce <b>caching, CDN e performance</b>. E per progetti come questo… <b>è gratis!</b>",
        },
        futurePlans: {
          title: "E adesso?",
          p1: "Prima di tutto devo <b>rifinire</b> ciò che esiste: ottimizzare codice e UI.",
          p2: "Renderò alcune sezioni <b>ancora più simili</b> a GitHub.",
          p3: "Valuto funzionalità extra (qualcuno propone <b>minigiochi</b>), ma è pur sempre un portfolio.",
          p4: "Pianifico di:",
          list: [
            "Aggiungere nuovi progetti quando saranno pronti.",
            "Tenere <b>il blog aggiornato</b>.",
            "Ampliare <b>ManuPilot</b> con nuove feature.",
            "Espandere il <b>Dev-Quiz</b> al passo con le tecnologie.",
          ],
          p5: "Il futuro del sito è crescita costante—un portfolio vivo, non statico.",
        },
      },

      thankYou: {
        title: "Grazie",
        p1: `Se sei arrivato fin qui, <b>grazie</b> per aver letto tutto. Spero tu l’abbia trovato interessante e magari abbia preso qualche spunto! Questo portfolio è stata una <b>bella sfida</b>; continuerò a migliorarlo.`,
        subtitle: "Continua la navigazione",
        links: {
          welcome: "Pagina di Benvenuto",
          portfolio: "Scopri il Portfolio",
          writings: "Leggi i miei Articoli",
          devQuiz: "Prova il Quiz Dev",
          discussions: "Partecipa alle Discussione",
          contact: "Contattami",
          manupilot: "Usa ManuPilot IA",
        },
      },

      docFooter: {
        contact: "Contatti",
        star: "Metti una stella",
        made: "Creato da",
      },
    },

    rightBar: {
      title: "Che cos’è?",
      paragraph:
        "Benvenuto/a in “Info sul Sito”, il dietro le quinte di come ho creato questo portfolio ispirato a GitHub. Se vuoi conoscere scelte di design, stack tecnologico o funzionalitá particolari (come il chatbot IA), sei nel posto giusto!",
      viewGitHub: "Vedi su GitHub",
      top: "Torna su",
      bottom: "Vai giù",
    },
  },
};

export default aboutThisWebsiteTranslation;
