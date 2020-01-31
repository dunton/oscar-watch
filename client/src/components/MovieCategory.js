import React, { Component } from "react";
import styled from "styled-components";
import colors from "styles/colors";
import data from "data/";
import Movie from "components/Movie";
import { Button } from "react-bootstrap";

const CategoryWrapper = styled.div`
  height: ${props => (props.isOpen ? 500 : 80)}px;
  width: 85%;
  display: flex;
  align-items: center;

  justify-content: space-between;
  font-size: 32px;
  background-color: ${colors.first};
  margin: 20px 0px;
  color: ${colors.fourth};
  font-family: "Open Sans", sans-serif;
  cursor: pointer;
  flex-direction: ${props => (props.isOpen ? "column" : "row")};

  h2 {
    font-size: 20px;
    text-align: center;
    margin: 0 0 0 10px;
  }

  div {
    display: flex;
    align-items: center;
    &.sideHold {
      margin-right: 10px;
      @screen and (max-width: 768px) {
        padding-right: 5px;
      }
    }
    div.chevron {
      transform: rotate(90deg);
      display: block;
      font-size: 60px;
    }
    div.holder {
      display: ${props => (props.isOpen ? "none" : "inline")};
      font-size: 20px;
      margin-right: 10px;
      padding-right: 10px;
    }
  }
`;

const MovieWrapper = styled.div`
  background: #dfc484;
  display: ${props => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  width: 100%;
  overflow: auto;
  height: 80%;
`;

const ButtonHolder = styled.div`
  align-self: center;
  background: #e7d3a2;
  width: 98%;
  margin: 20px 10px;

  button {
    background: none !important;
    color: ${colors.fourth};
    border: none !important;
    margin: 0 auto;
  }

  @media (max-width: 700px) {
    margin-top: 10px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const OpenCategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  height: 68px;

  div.openHolder {
    font-size: 20px;
    display: flex;
    margin-right: 10px;

    div:first-of-type {
      font-size: 20px;
      padding-right: 13px;
    }

    div:nth-of-type(2) {
      font-size: 35px;
      padding-right: 5px;
      color: #a71d31;
    }
  }
`;

class MovieCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  passClick = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
    //handleClick(categoryTitle);
  };

  renderMovies = () => {
    const {
      categoryTitle,
      countMovies,
      addMovie,
      removeMovie,
      movies
    } = this.props;
    return data.map((dataCategory, i) => {
      if (dataCategory.category === categoryTitle) {
        const nominees = dataCategory.nominees;
        return nominees.map((item, i) => {
          return (
            <Movie
              nominee={item.nominee}
              movieTitle={item.movie}
              key={i}
              movies={movies}
              countMovies={countMovies}
              addMovie={addMovie}
              removeMovie={removeMovie}
            />
          );
        });
      }
    });
  };
  renderContent = () => {
    if (this.state.isOpen) {
      return this.renderMovies();
    }
  };
  saveMovieData = () => {
    const { saveMovies, movies } = this.props;
    saveMovies(movies);
  };

  handleSaveButton = e => {
    const { closeModal, saveMovieData, isLoggedIn } = this.props;
    if (!isLoggedIn) {
      alert("LOGIN TO SAVE PROGRESS");
      closeModal(e);
      return;
    }
    saveMovieData();
  };
  renderHeader = () => {
    const {
      categoryTitle,
      handleClick,
      nomineeNumber,
      numberWatched
    } = this.props;
    if (this.state.isOpen) {
      return (
        <CategoryWrapper onClick={this.passClick} isOpen={this.state.isOpen}>
          <OpenCategoryHeader>
            <h2>{categoryTitle}</h2>
            <div className="openHolder sideHold">
              <div>
                {numberWatched}/{nomineeNumber}
              </div>
              <div>&times;</div>
            </div>
          </OpenCategoryHeader>

          <MovieWrapper isOpen={this.state.isOpen}>
            {this.renderContent()}
          </MovieWrapper>
          <ButtonHolder>
            <Button onClick={e => this.handleSaveButton(e)}>
              SAVE PROGRESS
            </Button>
          </ButtonHolder>
        </CategoryWrapper>
      );
    } else {
      return (
        <CategoryWrapper onClick={this.passClick} isOpen={this.state.isOpen}>
          <h2>{categoryTitle}</h2>
          <div className="sideHold">
            <div className="holder">
              {numberWatched}/{nomineeNumber}
            </div>
            <div className="chevron">&#8250;</div>
          </div>
        </CategoryWrapper>
      );
    }
  };
  render() {
    return <Wrapper>{this.renderHeader()}</Wrapper>;
  }
}

export default MovieCategory;
