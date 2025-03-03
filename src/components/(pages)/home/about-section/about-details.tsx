import Link from "next/link";

export default function AboutDetails() {
  function handleOnClick() {
    window.location.href = "/about";
  }
  function handleOnClickEvent() {
    window.location.href = "/event";
  }
  return (
    <article className="right">
      <h1 id="tagline">
        <span className="font-clr-blue">#UnitedInHarmony</span>
        <span className="font-clr-orange">ForeverAFamily</span>
      </h1>
      <p>
        We are dedicated to creating unforgettable experiences with both{" "}
        <span>Familialism</span> and <span>professionalism</span> in keeping
        through <span className="font-clr-blue">Kompas Gramedia&apos;s 5C</span>{" "}
        values. <br /> Our journey blends excellence, passion, and commitment,
        leading us to remarkable achievements.
      </p>
      <div className="btn-wrapper">
        <button className="btn-style-1" onClick={handleOnClick}>
          <a>Explore Our Journey</a>
        </button>
        <button onClick={handleOnClickEvent} className="btn-style-1">
          <a>Check Our Events</a>
        </button>
      </div>
    </article>
  );
}
