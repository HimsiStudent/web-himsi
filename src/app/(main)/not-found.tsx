import Image from "next/image";

export default function NotFound() {
  return (
    <>
      <section className="notFound-page-container">
        <h1 className="err">ERROR 404 Page Not Found</h1>
        <p>Sorry, the page you were looking for could not be found.</p>
        <Image
          priority
          alt="Sad Husky"
          src={"/img/notFound-img.webp"}
          width={1080}
          height={1080}
        />
      </section>
    </>
  );
}
