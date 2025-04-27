import { InfiniteMovingCards } from "../../../components/ui/infinite-moving-cards";
import btcImage from "../../../assets/img/btc.png";
import adakamiImage from "../../../assets/img/adakami.png";
import asetkuImage from "../../../assets/img/asetku.png";
import danain from "../../../assets/img/danain.png";

const CardRecommendations = () => {
  const images = [btcImage, adakamiImage, asetkuImage, danain];

  return (
    <div className="rounded-md flex flex-col items-center justify-center relative overflow-hidden bg-white dark:bg-black dark:bg-grid-white/[0.05]">
      <InfiniteMovingCards images={images} direction="right" speed="slow" />
      <InfiniteMovingCards images={images} direction="left" speed="slow" />
    </div>
  );
};

export default CardRecommendations;
