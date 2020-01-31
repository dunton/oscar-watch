import React, { Component } from "react";
import { Grid, Row } from "react-bootstrap";
import CategoryHolder from "components/CategoryHolder";
import LogoutButton from "components/LogoutButton";
import TimeToOscars from "components/TimeToOscars";
import Header from "components/Header";
import data from "data/";
import filmsWatched from "functions/filmsWatched";
import updateProgressNumber from "functions/updateProgressNumber";
import axios from "axios";
import styled from "styled-components";
import colors from "styles/colors";

const AppWrapper = styled.div`
  background: ${colors.second};
  padding-bottom: 70px;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      activeCategory: null,
      isLoggedIn: false,
      movies: [],
      number: 0,
      userName: null
    };

    this.saveMovieData = this.saveMovieData.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleClick = categoryTitle => {
    this.setState({
      modal: true,
      activeCategory: categoryTitle
    });
  };

  closeModal = e => {
    e.stopPropagation();

    this.setState({
      modal: false
    });
  };

  displayCategories = () => {
    return data.map((dataCategory, i) => {
      const numberWatched = filmsWatched(
        dataCategory.nominees,
        this.state.movies
      );

      return (
        <CategoryHolder
          handleClick={this.handleClick}
          categoryTitle={dataCategory.category}
          key={i}
          nomineeNumber={dataCategory.nominees.length}
          numberWatched={numberWatched}
          countMovies={this.countMovies}
          addMovie={this.addMovie}
          removeMovie={this.removeMovie}
          movies={this.state.movies}
          isLoggedIn={this.state.isLoggedIn}
          saveMovieData={this.saveMovieData}
        />
      );
    });
  };

  saveMovieData = async function() {
    const { movies } = this.state;
    //send api request
    axios
      .post("api/save", movies)
      .then(res => {
        return res;
      })
      .catch(error => console.log(error));

    return;
  };

  addMovie = movieTitle => {
    const addedMovieArray = this.state.movies;
    addedMovieArray.push(movieTitle);
    const number = updateProgressNumber(addedMovieArray, data);

    this.setState({
      movies: addedMovieArray,
      number
    });
  };

  removeMovie = movieTitle => {
    const removedMovieArray = this.state.movies;
    for (let i = 0; i < removedMovieArray.length; i++) {
      if (removedMovieArray[i] === movieTitle) {
        removedMovieArray.splice(i, 1);
      }
    }
    const number = updateProgressNumber(removedMovieArray, data);

    this.setState({
      movies: removedMovieArray,
      number
    });
  };

  countMovies = () => {
    const number = this.props.movies.length;
    this.setState({
      number
    });
  };

  fetchUser = async function() {
    const res = await axios.get("api/current_user");
    let userName, movies, number, isLoggedIn;
    if (res.data.movies !== undefined) {
      userName = res.data.name;
      movies = res.data.movies;
      number = movies.length;
      isLoggedIn = true;
    } else {
      userName = "";
      movies = [];
      number = 0;
      isLoggedIn = false;
    }

    this.setState({
      userName,
      isLoggedIn,
      movies,
      number
    });
    return;
  };

  async componentWillMount() {
    this.fetchUser();
  }

  handleLogout = async function() {
    await axios.get("api/logout");
    this.fetchUser();
  };

  addComponentRows = () => {
    const categories = this.displayCategories();
    let formattedCategories = [];
    for (let i = 0; i < categories.length; i++) {
      if (i % 2 === 0) {
        let content = (
          <Row key={i}>
            {categories[i]}
            {categories[i + 1]}
          </Row>
        );
        formattedCategories.push(content);
      }
    }

    return formattedCategories;
  };

  render() {
    const { modal, movies, userName, isLoggedIn } = this.state;
    const categories = this.addComponentRows();
    return (
      <AppWrapper>
        <Header isLoggedIn={isLoggedIn} movies={movies} userName={userName} />
        <Grid
          fluid
          style={{ backgroundColor: `${colors.second}`, marginTop: 80 }}
        >
          <Row>
            <TimeToOscars />
          </Row>
          {categories}

          <LogoutButton
            isLoggedIn={isLoggedIn}
            handleLogout={this.handleLogout}
            modalActive={modal}
          />
          <Row />
        </Grid>
      </AppWrapper>
    );
  }
}

export default App;
