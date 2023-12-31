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

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('programming');
  const { search } = router.query;
  const { data, isLoading } = useQuery<Book[]>('books', () => fetchBooks(searchQuery), {
    enabled: !!searchQuery, // Prevent initial query execution with an empty search query.
  });

  useEffect(() => {
    if (search) {
      setSearchQuery(search as string)
      console.log(search);
    }
  }, [search]);

  return (
    <div>
      <Navbar home/>
      {
        isLoading? <SkeletonLoadingList/> :
        <Card books={data}/>
      }
    </div>
  );
}
