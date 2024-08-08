import type { Metadata } from "next";
import { Source_Code_Pro } from "next/font/google";
import "../globals.css";
import "../globalicons.css";

const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Visualizador OpenSarc",
  description:
    "Um novo visual para a visualização de horários do OpenSarc da PUCRS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sourceCodePro.className}>{children}</body>
    </html>
  );
}
