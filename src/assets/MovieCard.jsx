/* eslint-disable react/prop-types */
import React from "react";
import "../App.css";

const MovieCard = (props) => {
  const { user } = props;
  return (
    <div
      className="col-md-3 col-sm-4 col-5 text-light fs-4 box"
      style={{ marginBottom: "1.4rem", marginTop: "1rem" }}
    >
      {/* <Link to={`/movie/${user.imdbID}`}> */}
      <img
        src={`${user.thumbnail.path}.jpg`}
        style={{ height: "300px", width: "auto", borderRadius: "5px" }}
        className="img-fluid"
      />
      <div className="d-flex justify-content-around text-black">
        <div className="title">{user.title}</div>
        <div className="id">#{user.id}</div>
      </div>

      {/* </Link> */}
    </div>
  );
};

export default MovieCard;
