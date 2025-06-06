import React, { forwardRef } from "react";
import { Header } from "./Header";
import { cn } from "../lib/utils";
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

    const menu = [
      { name: "Beranda", icon: <CiHome className="text-3xl" />, href: "/" },
      {
        name: "Hitung",
        icon: <CiCalculator2 className="text-3xl" />,
        href: "/calc",
      },
      {
        name: "Lapor",
        icon: <CiBullhorn className="text-3xl" />,
        href: "/report",
      },
      {
        name: "Cari",
        icon: <CiSearch className="text-3xl" />,
        href: "/search",
      },
    ];
    return (
      <div className="h-full w-full max-w-screen-lg mx-auto">
        {withHeader && <Header />}
        <main
          ref={ref}
          className={cn("flex flex-col items-center", className)}
          {...props}
        >
          {children || <Outlet />}
        </main>
        {withFooter && (
          <footer className="md:hidden fixed bottom-0 z-40 w-full border-t-2 border-secondary bg-white shadow-lg p-2">
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
        <footer className="hidden md:flex min-h-16 w-full border-t-2 p-4 bg-white">
          <p className="w-full text-center text-muted-foreground">
            © 2025 Tim Kalkulus II Kelompok 1. Hak cipta dilindungi.
          </p>
        </footer>
      </div>
    );
  }
);

PageContainer.displayName = "PageContainer";
