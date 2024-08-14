import Link from 'next/link';
import React from 'react';
import { Switch } from './switch/Switch';

export const Navigation = () => {
  return (
    <nav className="mt-2 mb-4 text-base h-6">
      <span className="text-blue-700 font-bold text-lg m-0 dark:text-white mr-4">
        Guild War Analysis
      </span>
      <Link href="/guild-war/top-players" className="mr-2 md:mr-4 text-sm">
        Top Players
      </Link>
      <Link href="/" className="mr-2 md:mr-4 text-sm">
        Guilds
      </Link>
      <span className="sm:block float-right">
        <Switch className="px-2" />
      </span>
    </nav>
  );
};
