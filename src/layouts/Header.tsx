import { Toggle } from "../components/ui/toggle";
import { HiMiniBookOpen } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
export const Header = () => {
  const location = useLocation();
  const menu = [
    { name: "Beranda", link: "/" },
    { name: "Hitung", link: "/calc" },
    { name: "Lapor", link: "/report" },
    { name: "Cari", link: "/search" },
  ];
  return (
    <header className="flex gap-x-3 h-16 items-center justify-between border-b-2 border-secondary bg-white px-4 md:h-20 md:px-8 relative">
      <img src="/LOGO JOLAMAN.svg" alt="" width={40} />
      <a
        href={"/"}
        className="text-sm font-bold text-secondary hover:cursor-pointer md:text-3xl"
      >
        JOLAMAN
      </a>
      <div className="flex items-center ml-auto gap-6">
        <nav className="hidden md:flex md:gap-6 items-center">
          {menu.map((item) => (
            <Link
              to={item.link}
              key={item.name}
              className={`text-base font-semibold ${
                location.pathname === item.link
                  ? "text-primary"
                  : "text-secondary"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <a href="/Assets/pdf/guides.pdf" download={true} target="_blank">
          <Toggle
            variant={"outline"}
            className=" border-secondary hover:border-primary group"
          >
            <HiMiniBookOpen className="text-secondary group-hover:text-primary" />
          </Toggle>
        </a>
      </div>
    </header>
  );
};
