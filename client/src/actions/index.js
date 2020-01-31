import {
  ADD_MOVIE,
  REMOVE_MOVIE,
  FETCH_USER,
  SAVE_MOVIES
} from "actions/types";
import axios from "axios";

export const addMovie = movie => {
  return dispatch => {
    dispatch({ type: ADD_MOVIE, payload: movie });
  };
};

export const removeMovie = movie => {
  return dispatch => {
    dispatch({ type: REMOVE_MOVIE, payload: movie });
  };
};

export const fetchUser = movie => {
  console.log("fetchUser action called");
  return async dispatch => {
    const res = await axios.get("/api/current_user");
    dispatch({ type: FETCH_USER, payload: res.data });
  };
};

export const saveMovies = movies => {
  console.log(`movies in store are ${movies}`);
  return dispatch => {
    dispatch({ type: SAVE_MOVIES, payload: movies });
  };
};
