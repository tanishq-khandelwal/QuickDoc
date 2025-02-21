import React from "react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-6 flex justify-center">
      <input
        type="text"
        placeholder="Search for doctors..."
        className="px-4 py-2 border rounded-md w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-[50rem] focus:outline-none focus:ring-2 focus:ring-gray-600"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
