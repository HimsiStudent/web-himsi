export default function creation1() {
  const creation = [
    {
      id: 1,
      url: "/vids/uiux.mp4",
      title: "Website & Mobile Apps",
    },
    {
      id: 2,
      url: "/vids/datvis.mp4",
      title: "Data Visualization",
    },
  ];
  return (
    <>
      {creation.map((creation, i) => (
        <div key={i} className="creation-vid-wrapper">
          <video
            controls={false}
            playsInline
            id={"creation" + creation.id}
            loop={true}
            autoPlay
            muted
          >
            <source src={creation.url} type="video/mp4" />
          </video>
          <h2>{creation.title}</h2>
        </div>
      ))}
    </>
  );
}
