const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-4 submission">
      <input
        type="text"
        placeholder="Search for stationer item..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded p-2 w-full"
      />
    </div>
  );
};

export default Search;
