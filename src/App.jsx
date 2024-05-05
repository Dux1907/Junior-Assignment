/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./assets/MovieCard";
import axios from "axios";
import { Pagination } from "@mui/material";
import { useQuery } from "react-query";

const App = () => {
  const [val, setVal] = useState("");
  const [search, setSearch] = useState(val);
  const [charIds, setCharIds] = useState([]);
  const[data, setData] = useState('')
  const hash = import.meta.env.REACT_APP_HASH;
  const fetchCharacters = async () => {
    return await axios.get(
      "https://gateway.marvel.com:443/v1/public/characters?&ts=1714646378085&apikey=b8b73866993c9c0a583e2a4bf94281e0&hash=6cdc7b145d5292c26954d652742cff33"
    );
  };
  const response = useQuery("characters", fetchCharacters);

  

  const params = {
    limit: 100,
    ts: 1714646378085,
    apikey: 'b8b73866993c9c0a583e2a4bf94281e0',
    hash: '6cdc7b145d5292c26954d652742cff33'
};

if (search != "")
  params.titleStartsWith = search;

if (charIds.length > 0) {
  params.characters = charIds;
}
  const Search = async () => {
    try {
      const response = await axios.get(
          `https://gateway.marvel.com:443/v1/public/comics`,
          {
              params: params
          }
      );
      setVal("");
      console.log('res', response)
      return response.data;
  } catch (error) {
      console.error('Error fetching comics:', error);
      throw error;
  }
  };

  
  const { isLoading, data: dataFetched } = useQuery(["search", charIds, search], Search);

  useEffect(()=>{setData(dataFetched)}
  ,[dataFetched]
  )
  const handleSearch = () => {
    setSearch(val)
    refetch();
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = 5;
  const handlePageChange = (e, p) => {
    setCurrentPage(p);
  };

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
                onChange={(e) => setVal(e.target.value)}
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
                        onClick={()=>{console.log('clicked------>>',data, charIds); setCharIds([...charIds, user.id])}}
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
            {data?.data?.results &&
            data?.data?.results.length > 0 ? (
              <>
                <h2 className="d-flex justify-content-center">Comics</h2>
                <div className="container-fluid">
                  <div className="row justify-content-center text-center ">
                    {data &&
                      data.data.results.map((user, index) => {
                        if (index >= startIndex && index < endIndex) {
                          return <MovieCard key={index} user={user} />;
                        }
                        return null;
                      })}
                  </div>
                </div>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  variant="outlined"
                  shape="rounded"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "2rem",
                  }}
                />
              </>
            ) : data?.data?.results &&
              data?.data?.results.length == 0 ? (
              <h2 className="d-flex justify-content-center mt-5">
                No Comics Found
              </h2>
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