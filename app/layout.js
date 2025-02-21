import { Toaster } from "@/components/ui/sonner"
import "./globals.css";

export const metadata = {
  title: "Book Fair Forms",
  description: "Project is bootstraped using NextJs and Tailwindcss.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
