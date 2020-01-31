import React from "react";
import ProfileHeader from "components/ProfileHeader";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
  z-index: 100;
`;

const Header = props => {
  const { isLoggedIn, userName, movies } = props;
  return (
    <HeaderWrapper>
      <ProfileHeader
        userName={userName}
        isLoggedIn={isLoggedIn}
        movies={movies}
      />
    </HeaderWrapper>
  );
};

export default Header;
