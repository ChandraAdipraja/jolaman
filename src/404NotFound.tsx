import { Link } from "react-router-dom";
import Image404 from "./assets/img/404Page.png";
import { Button } from "./components/ui/button";
export const NotFound = () => {
  return (
    <div className="flex md:h-screen items-center justify-center flex-col ">
      <div className="pt-20 md:p-0">
        <img src={Image404} alt="" width={350} />
      </div>
      <div className="absolute bottom-50 md:bottom-40">
        <Link to="/">
          <Button variant={"outline"} className="border-primary text-primary">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
