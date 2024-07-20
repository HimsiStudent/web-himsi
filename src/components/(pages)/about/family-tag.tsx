import React, { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import { useInView } from "react-intersection-observer";

const FamilyTagline: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    setStartTyping(inView);
  }, [inView]);

  return (
    <section className="fam-tag-container" ref={ref}>
      <blockquote>
        <q>
          {startTyping && (
            <Typewriter
              words={["Every Family Has a Story, Welcome to Ours!"]}
              loop={1}
              cursor
              cursorStyle="_"
              typeSpeed={50}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          )}
        </q>
      </blockquote>
    </section>
  );
};

export default FamilyTagline;
