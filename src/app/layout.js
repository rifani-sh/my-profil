import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://rifani-sh.vercel.app"),
  title: "Rifani — Systems Engineer",
  description:
    "Exploring Linux, Cyber Security, AI automation, and modern web technologies. Always curious, always learning.",
  keywords: [
    "Rifani",
    "Systems Engineer",
    "Linux",
    "Cyber Security",
    "AI automation",
    "Portfolio",
    "Developer",
  ],
  authors: [{ name: "Rifani" }],
  alternates: {
    canonical: "https://rifani-sh.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  verification: {
    google: "9rdGRAZ0uIz1M7WT_9WcC24L1AcOjPpsw98SXvcY0Yg",
  },
  openGraph: {
    title: "Rifani — Systems Engineer",
    description:
      "Exploring Linux, Cyber Security, AI automation, and modern web technologies.",
    url: "https://rifani.sh",
    siteName: "rifani-sh",
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/89932645?v=4",
        width: 400,
        height: 400,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Rifani — Systems Engineer",
    description:
      "Exploring Linux, Cyber Security, AI automation, and modern web technologies.",
    images: ["https://avatars.githubusercontent.com/u/89932645?v=4"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="9rdGRAZ0uIz1M7WT_9WcC24L1AcOjPpsw98SXvcY0Yg"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
