import "./globals.css";
import Spotlight from "@/components/Spotlight";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-white">
        {/* 👇 Mount Spotlight globally */}
        <Spotlight />

        {children}
      </body>
    </html>
  );
}
