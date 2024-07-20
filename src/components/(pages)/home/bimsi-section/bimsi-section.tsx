import Image from "next/image";

export default function BimsiSection() {
  return (
    <>
      <section id="bimsi" className="bimsi-container">
        <div className="bimsi-wrapper">
          <div className="bimsi-body">
            <div className="bimsi-logo-wrapper">
              <Image
                src="/LOGO-BIMSI.png"
                alt="Logo BIMSI"
                width={1000}
                height={1000}
                priority={true}
              />
            </div>
            <div className="bimsi-text">
              <h1>BIMBEL HIMSI</h1>
              <p>
                Academic Division work program that facilitates the extended of
                Universitas Multimedia Nusantara Information System students in
                teaching and studying outside of the lecture schedule. With the
                main aim of improving student&apos;s academic abilities and
                providing tutors with teaching experience, this program not only
                creates opportunities for students to study the material in more
                depth, but also enriches their teaching skills. As a result,
                this program has proven successful in becoming a forum for
                developing student&apos;s academic abilities by providing space
                to explore and develop their potential.
              </p>
              <button title="Join Now" className="btn-style-1">
                JOIN NOW
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
