import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "OKR Genius",
  description: "AI Tool for OKR generation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" data-theme="light">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
