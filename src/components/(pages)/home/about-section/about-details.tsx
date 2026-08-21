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
        <span className="font-clr-blue">#HonorInUnity</span>
        <span className="font-clr-orange">StrengthInSolidarity</span>
      </h1>
      <p>
        Building the future with integrity. We bring honor to every action and strength to every collaboration.
        Guided by <span>#HonorInUnityStrengthInSolidarity</span>, we build a culture of excellence based on teamwork,
        where trust, respect, and responsibility drive all our decisions.
        <br />
        <br />
        Driven by StrengthInSolidarity, we are committed to growing and innovating together. We make sure every contribution
        is valued, every relationship is respected, and our teamwork delivers real, positive results.
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
