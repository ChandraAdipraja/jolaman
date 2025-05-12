import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";

export const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div>
        <h1 className="text-5xl md:text-6xl text-center font-semibold text-secondary">
          JOL <span className="text-primary">JOL</span> JOL
          <span className="text-primary"> PINJOL</span>
        </h1>
      </div>
      <div className="px-9">
        <p className="text-center font-light text-md text-secondary md:text-lg">
          Anomali pinjol yang suka nawarin pinjaman dengan suku bunga yang gede
          namun tidak sesuai dengan hasil akhirnya, ketahui mana pinjol aman dan
          tidak aman, ketahui juga suku bunga yang anda dapatkan
        </p>
      </div>
      <div className="flex gap-4 justify-center">
        <Link to={"/calc"}>
          <Button variant={"outline"} className="text-secondary">
            Calculate
          </Button>
        </Link>
        <Link to={"/search"}>
          <Button
            variant={"secondary"}
            className="hover:bg-orange-500 text-white"
          >
            Search Pinjol
          </Button>
        </Link>
      </div>
    </div>
  );
};
