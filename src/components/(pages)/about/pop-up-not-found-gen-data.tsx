import Image from "next/image";
import { useEffect } from "react";

interface Gen {
  id: number;
  name: string;
  pict: string;
  tagline: string;
  year: any;
  desc: string;
  legacy: string;
  shortLegacy: string;
}

interface TimelineProps {
  gens: Gen[];
}

interface PopUpProps extends TimelineProps {
  isPopUpActive: boolean;
  setPopUpActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PopUpNotFoundGenData({
  isPopUpActive,
  setPopUpActive,
}: PopUpProps) {
  function handleOnClick() {
    setPopUpActive(false);
  }

  useEffect(() => {
    if (isPopUpActive) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isPopUpActive]);

  return (
    <>
      <div className={`notFound-container ${isPopUpActive ? "active" : ""}`}>
        <div className="wrapper">
          <Image
            priority
            alt="Sad Dog"
            src={"/img/sad-dog.webp"}
            width={1000}
            height={1000}
          />
          <p>
            Sorry, we could not find more information related to this generation
            😔
          </p>
          <button className="btn-style-1" onClick={handleOnClick}>
            Oke
          </button>
        </div>
      </div>
    </>
  );
}
