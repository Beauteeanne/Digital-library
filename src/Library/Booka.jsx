import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Booka = () => {
  const Navigate = useNavigate();
  const [books, setBooks] = React.useState([]);
  const [nextPage, setNextPage] = React.useState(null);
  const [prevPage, setPrevPage] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [currentPageUrl, setCurrentPageUrl] = React.useState(
    "https://gutendex.com/books"
  );
  const [loading, setLoading] = React.useState(false);  // New loading state

  const FetchRequest = async (url) => {
    setLoading(true);  // Set loading to true when fetching starts
    try {
      const result = await axios.get(url);
      if (result.data.results.length !== 0) {
        console.log(result.data);
        setBooks(result.data.results);
        setNextPage(result.data.next);
        setPrevPage(result.data.previous);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);  // Set loading to false when fetching is done
    }
  };

  React.useEffect(() => {
    FetchRequest(currentPageUrl);
  }, [currentPageUrl]);

  const handleNextPage = () => {
    if (nextPage) {
      setCurrentPageUrl(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      setCurrentPageUrl(prevPage);
    }
  };

  const filteredStates = books.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.authors[0].name.toLowerCase().includes(search.toLowerCase())
  );

  const HandleNavigate = (id) => {
    Navigate(`/book/details/${id}`);
  };

  return (
    <React.Fragment>
      {/* Ensuring the blue background covers the entire screen */}
      <div className="w-full min-h-screen bg-blue-100 py-10 flex flex-col items-center">
        <nav className="w-full max-w-6xl h-[10vh] flex justify-between items-center px-5">
          <h2 className="text-3xl font-semibold text-indigo-600">BookHunt</h2>
          <div className="relative">
            <input
              className="rounded-full py-2 px-4 outline-none border border-indigo-300 text-base w-[350px] pr-10 shadow-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Search for Book"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </nav>

        {/* Updated Section: Book List Display with Compact White Cards */}
        <div className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {loading ? (
            <p className="text-center text-lg font-medium">Loading...</p>  // Loading indicator
          ) : filteredStates.length > 0 ? (
            filteredStates.map((book) => (
              <div
                key={book.id}
                onClick={() => HandleNavigate(book.id)}
                className="bg-white shadow-lg rounded-lg p-4 transform transition-all hover:scale-105 hover:shadow-2xl cursor-pointer"
              >
                <img
                  src={
                    book.formats["image/jpeg"] ||
                    "https://via.placeholder.com/170x200?text=No+Image"
                  }
                  alt={book.title || "No Title Available"}
                  className="w-full h-[180px] object-cover rounded-md mb-2"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/170x200?text=No+Image";
                  }}
                />
                <div className="py-2 text-center">
                  <h4 className="text-indigo-800 font-semibold text-base mb-1">
                    {book.title || "No Title Available"}
                  </h4>
                  <p className="text-sm text-gray-600 italic">
                    {book.authors && book.authors.length > 0
                      ? book.authors[0].name
                      : "Unknown Author"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-lg font-medium">
              No books available
            </p>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center my-5">
          <button
            onClick={handlePrevPage}
            disabled={!prevPage || loading}  // Disable button when loading
            className={`px-4 py-2 mx-2 border rounded-full ${
              !prevPage || loading
                ? "cursor-not-allowed text-gray-400"
                : "hover:bg-indigo-600 hover:text-white transition-colors"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={!nextPage || loading}  // Disable button when loading
            className={`px-4 py-2 mx-2 border rounded-full ${
              !nextPage || loading
                ? "cursor-not-allowed text-gray-400"
                : "hover:bg-indigo-600 hover:text-white transition-colors"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Booka;
