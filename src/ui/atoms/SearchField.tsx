"use client"
import { useState, ChangeEvent, useEffect } from "react";

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchInput = ({
  placeholder = "Wyszukaj...",
  onSearch,
}: SearchInputProps) => {
  const [query, setQuery] = useState<string>("");

  // Effect to trigger search when query changes
  useEffect(() => {
    if (onSearch) {
      onSearch(query);
    }
  }, [query, onSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative w-full mt-4 md:w-[342px] min-w-2xs">
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clipPath="url(#clip0_36_985)">
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
          className="w-full py-3 pl-12 pr-4 bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-cancel-button]:relative [&::-webkit-search-cancel-button]:w-5 [&::-webkit-search-cancel-button]:h-5 [&::-webkit-search-cancel-button]:cursor-pointer [&::-webkit-search-cancel-button]:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23000%22%3E%3Cpath%20d%3D%22M19%206.41L17.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z%22%2F%3E%3C%2Fsvg%3E')]"
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SearchInput;