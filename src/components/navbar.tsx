import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Popover } from '@headlessui/react'
import Image from "next/image";
import Link from "next/link";

type NavbarProps = {
  home: boolean;
};

export default function Navbar({home}: NavbarProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?search=${searchQuery}`);
  };

  return (
    <header className="bg-white fixed top-0 left-0 right-0 z-10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="m-1.5 p-1.5">
            { home? 
            <Image 
              className="h-8 w-auto" 
              src="/pngwing.com.png" 
              height={144}
              width={144}
              alt="" />
            : null
            }
          </Link>
        </div>
        <Popover.Group className="lg:flex lg:flex-2 lg:gap-x-12">
          <div className="flex items-center border rounded-lg overflow-hidden">
            {home?
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Search..."
                  className="py-2 px-4 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type='submit'
                  className="bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 focus:outline-none"
                >
                  Search
                </button>
              </form>
              :
              <Image 
                className="h-8 w-auto" 
                src="/pngwing.com.png" 
                height={144}
                width={144}
                alt="" />
          }
          </div>
        </Popover.Group>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          { home? 
            <Link href="/favorites" className="text-sm font-semibold leading-6 text-gray-900">
              Favs <span aria-hidden="true">&rarr;</span>
            </Link>
            :
            <Link href="/" className="text-sm font-semibold leading-6 text-gray-900">
              Back to home <span aria-hidden="true">&rarr;</span>
            </Link>
          }
        </div>
      </nav>
    </header>
  )
}
