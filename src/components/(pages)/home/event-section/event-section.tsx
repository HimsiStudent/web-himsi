import MainEvents from "./main-event";

export default function EventSection() {
  return (
    <section id="event">
      <div className="event-container">
        <h1>
          <span className="font-clr-orange">OUR MAIN</span>{" "}
          <span className="font-clr-blue">EVENTS</span>
        </h1>
        <MainEvents />
        <button
          className="btn-style-1"
          onClick={() => {
            window.location.href = "/event";
          }}
        >
          See More Events
        </button>
      </div>
    </section>
  );
}
