"use client";

import { ThemeToggle } from "../theme-toggle";
import HeaderMenu from "../HeaderMenu";

const MainHeader = () => {
  return (
    <nav className="flex !w-screen h-16 items-center justify-end border-b px-8 bg-background">
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <HeaderMenu />
      </div>
    </nav>
  );
};

export default MainHeader;
