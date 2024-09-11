import Link from 'next/link';
import React from 'react';
import { Switch } from './switch/Switch';

export const Navigation = () => {
  return (
    <nav className="mt-2 mb-4 text-base h-6">
      <span className="text-base mr-2 text-blue-700 font-bold sm:text-lg m-0 dark:text-white sm:mr-4">
        Pixels Event Stats
      </span>
      <Link href="/players" className="mr-2 md:mr-4 text-sm">
        Players
      </Link>
      <Link href="/guild-war" className="text-sm">
        Guilds
      </Link>
      <span className="sm:block float-right">
        <Switch className="px-2" />
      </span>
    </nav>
  );
};
