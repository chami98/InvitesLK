import type { Metadata } from "next";
import {
  Caveat,
  Cinzel,
  Cormorant,
  DM_Sans,
  Fraunces,
  Great_Vibes,
  Inter,
  Italiana,
  Jost,
  Libre_Baskerville,
  Lora,
  Nunito,
  Outfit,
  Parisienne,
  Playfair_Display,
  Syne,
} from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
});
const cormorant = Cormorant({ subsets: ["latin"], variable: "--font-cormorant" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });
const jost = Jost({ subsets: ["latin"], variable: "--font-jost" });
const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
});
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const italiana = Italiana({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-italiana",
});
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const parisienne = Parisienne({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-parisienne",
});

const fontVariables = [
  playfair.variable,
  lora.variable,
  inter.variable,
  greatVibes.variable,
  cormorant.variable,
  cinzel.variable,
  jost.variable,
  libreBaskerville.variable,
  caveat.variable,
  outfit.variable,
  dmSans.variable,
  fraunces.variable,
  nunito.variable,
  italiana.variable,
  syne.variable,
  parisienne.variable,
].join(" ");

export const metadata: Metadata = {
  title: "InvitesLK",
  description: "Personalized wedding invitation experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full scroll-smooth">{children}</body>
    </html>
  );
}
