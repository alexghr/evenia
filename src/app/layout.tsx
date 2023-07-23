import "./reset.scss";
import "./global.scss";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import PageFooter from "@/components/PageFooter/PageFooter";
import styles from "./layout.module.scss";
import Providers from "@/components/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "600"],
  fallback: ["sans-serif"],
});

export const metadata: Metadata = {
  title: "Evenia",
  description: "Manage your events",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={poppins.className + " " + styles.pageLayout}>
          <div className={styles.stretch}>{children}</div>
          <PageFooter />
        </body>
      </html>
    </Providers>
  );
}
