"use client";

import { useInView } from "react-intersection-observer";

const AnimatedDescription = ({ description }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 1, // Ajusta este valor según tus necesidades
  });

  return (
    <div
      ref={ref}
      className={`flex-1 px-4 text-2xl ${
        inView ? "animate__animated animate__backInUp" : ""
      }`}
    >
      <h2 className="text-left">{description}</h2>
    </div>
  );
};

export default AnimatedDescription;
