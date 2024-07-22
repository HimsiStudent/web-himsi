import Image from "next/image";
import { eventUrl } from "@/app/(pages)/event/data";

export default function EventsContainer() {
  return (
    <>
      <section id="eventPage-container" className="eventPage-container">
        <h1>OUR EVENTS</h1>
        <div className="wrapper-event">
          {eventUrl.map((event, index) => (
            <div key={index} className="event">
              <div className="img-wrapper">
                <Image alt="" src={event.url} width={1920} height={1080} />
              </div>
              <div className="desc-wrapper">
                <div className="title">
                  <h2>{event.name}</h2>
                  <div className="logo-wrapper">
                    {event.logo !== "" && (
                      <Image
                        alt="Logo"
                        src={event.logo}
                        width={1000}
                        height={1000}
                      />
                    )}
                  </div>
                </div>
                <p className="desc">{event.desc}</p>
                {/* <button className="btn-style-1">SEE MORE DETAILS</button> */}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
