import "./_lib/css/global.css";
import "./_lib/css/animation.css";
import "./_lib/css/media-queries.css";
import NavigationHeader from "@/components/templates/header";
import Footer from "@/components/templates/footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: { default: "HIMSI UMN", template: "HIMSI | %s" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />

        <link rel="shortcut icon" href="/logo-ico.ico" type="image/x-icon" />
      </head>
      <body>
        <NavigationHeader />
        {children}
        <SpeedInsights />
        <Footer />
      </body>
    </html>
  );
}
