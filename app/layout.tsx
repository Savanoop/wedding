import type { Metadata, Viewport } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Anoop & Vishnupriya | Our Ever After", description: "A watercolor storybook wedding invitation for Anoop Vijayan and Vishnupriya, December 6, 2026.", openGraph: { title: "Anoop & Vishnupriya — Wedding Invitation", description: "Our ever after begins here. Join us on December 6, 2026.", type: "website" } };
export const viewport: Viewport = { themeColor: "#fff8ef", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
