import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchLocationProps {
  onSearch: (location: string) => void;
}

const SearchLocation: React.FC<SearchLocationProps> = ({ onSearch }) => {
  const [search, setSearch] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      onSearch(search.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a city..."
          className="w-full p-4 pl-12 pr-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-weather-primary dark:focus:ring-weather-secondary"
        />
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <button
          type="submit"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-weather-primary dark:bg-weather-secondary text-white rounded-md hover:opacity-90 transition-opacity"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchLocation;