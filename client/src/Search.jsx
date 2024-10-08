const Search = ({ shows, searchInput, setSearchInput, handleSelect,  }) => {
  return (
    <>
      <div className="flex flex-col">
        <div>
          <div className="relative mt-2 mb-5 rounded-md shadow-sm">
            <input
              type="text"
              id="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-center"
              placeholder="Search show"
            ></input>
          </div>
        </div>

        <div>
          {shows?.length > 0 &&
            shows.map(({ name, tvdb_id }, index) => (
              <div
                key={index}
                onClick={() => handleSelect(tvdb_id)}
                className="rounded-md my-3 py-2 bg-slate-950 cursor-pointer hover:bg-black"
              >
                <span className="text-white">{name}</span>
              </div>
            ))}
          {shows?.length === 0 && (
            <div className="mt-4 mb-5">
              <span className="text-slate-300">No results found!</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;