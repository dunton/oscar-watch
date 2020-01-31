import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  color: #a71d31;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 10px;
  div {
    font-size: 80px;
    font-weight: 200;
    max-width: 85%;

    @media screen and (max-width: 768px) {
      font-size: 40px;
    }

    p {
      color: #dfb458;
      font-weight: 700;
      font-size: 36px;

      @media screen and (max-width: 768px) {
        font-size: 24px;
      }
    }
  }
`;

class TimeToOscars extends Component {
  constructor() {
    super();
    this.state = {
      time: ""
    };
  }

  timeToFinish = () => {
    const countDownDate = new Date("Feb 9, 2020 20:00:00").getTime();
    let time;
    setInterval(() => {
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (hours < 10) {
        hours = "0" + hours;
      }

      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      time = `T-${days}:${hours}:${minutes}:${seconds}`;

      this.setState({
        time
      });
    }, 1000);
  };

  componentWillMount() {
    this.timeToFinish();
  }

  render() {
    return (
      <Wrapper>
        <div>
          <div>{this.state.time}</div>
          <p>
            Keep track of what you've watched for the 2019 Oscars by checking
            the boxes below!
          </p>
        </div>
      </Wrapper>
    );
  }
}

export default TimeToOscars;
