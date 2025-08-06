// @ts-nocheck
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/(group)/layout";
import UserDropDownButton from "./UserDropDownButton";
import { Search } from "lucide-react";

export default function Header() {
  const { user } = useContext(UserContext);
  const [query, setquery] = useState("");
  const [suggestions, setsuggestions] = useState([]);
  const Router = useRouter();

  const getData = () => {
    if (query.trim()) {
      Router.push(`/search?q=${query}`);
    }
  };

  useEffect(() => {
    async function getsuggestions() {
      const res = await fetch(
        `http://localhost:3000/api/search/suggestion?q=${query}`
      );
      const data = await res.json();
      if (data.success) {
        setsuggestions(data.suggestions);
      } else {
        setsuggestions([]);
      }
    }

    if (query.trim()) {
      getsuggestions();
    } else {
      setsuggestions([]);
    }
  }, [query]);

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex  items-center justify-between">
       
        <Link href="/" className="flex items-center">
          <img src="/logp.svg" alt="Logo" className="w-10 h-10" />
          <span className="text-2xl font-bold text-teal-500">Job Post</span>
        </Link>

        <div className="relative flex-grow mx-4 max-w-xl w-full">
          <div className="flex bg-gray-100 border border-gray-300 rounded-md overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-teal-400">
            <input
              value={query}
              onChange={(e) => setquery(e.target.value)}
              type="text"
              placeholder="Search job title..."
              className="w-full px-3 py-2 text-sm bg-gray-100 text-gray-800 focus:outline-none"
            />
            <button
              onClick={getData}
              className="bg-teal-400 px-6 py-4 text-white hover:bg-teal-700 transition flex items-center justify-center "
              title="Search"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute w-full bg-white shadow-lg mt-1 rounded-md max-h-60 overflow-y-auto border border-gray-200 z-50">
              {suggestions.map((elem) => (
                <p
                  key={elem?.id}
                  className="px-3 py-2 text-sm hover:bg-teal-50 cursor-pointer truncate transition"
                  onClick={() => {
                    setquery(elem.title);
                    setsuggestions([]);
                    Router.push(`/search?q=${elem.title}`);
                  }}
                >
                  {elem?.title}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <UserDropDownButton />
        </div>
      </div>
    </header>
  );
}
