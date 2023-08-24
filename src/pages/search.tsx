import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { fetchBooks } from './api/books';
import Card from '../components/card'
import SkeletonLoadingList from '@/components/loading';
import Navbar from '@/components/navbar';

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

export default function Search() {
  const router = useRouter();
  const { search } = router.query;
  const { data, isLoading } = useQuery<Book[]>('books', () => fetchBooks(search as string), {
    enabled: !!search, // Prevent initial query execution with an empty search query.
  });

  return (
    <div>
      <Navbar home={false}/>
      {
        isLoading? <SkeletonLoadingList/> :
        <Card books={data}/>
      }
    </div>
  );
}
