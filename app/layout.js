import { Cormorant_Garamond, Nunito } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const sans = Nunito({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Приглашение на свидание 💌",
  description: "У меня есть для тебя кое-что важное…",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffc2d6",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
