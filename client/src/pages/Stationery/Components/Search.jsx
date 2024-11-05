const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-4 submission">
      <input
        type="text"
        placeholder="Search for animal food..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded p-2 w-full"
      />
      <a
        href="#"
        className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded"
      >
        Search
      </a>
    </div>
  );
};

export default Search;
