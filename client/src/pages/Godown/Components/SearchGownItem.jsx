const SearchGodownItem = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-4 submission">
      <input
        type="text"
        placeholder="Search godown Item..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded p-2 w-full"
        autoFocus
      />
    </div>
  );
};

export default SearchGodownItem;
