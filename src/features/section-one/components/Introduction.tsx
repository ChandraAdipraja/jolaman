import clip from "../../../assets/videos/JOLAMAN.mp4";
import thumbnail from "../../../assets/img/JOLAMAN.jpg";
import { useRef, useState } from "react";
export const Introduction = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showControls, setShowControls] = useState(false);
  const handlePlay = () => {
    setShowControls(true);
    videoRef.current?.play();
  };
  return (
    <div className="bg-secondary rounded-4xl">
      <div className="flex flex-col items-center justify-center py-8 px-6 text-justify space-y-5">
        <div className="flex flex-col gap-y-5">
          <h1 className="text-2xl font-semibold text-white ">Apa Itu Pinjol</h1>
          <p className=" font-light text-md text-white">
            Layanan pinjam uang secara online lewat aplikasi atau situs web,
            biasanya dari perusahaan fintech non-bank, dengan proses cepat dan
            mudah.
          </p>
        </div>
        <div className="relative w-full max-w-80 h-40 rounded-2xl overflow-hidden">
          <video
            ref={videoRef}
            src={clip}
            poster={thumbnail}
            controls={showControls}
            className="w-full object-cover h-full"
          />
          {!showControls && (
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center  transition"
            >
              <svg
                className="w-14 h-14 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
