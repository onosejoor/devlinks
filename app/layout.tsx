import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toast } from "./_hooks/useToast";

export const metadata: Metadata = {
  title: "DevLinks",
  description: "Your Link sharing platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-veryLightGray p-5`}>
        <NextTopLoader showSpinner={false} color="#633CFF" height={5} />
        <main className="max-w-[1440px] mx-auto ">{children}</main>

        <Toast />
      </body>
    </html>
  );
}
