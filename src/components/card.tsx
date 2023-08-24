import React from "react";
import Link from "next/link";

type Book = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail: string;
    };
    publishedDate: string;
  };
};

type CardProps = {
  books?: Book[];
};

export default function Card({books}: CardProps) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Daftar Buku</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {books?.map((book) => (
            <div key={book.id} className="group relative">
                <Link
                  href={{
                    pathname: '/detail/[id]',
                    query: { bookData: JSON.stringify(book) }
                  }}
                  as={`/detail/${book.id}`}
                  key={book.id}
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    {book.volumeInfo.imageLinks && (
                      <img
                        src={book.volumeInfo.imageLinks.thumbnail}
                        alt={book.volumeInfo.title}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                  )}
                  </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <p>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {book.volumeInfo.title}
                      </p>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{book.volumeInfo.authors?.join(', ')}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">Tahun terbit: {book.volumeInfo.publishedDate}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}