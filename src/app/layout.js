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
import {
  Navbar,
  Footer,
  ChatWidget,
  ChatWidgetWrapper,
  RecaptchaProvider,
} from "@/components";
import { ToastContainer } from "react-toastify";
import { getCurrentLanguageServer } from "@/utils/getCurrentLanguageServer";
import { getDefaultMetadata } from "@/config/metadata";
import { Analytics } from "@vercel/analytics/next";
import GreetingPopup from "@/components/GreetingPopup/GreetingPopup";

// Set default metadata for all pages
export async function generateMetadata() {
  const lang = await getCurrentLanguageServer();
  return getDefaultMetadata(lang);
}

// Lazy load the greeting popup (disabled for SSR)
// const GreetingPopup = dynamic(
//   () => import("@/components/GreetingPopup/GreetingPopup"),
//   {
//     ssr: false,
//   }
// );

export default async function RootLayout({ children }) {
  const lang = await getCurrentLanguageServer(); // "en" | "it"
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
