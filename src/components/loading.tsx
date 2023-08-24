import React from 'react';

export default function SkeletonLoadingList() {
  // You can control the number of skeleton items you want to display here
  const numberOfItems = 6;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Daftar Buku</h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {Array.from({ length: numberOfItems }).map((_, index) => (
              <div key={index} className="bg-gray-200 h-80 w-full animate-pulse rounded-md shadow-md">
              {/* Placeholder for image */}
              <div className="h-3/4 bg-gray-300"></div>
        
              {/* Placeholder for text */}
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-300 w-3/4"></div>
                <div className="h-4 bg-gray-300 w-1/2"></div>
                <div className="h-4 bg-gray-300 w-2/3"></div>
              </div>
            </div>
            ))}
          </div>
      </div>
    </div>
  );
};

