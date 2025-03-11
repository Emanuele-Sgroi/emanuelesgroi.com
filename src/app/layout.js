import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import "react-circular-progressbar/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "@theme-toggles/react/css/Lightbulb.css";
import "../styles/globals.css";
import { SplashScreenProvider } from "@/context/SplashScreenProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ChatProvider } from "@/context/ChatProvider";
import {
  Navbar,
  Footer,
  ChatWidget,
  SplashScreen,
  ChatFloater,
} from "@/components";
import { ToastContainer, toast } from "react-toastify";

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const GreetingPopup = dynamic(
  () => import("@/components/GreetingPopup/GreetingPopup"),
  { ssr: false }
);

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <ThemeProvider>
          <SplashScreenProvider>
            <SplashScreen />
            <ToastContainer />

            <ChatProvider>
              <GreetingPopup />
              <ChatWidget />
              <Navbar />
              {/* <ChatFloater /> */}
              {children}
              <Footer />
            </ChatProvider>
          </SplashScreenProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
