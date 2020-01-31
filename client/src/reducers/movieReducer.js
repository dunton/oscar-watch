import { ADD_MOVIE, REMOVE_MOVIE } from "actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case ADD_MOVIE:
      const addedMovieArray = state;
      addedMovieArray.push(action.payload);
      return addedMovieArray;
    case REMOVE_MOVIE:
      for (let i = 0; i < state.length; i++) {
        if (
          state[i].activeCategory === action.payload.activeCategory &&
          state[i].movieTitle === action.payload.movieTitle
        ) {
          state.splice(i, 1);
        }
      }
      return state;
    default:
      return state;
  }
}
