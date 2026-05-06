import type { Metadata } from "next";
import "./globals.css";
import { PayPalProviderWrapper } from "@/components/PayPalProviderWrapper";

export const metadata: Metadata = {
  title: "Wealth Builder — AI Financial Trainer",
  description: "Your personal AI financial trainer. Build wealth faster with data-driven guidance and a $49/mo Pro plan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PayPalProviderWrapper>{children}</PayPalProviderWrapper>
      </body>
    </html>
  );
}
