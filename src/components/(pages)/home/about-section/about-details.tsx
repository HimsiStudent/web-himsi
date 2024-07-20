import Link from "next/link";

export default function AboutDetails() {
  function handleOnClick() {
    window.location.href = "/about";
  }
  return (
    <article className="right">
      <h1 id="tagline">
        <span className="font-clr-blue">#InHarmonia</span>
        <span className="font-clr-orange">AdMeliora</span>
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
          <Link href="/about">Explore Our Journey</Link>
        </button>
        <button onClick={handleOnClick} className="btn-style-1">
          <Link href="/about">Check Our Events</Link>
        </button>
      </div>
    </article>
  );
}
