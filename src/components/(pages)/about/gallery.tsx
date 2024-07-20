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
              src="/img/gallery/upper.png"
              width={7290}
              height={1110}
            />
          </div>
        </div>
        <div className="lower">
          <div className="img-wrapper">
            <Image
              priority
              alt=""
              src="/img/gallery/lower.png"
              width={7290}
              height={1110}
            />
          </div>
        </div>
      </section>
    </>
  );
}
