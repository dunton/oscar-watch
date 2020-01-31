function filmsWatched(nominees, movies) {
  let number = 0;
  const nomMovies = nominees.map(nom => nom.movie);
  if (movies.length > 0) {
    movies.forEach(movie => {
      if (nomMovies.indexOf(movie) > -1) {
        number++;
      }
    });
    return number;
  }
  return number;
}

export default filmsWatched;
