import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";

export const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div>
        <h1 className="text-5xl md:text-6xl text-center font-semibold text-secondary ">
          J O L <span className="text-primary">A M A N</span>
        </h1>
      </div>
      <div className="px-4">
        <p className="text-center font-light text-md text-secondary md:text-lg">
          Jolaman adalah platform edukasi yang hadir untuk melindungi masyarakat
          dari pinjaman online ilegal. Menyajikan informasi yang jelas, mudah
          dimengerti, serta paham cara menghindari dan melaporkannya. Bareng
          Jolaman, yuk ciptakan kesadaran finansial yang lebih bijak dan aman.
        </p>
      </div>
      <div className="flex gap-4 justify-center">
        <Link to={"/calc"}>
          <Button variant={"outline"} className="text-secondary">
            Hitung
          </Button>
        </Link>
        <Link to={"/search"}>
          <Button
            variant={"secondary"}
            className="hover:bg-orange-500 text-white"
          >
            Cari Pinjol
          </Button>
        </Link>
      </div>
    </div>
  );
};
