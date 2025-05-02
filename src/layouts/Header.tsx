import { Toggle } from "../components/ui/toggle";
import { HiMiniBookOpen } from "react-icons/hi2";
export const Header = () => {
  const menu = [
    { name: "Home", link: "/" },
    { name: "Calculator", link: "/calc" },
    { name: "Report", link: "/report" },
    { name: "Search", link: "/search" },
  ];
  return (
    <header className="flex h-16 items-center justify-between border-b-2 border-secondary bg-white px-4 md:h-20 md:px-8 relative">
      <a
        href={"/"}
        className="text-sm font-bold text-secondary hover:cursor-pointer md:text-3xl"
      >
        ZOLAMAN
      </a>
      <div className="flex items-center ml-auto gap-6">
        <nav className="hidden md:flex md:gap-6 items-center">
          {menu.map((item) => (
            <a
              href={item.link}
              key={item.name}
              className="text-base font-semibold text-secondary hover:underline"
            >
              {item.name}
            </a>
          ))}
        </nav>
        <a href="/Assets/pdf/guides.pdf" download={true} target="_blank">
          <Toggle variant={"outline"} className=" border-secondary">
            <HiMiniBookOpen className="text-secondary" />
          </Toggle>
        </a>
      </div>
    </header>
  );
};
