import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookDetails = () => {
  const { id } = useParams();
  const [data, setdata] = React.useState([]);
  const [authorName, setAuthorName] = React.useState("");

  const FetchBookDetails = async () => {
    const url = `https://gutendex.com/books/?ids=${id}`;
    await axios
      .get(url)
      .then((result) => {
        if (result.data.results.length > 0) {
          console.log(result.data.results[0].authors[0].name);
          setdata(result.data.results[0]);
        }
        setAuthorName(result.data.results[0].authors[0].name);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  React.useEffect(() => {
    FetchBookDetails();
    // eslint-disable-next-line
  }, [id]);

  const bookImage =
    data.formats && data.formats["image/jpeg"]
      ? data.formats["image/jpeg"]
      : "https://via.placeholder.com/170x200?text=No+Image";

  return (
    <React.Fragment>
      {/* Changed background color to blue */}
      <div className="w-full min-h-screen bg-blue-100 py-10">
        <nav className="w-full h-[10vh] flex justify-between items-center px-5">
          <h2 className="text-3xl font-semibold text-indigo-600">BookHunt</h2>
          <div className="relative">
            <input
              className="rounded-3xl py-2 px-3 outline-none border border-indigo-300 text-base w-[350px] pr-10 hidden lg:block md:block shadow-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Search for Book"
            />
          </div>
        </nav>

        {/* Centered layout for book cover and details */}
        <div className="w-[100%] h-full mt-10 flex flex-col md:flex-row flex-wrap md:space-x-5 mx-4 gap-3 justify-center items-start">
          {/* Pop-up white box with shadow specifically for the book cover */}
          <div className="bg-white shadow-xl rounded-lg p-4 flex justify-center items-center">
            <div className="py-3">
              {data && (
                <img
                  src={bookImage}
                  alt={data.title || "No Title Available"}
                  className="w-[300px] h-[400px] mx-auto rounded-md"
                />
              )}
            </div>
          </div>

          {/* Book text details separated from the book cover pop-up */}
          <div className="py-3 px-4 bg-transparent">
            <h2 className="text-3xl font-semibold mb-4 text-indigo-800">
              {data.title || "No Title Available"}
            </h2>
            <p className="text-lg text-gray-700 mb-2">
              <strong className="text-indigo-600">Author:</strong>{" "}
              {data.authors && data.authors.length > 0
                ? data.authors[0].name
                : "Unknown Author"}
            </p>
            <p className="text-lg text-gray-700 mb-2">
              <strong className="text-indigo-600">Language:</strong>{" "}
              {data.languages ? data.languages[0] : "Unknown"}
            </p>
            <p className="text-lg text-gray-700 mb-4">
              <strong className="text-indigo-600">Download Count:</strong>{" "}
              {data.download_count}
            </p>

            {/* Bookshelves */}
            {data.bookshelves && data.bookshelves.length > 0 && (
              <div className="mt-4">
                <h4 className="text-xl font-semibold text-indigo-800 mb-2">
                  Bookshelves:
                </h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {data.bookshelves.map((shelf, index) => (
                    <li key={index}>{shelf}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Subjects */}
            {data.subjects && data.subjects.length > 0 && (
              <div className="mt-4">
                <h4 className="text-xl font-semibold text-indigo-800 mb-2">
                  Subjects:
                </h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {data.subjects.map((subject, index) => (
                    <li key={index}>{subject}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BookDetails;
