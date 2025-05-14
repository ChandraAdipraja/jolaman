import { InfiniteMovingCards } from "../../../components/ui/infinite-moving-cards";
import adakamiImage from "../../../assets/img/adakami.png";
import asetkuImage from "../../../assets/img/asetku.png";
import bantuSaku from "../../../assets/img/bantusaku.png";
import easyCash from "../../../assets/img/easycash.png";
import gandengTangan from "../../../assets/img/gandengtangan.png";
import indoDana from "../../../assets/img/indodana.png";
import krediFazz from "../../../assets/img/kredifazz.png";
import krediPro from "../../../assets/img/kreditpro.png";
import pinjamYuk from "../../../assets/img/pinjamyuk.png";
import danain from "../../../assets/img/danain.png";

const CardRecommendations = () => {
  const PinjolsWithUrl = [
    {
      src: pinjamYuk,
      url: "https://www.pinjamyuk.co.id/",
    },
    {
      src: danain,
      url: "https://www.danain.com/",
    },
    {
      src: adakamiImage,
      url: "https://www.adakami.id/",
    },
    {
      src: asetkuImage,
      url: "https://www.asetku.co.id/",
    },
    {
      src: bantuSaku,
      url: "https://bantusaku.id/",
    },
    {
      src: easyCash,
      url: "https://www.easycash.id/",
    },
    {
      src: gandengTangan,
      url: "https://www.gandengtangan.co.id/id",
    },
    {
      src: indoDana,
      url: "https://www.indodana.id/",
    },
    {
      src: krediFazz,
      url: "https://kredifazz.id/",
    },
    {
      src: krediPro,
      url: "https://kreditpro.id/en/",
    },
  ];

  return (
    <div className=" rounded-md flex flex-col items-center justify-center relative overflow-hidden bg-white dark:bg-black dark:bg-grid-white/[0.05]">
      <InfiniteMovingCards
        images={PinjolsWithUrl}
        direction="right"
        speed="slow"
      />
      <InfiniteMovingCards
        images={PinjolsWithUrl}
        direction="left"
        speed="slow"
      />
    </div>
  );
};

export default CardRecommendations;
