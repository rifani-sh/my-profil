import "./globals.css";

export const metadata = {
  title: "Rifani — Systems Engineer",
  description:
    "Exploring Linux, Cyber Security, AI automation, and modern web technologies. Always curious, always learning.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
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
      <body>{children}</body>
    </html>
  );
}
