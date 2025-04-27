export const Header = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b-2 border-secondary bg-white px-4 md:h-20 md:px-8 relative">
      <a
        href={"/"}
        className="text-sm font-bold text-secondary hover:cursor-pointer md:text-3xl"
      >
        ZOLAMAN
      </a>
    </header>
  );
};
