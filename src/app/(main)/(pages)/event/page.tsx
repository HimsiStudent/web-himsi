import EventsContainer from "@/components/(pages)/event/event-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EVENTS",
};

export default function Events() {
  return (
    <>
      <EventsContainer />
    </>
  );
}
