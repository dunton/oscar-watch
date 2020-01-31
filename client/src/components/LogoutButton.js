import React from "react";
import styled from "styled-components";
import colors from "styles/colors";
import { keyframes } from "styled-components";
import logoutButtonAnimation from "styles/logoutButtonAnimation";

const slideIn = keyframes`
  0% { right: -150px }
  100% { right: 10px; }
`;

const LogoutButtonWrapper = styled.button`
  width: 150px;
  height: 50px;
  background-color: ${colors.first};
  position: fixed;
  bottom: 10px;
  right: -150px;
  font-family: "Titillium Web", sans-serif;
  border-radius: 10px;
  font-size: 20px;
  color: ${colors.fourth};
  border: 2px solid ${colors.fourth}


  :hover {
    background: ${colors.fourth};
    color: ${colors.first};
    border: 2px solid ${colors.first}
  }

  animation: ${slideIn} ${logoutButtonAnimation.time}s ${
  logoutButtonAnimation.type
} forwards;
`;

const LogoutButton = props => {
  const handleClick = () => {
    props.handleLogout();
  };
  const renderContent = () => {
    if (props.isLoggedIn && !props.modalActive) {
      return (
        <LogoutButtonWrapper onClick={handleClick}>LOGOUT</LogoutButtonWrapper>
      );
    } else {
      return <div />;
    }
  };
  return renderContent();
};

export default LogoutButton;
