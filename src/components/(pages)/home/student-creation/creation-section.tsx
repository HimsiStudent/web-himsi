import StudentCreation from "./creation/creation1";

export default function HasilKarya() {
  return (
    <>
      <section className="creation-container">
        <h1>
          <span className="font-clr-blue">INFORMATION SYSTEM</span>{" "}
          <span className="font-clr-orange">STUDENT WORKS</span>
        </h1>
        <div className="creation-wrapper">
          <StudentCreation />
        </div>
      </section>
    </>
  );
}
