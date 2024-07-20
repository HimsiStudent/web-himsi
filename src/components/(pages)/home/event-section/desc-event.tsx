export default function DescEvent({
  event,
}: {
  event: {
    id: number;
    eventName: string;
    url: string;
    logo: string;
    desc: string;
    isFlipped: boolean;
  };
}) {
  return (
    <div className="desc-event">
      <h1>{event.eventName}</h1>
      <p>{event.desc}</p>
    </div>
  );
}
