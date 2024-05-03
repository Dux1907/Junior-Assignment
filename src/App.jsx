import { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./assets/MovieCard";
import axios from "axios";
import { useQuery } from "react-query";

const App = () => {
  const [val, setVal] = useState("");
  const hash = import.meta.env.REACT_APP_HASH;

  useEffect(() => {}, []);
  const fetchCharacters = async () => {
    return  await axios.get(
      "https://gateway.marvel.com:443/v1/public/characters?ts=1714646378085&apikey=b8b73866993c9c0a583e2a4bf94281e0&hash=6cdc7b145d5292c26954d652742cff33"
    );
  };
  const response= useQuery("characters", fetchCharacters);
  
    const fetchComics = async () => {
      return  await axios.get(
        'https://gateway.marvel.com:443/v1/public/comics?ts=1714646378085&apikey=b8b73866993c9c0a583e2a4bf94281e0&hash=6cdc7b145d5292c26954d652742cff33'
      );
    };

    const handleSearch = () =>{
      refetch()
    }
    const {isLoading,data,refetch}  = useQuery("comics", fetchComics);
    console.log(data)
       // const handleSearch = () =>{
    //   refetch()
    // }
    // const Search = async () => {
    //   return  await axios.get(
    //     `https://gateway.marvel.com:443/v1/public/comics?ts=1714646378085&apikey=b8b73866993c9c0a583e2a4bf94281e0&hash=6cdc7b145d5292c26954d652742cff33`
    //   );
    // };
    //  const searchQuery = useQuery("search", Search);
    //  console.log(searchQuery)
  return (
    <>
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
              <button className="btn btn-outline-dark" onClick = {handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            {response?.data?.data?.data?.results ? (
              <>
                {response.data.data.data.results.map((user, _index) => {
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
      
      <>
    {isLoading ? (
      <h2 className="d-flex justify-content-center">Loading...</h2>
    ) : (
      <>
        {data?.data?.data?.results ? (
          <>
            <h2 className="d-flex justify-content-center">Comics</h2>
            <div className="container-fluid">
              <div className="row justify-content-center text-center ">
                {data.data.data.results.map((user, index) => (
                  <MovieCard key={index} user={user} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="error">
            <h3>{data?.error}</h3>
          </div>
        )}
      </>
    )}
  </>
    </>
  );
};

export default App;
