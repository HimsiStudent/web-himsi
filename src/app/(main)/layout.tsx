import "../_lib/css/global.css";
import "../_lib/css/animation.css";
import "../_lib/css/media-queries.css";
import NavigationHeader from "@/components/templates/header";
import Footer from "@/components/templates/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationHeader />
      {children}
      <Footer />
    </>
  );
}
