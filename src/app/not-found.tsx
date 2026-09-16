import Image from "next/image";
import Link from "next/link";
import NavigationHeader from "@/components/templates/header";
import Footer from "@/components/templates/footer";
import "./_lib/css/global.css";
import "./_lib/css/animation.css";
import "./_lib/css/media-queries.css";

export default function NotFound() {
  return (
    <>
      <NavigationHeader />
      <section className="notFound-page-container">
        <h1 className="err">ERROR 404 Page Not Found</h1>
        <p>Sorry, the page you were looking for could not be found.</p>
        <Link
          href="/"
          style={{
            marginTop: "24px",
            padding: "10px 24px",
            backgroundColor: "var(--blue-himsi)",
            color: "white",
            borderRadius: "999px",
            textDecoration: "none",
            fontWeight: "600",
            pointerEvents: "auto",
            zIndex: 10,
            boxShadow: "0 4px 12px rgba(38, 70, 133, 0.3)",
          }}
        >
          Back to main page &rarr;
        </Link>
        <Image
          priority
          alt="Sad Husky"
          src={"/img/notFound-img.webp"}
          width={1080}
          height={1080}
        />
      </section>
      <Footer />
    </>
  );
}
