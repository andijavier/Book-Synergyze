import React, { useState } from 'react';
import SkeletonLoadingList from '@/components/loading';
import Navbar from '@/components/navbar';
import Card from '../components/card'

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

export default function Favorites() {
  const initialFavorites = JSON.parse(localStorage.getItem('favorites') || '[]') as Book[];
  const [state, setState] = useState<State>({
    favorites: initialFavorites,
  });

  function saveFavorites(favorites: Book[]) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  function removeFromFavorites(bookId: string) {
    const updatedFavorites = state.favorites.filter((book) => book.id !== bookId);
    setState({ favorites: updatedFavorites });
    saveFavorites(updatedFavorites);
  }
  return (
    <div>
      <Navbar home={false}/>
      {
        !state.favorites.length? <SkeletonLoadingList/> :
        <Card books={state.favorites}/>
      }
    </div>
  );
}