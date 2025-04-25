"use client"
import { useState, ChangeEvent, FormEvent } from "react";

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchInput = ({
  placeholder = "Wyszukaj...",
  onSearch,
}: SearchInputProps) => {
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full mt-4 md:w-[342px] min-w-2xs">
      <div className="relative flex items-center ">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_36_985)">
              <path
                d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.8032 15.8034L20.9998 21"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_36_985">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <input
          type="search"
          className="w-full py-3 pl-12 pr-4 bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default SearchInput;
