import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import "react-circular-progressbar/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "@theme-toggles/react/css/Lightbulb.css";
import "../styles/globals.css";
import { SplashScreenProvider } from "@/context/SplashScreenProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ChatProvider } from "@/context/ChatProvider";
import { Navbar, Footer, ChatWidget, ChatFloater } from "@/components";
import { ToastContainer, toast } from "react-toastify";
import SplashScreenWrapper from "@/components/SplashScreen/SplashScreenWrapper";
import { defaultMetadata } from "@/config/metadata";

//export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata = defaultMetadata;

// Dynamically import SplashScreen with ssr: false
// const SplashScreen = dynamic(
//   () => import("@/components/SplashScreen/SplashScreen"),
//   {
//     ssr: false,
//   }
// );

const GreetingPopup = dynamic(
  () => import("@/components/GreetingPopup/GreetingPopup"),
  {
    ssr: false,
  }
);

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="porcodio">
        <ThemeProvider>
          {/* <SplashScreenWrapper> */}
          {/* <SplashScreen /> */}
          <ToastContainer />
          <ChatProvider>
            <GreetingPopup />
            <ChatWidget />
            <Navbar />
            {/* <ChatFloater /> */}
            {children}
            <Footer />
          </ChatProvider>
          {/* </SplashScreenWrapper> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
