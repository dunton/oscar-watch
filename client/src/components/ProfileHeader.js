import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import colors from "styles/colors";
import data from "data/";

const ProfileWrapper = styled.div`
  width: 100%;
  height: 80px;
  background: ${colors.third};
  color: ${colors.fourth};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  position: relative;
  z-index: 10;
  flex-direction: row;
  font-family: "Titillium Web", sans-serif;

  .name {
    margin-right: 10px;
    margin-bottom: 0px;
  }
`;

const ButtonHolder = styled.div`
  justify-self: flex-end;
  font-size: 16px;
  span {
    margin-right: 5px;
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  @media screen and (max-width: 768px) {
    margin-top: 4px;
  }
  button {
    margin-right: 10px;
    border: 2px solid transparent;
    background: ${colors.first} !important;
    font-size: 16px;

    :hover {
      background: ${colors.fourth} !important;
      border: 2px solid ${colors.first};
      a {
        color: ${colors.first} !important;
        text-decoration: none !important;
      }
    }

    @media (max-width: 700px) {
      padding: 3px 12px;
      margin-bottom: 5px;
    }
  }

  @media (max-width: 700px) {
    display: inline-flex;
    flex-direction: column;
  }
`;

const MovieMathHolder = styled.div`
  margin: 0 auto 0 10px;
  background: #dfc484;

  @media screen and (max-width: 768px) {
    background: inherit;
  }
  p {
    margin: 0 0 0 10px;
    padding: 10px;
    font-size: 16px;

    @media screen and (max-width: 768px) {
      padding: 5px;
    }

    span {
      color: #a71d31;
    }
  }
`;

const ProfileHeader = props => {
  const renderContent = () => {
    const { isLoggedIn, userName } = props;
    switch (isLoggedIn) {
      case null:
        return;
      case false:
        return (
          <ButtonHolder>
            <span>SIGN IN WITH:</span>
            <Button bsStyle="primary">
              <a href="auth/google" style={{ color: `${colors.fourth}` }}>
                Login With Google
              </a>
            </Button>
            <Button bsStyle="primary">
              <a href="auth/facebook" style={{ color: `${colors.fourth}` }}>
                Login With Facebook
              </a>
            </Button>
          </ButtonHolder>
        );
      case true:
        return <p className="name">{userName}</p>;
      default:
        return;
    }
  };
  let flattenedAllMovies;
  const numberOfMoviesWatched = (movies, data) => {
    let value = 0;
    flattenedAllMovies = [];
    data.forEach(movieCategory => {
      movieCategory.nominees.forEach(nom => flattenedAllMovies.push(nom.movie));
    });
    flattenedAllMovies.forEach(nom => {
      if (movies.indexOf(nom) > -1) {
        value++;
      }
    });
    return value;
  };
  const content = renderContent(props);
  const number = numberOfMoviesWatched(props.movies, data);
  const movieMath =
    +(Math.round((number / flattenedAllMovies.length) * 100 + "e+2") + "e-2") +
    "%";
  return (
    <ProfileWrapper>
      <MovieMathHolder>
        <p>
          TOTAL PROGRESS: <span>{movieMath}</span>
        </p>
      </MovieMathHolder>
      {content}
    </ProfileWrapper>
  );
};

export default ProfileHeader;
