import Image from "next/image";

export default function PhotoGallery() {
  return (
    <>
      <section className="gallery-container">
        <div className="upper">
          <div className="img-wrapper">
            <Image
              priority
              alt=""
              src="/img/gallery/upper-min.webp"
              width={13390}
              height={600}
            />
          </div>
        </div>
        <div className="lower">
          <div className="img-wrapper">
            <Image
              priority
              alt=""
              src="/img/gallery/lower-min.webp"
              width={13390}
              height={600}
            />
          </div>
        </div>
      </section>
    </>
  );
}
