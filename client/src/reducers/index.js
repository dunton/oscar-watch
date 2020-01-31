// main reducers file
import { combineReducers } from "redux";
import movieReducer from "reducers/movieReducer";
import authReducer from "reducers/authReducer";

export default combineReducers({
  movies: movieReducer
  //auth: authReducer
});
