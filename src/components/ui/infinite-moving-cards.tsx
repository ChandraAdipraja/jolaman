"use client";

import { cn } from "../../lib/utils";
import React, { useEffect, useState } from "react";

interface ImageItem {
  src: string;
  url?: string;
}

export const InfiniteMovingCards = ({
  images,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  images: ImageItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    containerRef.current?.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );
  };

  const getSpeed = () => {
    const duration =
      speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
    containerRef.current?.style.setProperty("--animation-duration", duration);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-[90vw] md:max-w-[60vw] overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {images.map((item, idx) => (
          <li key={idx} className="shrink-0">
            {item.url ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={item.src}
                  alt={`scroll-image-${idx}`}
                  className="w-32 h-32 object-contain rounded-xl border border-neutral-200 dark:border-zinc-700"
                />
              </a>
            ) : (
              <img
                src={item.src}
                alt={`scroll-image-${idx}`}
                className="w-32 h-32 object-contain rounded-xl border border-neutral-200 dark:border-zinc-700"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
