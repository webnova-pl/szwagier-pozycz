import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="container max-md:px-6 flex-col md:flex-row flex justify-between items-center">
      <div>
        <Link href={"/"}>
          <img
            className="md:h-[115px] h-[164px] w-auto"
            src="./logo.png"
            alt="logo"
          />
        </Link>
      </div>
      <div className="flex space-x-4 max-md:w-full">
        <button className="bg-primary-100 font-bold rounded-[40px] py-4 md:px-6 cursor-pointer w-full whitespace-nowrap">
          Wynajmij sprzęt
        </button>
        <button className="bg-dark-100 text-white font-bold rounded-[40px] py-4 md:px-6 cursor-pointer w-full whitespace-nowrap">
          Skontaktuj się
        </button>
      </div>
    </header>
  );
};

export default Header;
