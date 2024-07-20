import Image from "next/image";

export default function WhoAreWe() {
  return (
    <>
      <section className="whoAreWe">
        <h1>
          <span className="font-clr-blue">WHO ARE </span>{" "}
          <span className="font-clr-orange">WE?</span>
        </h1>
        <p className="long-desc">
          <b>
            <i>
              &quot;<span className="font-clr-blue">Himpunan Mahasiswa</span>{" "}
              <span className="font-clr-orange">Sistem Informasi</span> &quot;
            </i>
          </b>{" "}
          commonly abbreviated as <b>HIMSI</b>, is an Association of Information
          Systems Students at Universitas Multimeida Nusantara (UMN).
          Established with the mission to provide a comprehensive platform for{" "}
          <b>
            <i>
              &quot;Keluarga Besar Mahasiswa{" "}
              <span className="font-clr-orange">Sistem Informasi</span>&quot;
            </i>
          </b>{" "}
          (KBM SI), HIMSI aims to facilitate the <b>development and support</b>{" "}
          of students in various fields, including{" "}
          <b className="font-clr-blue">academics</b>,{" "}
          <b className="font-clr-orange">non-academics</b>, and other related
          purposes. Through its programs and initiatives, HIMSI seeks to create
          opportunities for students to enhance their <b>knowledge</b> and{" "}
          <b>skills</b>, foster a sense of{" "}
          <b className="font-clr-blue">community</b> and <b>collaboration</b>,
          and prepare them for <b className="font-clr-blue">future careers</b>{" "}
          in the field of information systems. The association is dedicated to
          organizing <b>events</b>, <b>workshops</b>, and <b>activities</b> that
          cater to the diverse interests and needs of its members, ensuring that
          they receive a well-rounded{" "}
          <b className="font-clr-blue">educational experience</b> . HIMSI also
          plays a crucial role in representing the interests of Information
          Systems students within the university, advocating for their needs,
          and contributing to the overall academic and{" "}
          <b>professional environment</b> at UMN.
        </p>
        <p className="short-desc">
          <b>
            <i>
              &quot;<span className="font-clr-blue">Himpunan Mahasiswa</span>{" "}
              <span className="font-clr-orange">Sistem Informasi</span>&quot;
            </i>
          </b>{" "}
          (HIMSI) is an Association of Information Systems Student at
          Universitas Multimedia Nusantara (UMN) supports <i>KBM SI</i>. HIMSI
          enhances <b className="font-clr-blue">academics</b>,{" "}
          <b className="font-clr-orange">non-academics</b>, <b>skills</b>, and
          fosters <b>community</b>. It organizes <b>events</b> and{" "}
          <b>activities</b>, preparing students for{" "}
          <b className="font-clr-blue">future careers</b>, and advocates for
          their needs within UMN.
        </p>

        <Image
          alt="Logo Description"
          src={"/img/logo-details.png"}
          width={1920}
          height={1920}
        />
      </section>
    </>
  );
}
