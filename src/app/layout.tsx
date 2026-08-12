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
          content="width=device-width, initial-scale=1.0, maximum-scale=2.0"
        />
        <meta name="author" content="Samuel Rai Indrawan"></meta>
        <meta name="description" content="HIMSI UMN OFFICIAL WEBSITE"></meta>
        <meta
          name="keywords"
          content="HIMSI, HIMA, Sistem INformasi, UMN, universitas multimedia nusantara,umn, himsi umn, HIMSI UMN, HIMA UMN, prodi si, prodi si umn, si"
        ></meta>
        <link rel="shortcut icon" href="/logo-ico.ico" type="image/x-icon" />
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
