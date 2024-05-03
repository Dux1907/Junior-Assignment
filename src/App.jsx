import { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./assets/MovieCard";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
const queryClient = new QueryClient();
const App = () => {
  const [data, setData] = useState([]);
  const [val, setVal] = useState("");
  const [characters, setCharacters] = useState([]);
  const hash = import.meta.env.REACT_APP_HASH;
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        let response = await fetch(
          "https://gateway.marvel.com:443/v1/public/characters?ts=1714646378085&apikey=b8b73866993c9c0a583e2a4bf94281e0&hash=6cdc7b145d5292c26954d652742cff33"
        );
        if (!response.ok) throw new Error("Unable to fetch!");
        const marvelCharacters = await response.json();
        console.log(marvelCharacters);
        setCharacters(marvelCharacters);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCharacters();
  }, []);

  const handleSearch = async () => {
    try {
      let response = await fetch(
        "https://gateway.marvel.com:443/v1/public/comics?ts=1714646378085&apikey=b8b73866993c9c0a583e2a4bf94281e0&hash=6cdc7b145d5292c26954d652742cff33"
      );

      if (!response.ok) throw new Error("Unable to fetch!");
      const marvelInfo = await response.json();
      console.log(marvelInfo);
      setData(marvelInfo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <nav className="navbar navbar-expand-sm p-0">
        <div className="container-fluid navbar">
          <a className="navbar-brand" href="#">
            <img src="./src/Marvel_Logo.svg.png" className="marvel-logo" />
          </a>
          <div className="py-2">
            <div className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search for comics..."
                aria-label="Search"
                value={val}
                onChange={(e) => setVal(e.target.val)}
              />
              <button className="btn btn-outline-dark" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            {characters?.data?.results ? (
              <>
                {characters.data.results.map((user, _index) => {
                  return (
                    <>
                      <img
                        src={`${user.thumbnail.path}.jpg`}
                        style={{
                          height: "75px",
                          width: "auto",
                          borderRadius: "50%",
                        }}
                        className="img-fluid"
                      />
                    </>
                  );
                })}
              </>
            ) : (
              <div className="error">
                <h3>{data?.error}</h3>
              </div>
            )}
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {data?.data?.results ? (
        <>
          <h2 className="d-flex justify-content-center">Comics</h2>
          <div className="container-fluid">
            <div className="row justify-content-center text-center ">
              {data.data.results.map((user, index) => {
                return <MovieCard key={index} user={user} />;
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="error">
          <h3>{data?.error}</h3>
        </div>
      )}
    </QueryClientProvider>
  );
};

export default App;
