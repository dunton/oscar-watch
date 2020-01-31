import React from "react";
import { Col } from "react-bootstrap";
import MovieCategory from "components/MovieCategory";

const CategoryHolder = props => {
  const {
    handleClick,
    categoryTitle,
    nomineeNumber,
    addMovie,
    removeMovie,
    countMovies,
    movies,
    isLoggedIn,
    saveMovieData
  } = props;
  let { numberWatched } = props;
  if (
    categoryTitle === "Best Supporting Actress" &&
    movies.indexOf("The Favourite") > -1
  ) {
    numberWatched++;
  }
  return (
    <Col md={6} sm={12} style={{ display: "flex", justifyContent: "center" }}>
      <MovieCategory
        categoryTitle={categoryTitle}
        handleClick={handleClick}
        nomineeNumber={nomineeNumber}
        numberWatched={numberWatched}
        addMovie={addMovie}
        removeMovie={removeMovie}
        countMovies={countMovies}
        movies={movies}
        isLoggedIn={isLoggedIn}
        saveMovieData={saveMovieData}
      />
    </Col>
  );
};

export default CategoryHolder;
