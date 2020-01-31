const updateProgressNumber = (moviesWatched, data) => {
  const dataMovies = data.map(category => category.nominees);
  let flattenedDataMovies = [];
  for (let i = 0; i < dataMovies.length; i++) {
    let current = dataMovies[i];
    for (let j = 0; j < current.length - 1; j++) {
      flattenedDataMovies.push(current[j].movie);
    }
  }
  let number = 0;
  flattenedDataMovies.forEach(movie => {
    if (moviesWatched.indexOf(movie) > -1) {
      number++;
    }
  });

  return number;
};

export default updateProgressNumber;
