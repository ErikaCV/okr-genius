import { Kdam_Thmor_Pro } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";

const abKdam_Thmor_Proel = Kdam_Thmor_Pro({ 
  weight: "400",
  subsets: ["latin"] });

export const metadata = {
  title: "OKR Genius",
  description: "AI Tool for OKR generation",
};

export default async function RootLayout({ children }) {

  return (
    <html lang="es" data-theme="light">
      <body className={abKdam_Thmor_Proel.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
