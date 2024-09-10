import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const List = () => {
  const Navigate = useNavigate();
  const [Search, setSearch] = React.useState("");
  const [popular, setPopular] = React.useState([]);
  const [topRated, setTopRated] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);

  let config = {
    header: { "content-type": "multipart/form-data" },
  };

  const FetchRequest = async (genra) => {
    const url = `https://www.omdbapi.com/?apikey=ec4f496c&s=${genra}`;
    await axios
      .get(url, config)
      .then((result) => {
        if (result.data.length !== 0) {
          genra === "horror"
            ? setPopular(result.data.Search)
            : setTopRated(result.data.Search);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  console.log("Popular: ", popular);
  console.log("Rated: ", topRated);

  React.useEffect(() => {
    FetchRequest("horror");
    FetchRequest("action");
  }, []);

  const AllMovies = [...popular, ...topRated];

  // Handle search logic
  const HandleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    if (query.length > 0) {
      const FilteredMovies = AllMovies.filter(
        (movie) =>
          movie.Title.toLowerCase().includes(query) ||
          movie.Year.toLowerCase().includes(query)
      );
      setFilteredMovies(FilteredMovies);
    } else {
      setFilteredMovies([]);
    }
  };

  const HandleNavigate = (id) => {
    Navigate(`/movie/info/${id}`);
  };

  return (
    <React.Fragment>
      <div className="w-100 h-100">
        <div className="topbar">
          <div className="search-area">
            <input
              type="text"
              className="search-input"
              value={Search}
              onChange={HandleSearch}
              placeholder="Search movies..."
            />
            <button className="white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-x text-white"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
        </div>

        {Search.length > 0 && (
          <div className="main-content">
            <div className="search-wrapper">
              {filteredMovies.length > 0 ? (
                filteredMovies.map((movie) => (
                  <a
                    key={movie.imdbID}
                    onClick={() => HandleNavigate(movie.imdbID)}
                    className="search-b"
                  >
                    {movie.Title} <span>{movie.Year}</span>
                  </a>
                ))
              ) : (
                <p>No movies found.</p>
              )}
            </div>
          </div>
        )}

        {Search.length === 0 && (
          <div className="main-content">
            <div>
              <h1 className="title">Popular</h1>
              <div className="movie-container">
                {popular.map((movie) => (
                  <div
                    onClick={() => HandleNavigate(movie.imdbID)}
                    className="card-wrapper"
                    key={movie.imdbID}
                  >
                    <img
                      className="card-wrapper-img"
                      src={movie.Poster}
                      alt={movie.Title}
                    />
                    <h5 className="card-title">{movie.Title}</h5>
                    <p className="card-year">{movie.Year}</p>
                    <div className="text-white border border-green-800 rounded-full p-1 text-center absolute left-1 top-1">
                      <span className="text-base">10</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="title">Top Rated</h3>
              <div className="movie-container">
                {topRated.map((movie) => (
                  <div
                    onClick={() => HandleNavigate(movie.imdbID)}
                    className="card-wrapper"
                    key={movie.imdbID}
                  >
                    <img
                      className="card-wrapper-img"
                      src={movie.Poster}
                      alt={movie.Title}
                    />
                    <h5 className="card-title">{movie.Title}</h5>
                    <p className="card-year">{movie.Year}</p>
                    <div className="text-white border border-green-800 rounded-full p-1 text-center absolute left-1 top-1">
                      <span className="text-base">10</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default List;
