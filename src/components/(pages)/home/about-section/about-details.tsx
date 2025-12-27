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
        Building the future with integrity. We integrate honor into every action and strength
        into every collaboration. Based on <span>#HonorInUnityStrengthInSolidarity</span>, we cultivate a
        culture of professional excellence rooted in a strong sense of togetherness, where
        trust, mutual respect, and responsibility guide every decision.
        <br />
        <br />
        United as one, we are committed to continuous innovation and growth together,
        ensuring that every contribution is valued, every relationship is respected, and every
        act of solidarity yields tangible and impactful results.
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
