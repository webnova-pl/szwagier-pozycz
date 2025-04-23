import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="container  flex justify-between items-center">
      <div>
        <Link href={"/"}>
          <img className="h-[115px] w-auto" src="./logo.png" alt="logo" />
        </Link>
      </div>
      <div className="flex space-x-4">
        <button className="bg-primary-100 font-bold rounded-[40px] py-4 px-6 cursor-pointer">
          Wynajmij sprzęt
        </button>
        <button className="bg-dark-100 text-white font-bold rounded-[40px] py-4 px-6 cursor-pointer">
          Skontaktuj się
        </button>
      </div>
    </header>
  );
};

export default Header;
