import { Inter } from "next/font/google";
import "../styles/globals.css";
import { SplashScreenProvider } from "@/context/SplashScreenProvider";
import SplashScreen from "@/components/SplashScreen/SplashScreen";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Navbar } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <SplashScreenProvider>
            <SplashScreen />
            <Navbar />
            {children}
          </SplashScreenProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
