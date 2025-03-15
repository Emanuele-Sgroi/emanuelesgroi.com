import dynamic from "next/dynamic";
import "react-circular-progressbar/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "@theme-toggles/react/css/Lightbulb.css";
import "../styles/globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ChatProvider } from "@/context/ChatProvider";
import { Navbar, Footer, ChatWidget } from "@/components";
import { ToastContainer } from "react-toastify";
import { defaultMetadata } from "@/config/metadata";

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
  return (
    <html lang="en" className="dark">
      <body>
        <ThemeProvider>
          <ToastContainer />
          <ChatProvider>
            <GreetingPopup />
            <ChatWidget />
            <Navbar />
            {children}
            <Footer />
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
