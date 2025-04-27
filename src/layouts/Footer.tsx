import { CiHome, CiCalculator2, CiBullhorn, CiSearch } from "react-icons/ci";
import { Button } from "../components/ui/button";

export const Footer = () => {
  const menu = [
    { name: "Home", icon: <CiHome className="text-3xl" />, href: "/" },
    {
      name: "Calc",
      icon: <CiCalculator2 className="text-3xl" />,
      href: "/calc",
    },
    {
      name: "Promo",
      icon: <CiBullhorn className="text-3xl" />,
      href: "/promo",
    },
    {
      name: "Search",
      icon: <CiSearch className="text-3xl" />,
      href: "/search",
    },
  ];

  return (
    <footer className="fixed bottom-0 z-40 w-full border-t-2 border-secondary bg-white shadow-lg p-2">
      <div className="flex justify-between px-6 py-2">
        {menu.map((item) => {
          const isActive = location.pathname === item.href;

          return (
            <Button
              key={item.name}
              className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-colors duration-200 ${
                isActive ? "text-secondary" : "text-gray-400"
              }`}
            >
              {item.icon}
              <span className="text-xs font-medium">{item.name}</span>
            </Button>
          );
        })}
      </div>
    </footer>
  );
};
