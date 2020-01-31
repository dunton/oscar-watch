import React, { Component } from "react";
import styled from "styled-components";
// import { connect } from "react-redux";
// import * as actions from "../actions";
// import { Checkbox } from "react-bootstrap";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import colors from "styles/colors";

const checkBoxStyles = theme => ({
  root: {
    "&$checked": {
      color: "#001427"
    }
  },
  checked: {}
});

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);

const MovieContent = styled.div`
  border-bottom: 1px solid black;
  width: 98%;
  margin: 10px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0px;
  font-family: "Titillium Web", sans-serif;
  color: #001427;
  font-size: 16px;
  .checkbox {
    margin-top: 0;
    margin-bottom: 0;
  }

  @media (max-width: 700px) {
    padding: 5px;
  }
`;

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }
  handleClick = e => {
    e.stopPropagation();
    const { movieTitle } = this.props;
    this.setState(
      prevState => ({
        checked: !prevState.checked
      }),
      () => {
        this.changeMovieStatus(movieTitle);
      }
    );
  };

  changeMovieStatus = movieTitle => {
    const { addMovie, removeMovie } = this.props;
    if (this.state.checked) {
      addMovie(movieTitle);
    } else {
      removeMovie(movieTitle);
    }
  };

  componentWillMount() {
    const { movies, movieTitle } = this.props;
    for (let i = 0; i < movies.length; i++) {
      if (movies[i] === movieTitle) {
        this.setState({ checked: true });
      }
    }
  }

  render() {
    return (
      <MovieContent onClick={this.handleClick}>
        <CustomCheckbox checked={this.state.checked} color="primary" />
        <div>{this.props.nominee}</div>
      </MovieContent>
    );
  }
}

export default Movie;
