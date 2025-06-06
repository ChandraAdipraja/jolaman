import { CiBullhorn } from "react-icons/ci";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";

export const ReportLink = () => {
  return (
    <div className="md:max-w-md md:mx-auto flex flex-col items-center justify-center bg-white border-secondary border-2 p-12 rounded-xl">
      <div className="flex flex-col gap-y-5">
        <CiBullhorn className="-rotate-12 text-primary font-bold text-5xl items-center flex self-center" />
        <h1 className="text-center text-xl font-semibold text-secondary">
          Atau Lapor Di Platform Kami Dibawah
        </h1>
        <div className="flex gap-4 justify-center">
          <Link to={"/report"}>
            <Button
              variant={"outline"}
              className="border-red-500 text-red-500 w-full"
            >
              Lapor
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
