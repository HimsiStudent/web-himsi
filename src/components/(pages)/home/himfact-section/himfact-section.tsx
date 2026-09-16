import Link from "next/link";
import ProductDisplay from "./product-display";

export default function HimfactSection() {
  return (
    <section id="himfact">
      <div className="left">
        <h1>
          <span className="font-clr-orange">SI</span>
          <span className="font-clr-blue">BE</span>
        </h1>
        <h2>Student Elegance, Fashion Excellence & Sibe Coffee: A Creative Fusion</h2>
        <p>
          Discover a world where{" "}
          <span className="font-clr-blue">Student Elegance</span> meets{" "}
          <span className="font-clr-blue">Fashion Excellence!</span> Our
          Creative Fusion delivers cutting-edge designs, showcasing the
          brilliance of young minds. Now elevated with{" "}
          <span className="font-clr-orange">Sibe Coffee</span> embrace style
          redefined, where{" "}
          <span className="font-clr-orange">innovation</span> meets fashion
          charm and coffee culture!
        </p>
        <button
          className="btn-style-1"
          onClick={() => {
            window.open("https://instagram.com/sibe_siumn", "_blank");
          }}
        >
          <a>View More Product</a>
        </button>
      </div>
      <div className="right">
        <ProductDisplay />
      </div>
    </section>
  );
}
