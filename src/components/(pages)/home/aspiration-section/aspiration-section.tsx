"use client";

import Image from "next/image";
export default function AspirationSection() {
  return (
    <section id="aspiration">
      <div className="left">
        <Image
          alt="Aspiration"
          width={1080}
          height={1080}
          src={"/img/Aspiration-img.webp"}
        />
      </div>
      <div className="right">
        <div className="text-wrapper">
          <h1>
            <span className="font-clr-orange">#Suarakan</span>
            <span className="font-clr-blue">Aspirasi</span>
          </h1>
          <h2>Together We Speak, Together We Thrive</h2>
          <p>
            The KBM SI <b className="font-clr-blue">Aspiration Form</b> is a
            dedicated platform for Information Systems students at Multimedia
            Nusantara University to voice their{" "}
            <b>opinions, share concerns, and offer suggestions</b>. This ensures
            their voices reach the Information Systems program department,
            fostering a collaborative environment where student feedback shapes
            the future of the program.
          </p>
          <button
            className="btn-style-1"
            onClick={() => {
              window.open(
                "https://forms.cloud.microsoft/pages/responsepage.aspx?id=FfM3v8K6qESubC8hNR0mTLO_N9BphzFGmqlysxWtjflUMzJCUDk5UkE0NjFQUDYyMlpVV1dWNDMyTC4u&route=shorturl",
                "_blank"
              );
            }}
          >
            SUBMIT FORM
          </button>
        </div>
      </div>
    </section>
  );
}
