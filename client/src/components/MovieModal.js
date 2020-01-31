import React, { Component } from "react";
import Movie from "components/Movie";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import colors from "styles/colors";

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: ${colors.second};
  top: 0;
  display: flex;
  justify-content: center;
  z-index: 0;
`;

const Modal = styled.div`
  width: 70%;
  height: 80%;
  position: absolute;
  background: #283655;
  top: calc(80px + 4%);
  border-radius: 10px;

  @media (max-width: 700px) {
    margin-top: 30px;
    width: 90%;
    height: 75%;
  }
`;

const CategoryContent = styled.div`
  display: flex;
  justify-content: center;
  color: ${colors.fourth};
  margin-top: 10px;
`;

const CloseButton = styled.div`
  color: ${colors.fourth};
  justify-self: flex-end;
  top: 0;
  right: 0;
  position: absolute;
  font-size: 35px;
  margin-right: 5px;
  margin-top: -3px;
  font-family: "Titillium Web", sans-serif;
`;

const MovieWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-family: "Titillium Web", sans-serif;
  max-height: 70%;
  overflow-y: auto;

  > div {
    width: 80%;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  font-family: "Titillium Web", sans-serif;
`;

const ButtonHolder = styled.div`
  align-self: center;
  margin-top: 20px;

  button {
    border-radius: 10px;
  }

  @media (max-width: 700px) {
    margin-top: 10px;
  }
`;

class MovieModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieTitles: []
    };
  }
  addMovieData = () => {
    const {
      data,
      isActive,
      activeCategory,
      movies,
      countMovies,
      addMovie,
      removeMovie
    } = this.props;
    if (isActive) {
      return data.map((dataCategory, i) => {
        if (dataCategory.category === activeCategory) {
          const nominees = dataCategory.nominees;
          return nominees.map((item, i) => {
            return (
              <Movie
                nominee={item.nominee}
                movieTitle={item.movie}
                key={i}
                movies={movies}
                activeCategory={activeCategory}
                countMovies={countMovies}
                addMovie={addMovie}
                removeMovie={removeMovie}
              />
            );
          });
        }
      });
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
    closeModal(e);
    saveMovieData();
  };
  render() {
    const { isActive, activeCategory, closeModal } = this.props;
    if (isActive) {
      return (
        <ModalWrapper onClick={e => closeModal(e)}>
          <Modal>
            <CategoryWrapper onClick={e => e.stopPropagation()}>
              <CategoryContent>
                <div>
                  <h2>{activeCategory}</h2>
                </div>
              </CategoryContent>
              <CloseButton onClick={e => closeModal(e)}>&#10006;</CloseButton>
              <MovieWrapper>
                <div>{this.addMovieData()}</div>
              </MovieWrapper>
              <ButtonHolder>
                <Button onClick={e => this.handleSaveButton(e)}>
                  SAVE PROGRESS
                </Button>
              </ButtonHolder>
            </CategoryWrapper>
          </Modal>
        </ModalWrapper>
      );
    }
    return <div />;
  }
}

export default MovieModal;
