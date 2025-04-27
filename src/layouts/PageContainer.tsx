import React, { forwardRef, useState } from "react";
import { Header } from "./Header";
import { cn } from "../lib/utils";
import { GridBackground } from "../components/ui/GridPattern";
import { CiBullhorn, CiCalculator2, CiHome, CiSearch } from "react-icons/ci";
import { Link, Outlet, useLocation } from "react-router-dom";

type PageContainerProps = {
  withHeader?: boolean;
  withFooter?: boolean;
};

export const PageContainer = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & PageContainerProps
>(
  (
    { className, children, withHeader = true, withFooter = true, ...props },
    ref
  ) => {
    const location = useLocation();
    const [active, setActive] = useState("home");

    const menu = [
      { name: "Home", icon: <CiHome className="text-3xl" />, href: "/" },
      {
        name: "Calc",
        icon: <CiCalculator2 className="text-3xl" />,
        href: "/calc",
      },
      {
        name: "Report",
        icon: <CiBullhorn className="text-3xl" />,
        href: "/report",
      },
      {
        name: "Search",
        icon: <CiSearch className="text-3xl" />,
        href: "/search",
      },
    ];
    return (
      <div className="h-full w-full">
        {withHeader && <Header />}
        <main
          ref={ref}
          className={cn("flex flex-col items-center", className)}
          {...props}
        >
          {children || <Outlet />}
        </main>
        {withFooter && (
          <footer className="fixed bottom-0 z-40 w-full border-t-2 border-secondary bg-white shadow-lg p-2">
            <div className="flex justify-between px-6 py-2">
              {menu.map((item) => {
                const isActive = location.pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-colors duration-200 ${
                      isActive ? "text-primary" : "text-gray-400"
                    }`}
                  >
                    {item.icon}
                    <span className="text-xs font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </footer>
        )}
      </div>
    );
  }
);

PageContainer.displayName = "PageContainer";
