import dynamic from "next/dynamic";
import "react-circular-progressbar/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "@theme-toggles/react/css/Lightbulb.css";
import "../styles/globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ChatProvider } from "@/context/ChatProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { FullScreenSpinnerProvider } from "@/context/FullScreenSpinnerContext";
import { Navbar, Footer, ChatWidget } from "@/components";
import { ToastContainer } from "react-toastify";
import { defaultMetadata } from "@/config/metadata";
//import { cookies } from "next/headers";
import { getCurrentLanguageServer } from "@/utils/getCurrentLanguageServer";

import TestLanguages from "@/components/TestLanguages";

// Set default metadata for all pages
export const metadata = defaultMetadata;

// Lazy load the greeting popup (disabled for SSR)
const GreetingPopup = dynamic(
  () => import("@/components/GreetingPopup/GreetingPopup"),
  {
    ssr: false,
  }
);

export default function RootLayout({ children }) {
  const lang = getCurrentLanguageServer(); // "en" | "it"
  return (
    <html
      lang={lang === "it" ? "it" : "en"}
      translate={["en", "it"].includes(lang) ? "no" : undefined}
      className="dark"
    >
      <body>
        <ThemeProvider>
          <LanguageProvider initialLanguage={lang}>
            <FullScreenSpinnerProvider>
              <ToastContainer />
              <ChatProvider>
                <GreetingPopup />
                <ChatWidget />
                <Navbar lang={lang} />
                {children}
                <Footer />
              </ChatProvider>
            </FullScreenSpinnerProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
