import dynamic from "next/dynamic";
import "react-circular-progressbar/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "@theme-toggles/react/css/Lightbulb.css";
import "../styles/globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import QuotaProvider from "@/context/QuotaProvider";
import { ChatProvider } from "@/context/ChatProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { FullScreenSpinnerProvider } from "@/context/FullScreenSpinnerContext";
import { Navbar, Footer, ChatWidget, ChatWidgetWrapper } from "@/components";
import { ToastContainer } from "react-toastify";
//import { defaultMetadata } from "@/config/metadata";
//import { cookies } from "next/headers";
import { getCurrentLanguageServer } from "@/utils/getCurrentLanguageServer";
import { getDefaultMetadata } from "@/config/metadata";
import { Analytics } from "@vercel/analytics/next";

// Set default metadata for all pages
export const metadata = getDefaultMetadata(getCurrentLanguageServer());

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
              <QuotaProvider>
                <ChatProvider>
                  <GreetingPopup />
                  {/* <ChatWidget lang={lang} /> */}
                  <ChatWidgetWrapper lang={lang} />
                  <Navbar lang={lang} />
                  {children}
                  <Footer />
                </ChatProvider>
              </QuotaProvider>
            </FullScreenSpinnerProvider>
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
