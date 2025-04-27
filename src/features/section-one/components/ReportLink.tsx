import { Button } from "../../../components/ui/button";

export const ReportLink = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white border-secondary border-2 p-12 rounded-xl">
      <div className="flex flex-col gap-y-5">
        <h1 className="text-center text-xl font-semibold text-secondary">
          Pernah Melihat Sebuah Website Pinjaman Online Mencurigakan ? Report
          Disini
        </h1>
        <Button variant={"outline"} className="border-red-500 text-red-500">
          Report
        </Button>
      </div>
    </div>
  );
};
