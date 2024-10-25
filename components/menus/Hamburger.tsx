import React, { useState } from 'react';
import Link from 'next/link';

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between flex-wrap pt-3 pb-2">
      <Link
        href="/"
        className="text-base font-semibold md:mb-1 md:text-lg flex md:w-full items-center flex-shrink-0 text-blue-800 dark:text-white mr-6 md:mr-72 hover:no-underline"
      >
        Popberry Analytics
      </Link>
      <div className="block md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
        >
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? 'hidden' : 'block'}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? 'block' : 'hidden'}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full block flex-grow md:flex md:items-center md:w-auto ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="text-sm md:flex-grow">
          <Link
            href="/guild-war"
            className="block mt-3 md:inline-block md:mt-0 text-white-200 mr-4"
          >
            Guilds
          </Link>
          <Link href="/players" className="block mt-3 md:inline-block md:mt-0 text-white-200 mr-4">
            Player Search
          </Link>
          <div className="relative group inline-block">
            {/* Main navigation link */}
            <span className="hidden md:inline-block text-blue-700 dark:text-blue-400 mr-6 cursor-pointer">
              Leaderboards
            </span>

            {/* Dropdown content */}
            <div className="hidden absolute group-hover:block bg-blue-800 dark:bg-blue-800 shadow-lg z-20">
              <Link
                href="/pixels-highest-skill-levels"
                className="block px-3 py-3 text-sm text-white dark:text-white hover:bg-blue-700"
              >
                Skills
              </Link>
              <Link
                href="/guild-war/top-players"
                className="block px-3 py-3 text-sm text-white dark:text-white hover:bg-blue-700"
              >
                Crop Wars
              </Link>
              <Link
                href="/pixels-barneys-bazaarn-blitz"
                className="block px-3 py-3 text-sm text-white dark:text-white hover:bg-blue-700"
              >
                Bazaarn Blitz
              </Link>
              <Link
                href="/pixels-halloween-event-24"
                className="block px-3 py-3 text-sm text-white dark:text-white hover:bg-blue-700"
              >
                Halloween
              </Link>
            </div>
          </div>
          <Link
            href="/pixels-highest-skill-levels"
            className="-mt-2 block md:hidden md:mt-0 text-white-200 mr-4"
          >
            Skills
          </Link>
          <Link
            href="/guild-war/top-players"
            className="block mt-3 md:hidden md:mt-0 text-white-200 mr-4"
          >
            Crop Wars
          </Link>
          <Link
            href="/pixels-barneys-bazaarn-blitz"
            className="block mt-3 md:hidden mb-2 md:mb-1 md:mt-0 text-white-200 mr-4"
          >
            Bazaarn Blitz
          </Link>
        </div>
        <div></div>
      </div>
    </nav>
  );
};
