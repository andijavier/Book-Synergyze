import React, { useState, useEffect } from 'react';
import Navbar from "@/components/navbar";
import { useRouter } from 'next/router';

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

type State = {
  favorites: Book[];
};

export default function Detail() {
  const router = useRouter();
  const { id } = router.query; // Access the id parameter from the URL
  const { bookData } = router.query; // Access the book data query parameter
  const [state, setState] = useState<State>({
    favorites: [],
  });

  useEffect(() => {
    // Check if localStorage is available (client-side)
    if (typeof window !== 'undefined') {
      // Access localStorage safely
      const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setState({ favorites: storedFavorites });
    }
  }, []);

  function saveFavorites(favorites: Book[]) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  function addToFavorites(book: Book) {
    const updatedFavorites = [...state.favorites, book];
    setState({ favorites: updatedFavorites });
    saveFavorites(updatedFavorites);
    console.log('save to local');
    
  }
  const book = typeof bookData === 'string' ? JSON.parse(bookData) : null;
  return (
    <div className="bg-white">
      <Navbar home={false}/>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex flex-row">
          <div className="basis-1/2">
            {book.volumeInfo.imageLinks && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
            )}
          </div>
          <div className="basis-1/2 p-4">
            <div className="flex justify-end flex-col">
              <div className="flex mb-4 felx-row">
                <div className="basis-1/2 font-bold">ID:</div>
                <div className="basis-1/2 font-semibold">{id}</div>
              </div>
              <div className="flex mb-4 felx-row">
                <div className="basis-1/2 font-bold">TITLE:</div>
                <div className="basis-1/2 font-semibold">{book.volumeInfo.title}</div>
              </div>
              <div className="flex mb-4 felx-row">
                <div className="basis-1/2 font-bold">SUBTITLE:</div>
                <div className="basis-1/2 font-semibold">{book.volumeInfo.subtitle? book.volumeInfo.subtitle : 'Unavailable' }</div>
              </div>
              <div className="flex mb-4 felx-row">
                <div className="basis-1/2 font-bold">PUBLISHER:</div>
                <div className="basis-1/2 font-semibold">{book.volumeInfo.publisher}</div>
              </div>
              <div className="flex mb-4 felx-row">
                <div className="basis-1/2 font-bold">AUTHOR:</div>
                <div className="basis-1/2 font-semibold">{book.volumeInfo.authors?.join(', ')}</div>
              </div>
              <div className="flex mb-4 felx-row">
                <div className="basis-1/2 font-bold">DESCRIPTION:</div>
                <div className="basis-1/2 font-semibold">{book.volumeInfo.description}</div>
              </div>
              <div className="flex mb-4 felx-row">
                <div className="basis-1/2 font-bold">CATEGORIES:</div>
                <div className="basis-1/2 font-semibold">{book.volumeInfo.categories?.join(', ')}</div>
              </div>
              <div className="flex mb-4 felx-row">
                <div className="basis-1/2 font-bold">RATING:</div>
                <div className="basis-1/2 font-semibold">{book.volumeInfo.avarageRating? book.volumeInfo.avarageRating : 'Unvailable' }</div>
              </div>
              
              <button onClick={()=>addToFavorites(book)} className="rounded-full bg-fuchsia-600 text-white">Add to Favorite</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}