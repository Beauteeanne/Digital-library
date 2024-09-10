import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const Navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const [actorsArray, setActorsArray] = React.useState([]);
  const [recommend, setRecommend] = React.useState([]);
  const [, setFirstGenre] = React.useState("");
  const [write, setWrite] = React.useState([]);
  const [directors, setDirectors] = React.useState([]);

  const { id } = useParams();

  const FetchMovieDetails = async () => {
    try {
      const Response = await axios.get(
        `https://www.omdbapi.com/?apikey=ec4f496c&i=${id}`
      );

      setData(Response.data);

      const Actorlist = Response.data.Actors.split(", ");
      setActorsArray(Actorlist);

      const genreArray = Response.data.Genre.split(", ");
      setFirstGenre(genreArray[0]);
      FetchRecommended(genreArray[0]);

      const Writers = Response.data.Writer.split(", ");
      setWrite(Writers);

      const Director = Response.data.Director.split(", ");
      setDirectors(Director);
    } catch (error) {
    } finally {
    }
  };

  const AllCast = [
    ...actorsArray.map((actor) => ({ name: actor, role: "Actor" })),
    ...write.map((write) => ({ name: write, role: "Writer" })),
    ...(directors.length > 0
      ? directors.map((director) => ({ name: director, role: "Director" }))
      : []),
  ];

  const FetchRecommended = async (genra) => {
    try {
      const Response = await axios.get(
        `https://www.omdbapi.com/?apikey=ec4f496c&s=${genra}`
      );

      console.log(Response.data.Search);
      setRecommend(Response.data.Search);
    } catch (error) {
    } finally {
    }
  };

  React.useEffect(() => {
    FetchMovieDetails();
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <div className="Content">
        <div className="info-cont">
          <div className="sub-info">
            <div className="w-[70%]">
              <button
                onClick={() => Navigate(-1)}
                type="button"
                className="bk-btn"
              >
                Back
              </button>
              <div className="mt-1 grid gap-1">
                <h2 className="text-white text-3xl font-medium">
                  {data.Title}
                </h2>
                <p className="text-[#ddd] text-base font-normal">
                  {data.Released}
                </p>

                <div className="mt-2.5 grid gap-2">
                  <h3 className="text-white text-2xl font-normal">Overview</h3>
                  <p className="text-[#ddd] opacity-50 text-base font-normal">
                    {data.Plot}
                  </p>
                </div>
              </div>
            </div>

            <div className="card-wrapper">
              <img
                className="card-wrapper-img"
                src={data.Poster}
                alt={data.Title}
              />
              <div className="text-white border border-green-800 rounded-full p-1 text-center absolute left-1 top-1">
                <span className="text-base">{data.imdbRating}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="sub-cont">
          <div className="my-3 grid gap-4">
            <h3 className="text-white text-2xl font-normal">Top Billed Cast</h3>
            <div className="movie-container">
              {AllCast.length > 0 &&
                AllCast.map((person, index) => (
                  <div className="card-wrapper-details" key={index}>
                    <img
                      className="card-wrapper-img"
                      src={data.Poster}
                      alt={data.Title}
                    />
                    <p className="cardTitle mt-2">{person.name}</p>
                    <p className="card-year">{person.role}</p>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h1 className="title">Popular</h1>
            <div className="movie-container">
              {recommend.length > 0 &&
                recommend.map((movie) => (
                  <div
                    // onClick={() => HandleNavigate(movie.imdbID)}
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
      </div>
    </React.Fragment>
  );
};

export default MovieDetails;
