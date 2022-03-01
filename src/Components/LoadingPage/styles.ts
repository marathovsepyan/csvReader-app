import styled from "styled-components";

export const Container = styled.div`
  background-color: grey;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  // visibility: hidden;
  z-index: -1;
  transition: opacity ease 0.5s;
  z-index: 99999;
  visibility: visible;
  opacity: 1;
  .inner-container {
    color: white;
    height: auto;
    text-align: center;
    p {
      font-size: 25px;
      opacity: 0.9;
      text-transform: uppercase;
      margin-top: 30px;
      letter-spacing: 1.4px;
      font-weight: 800;
    }
    span {
      font-size: 38px;
    }
  }
  .icon {
    -webkit-animation: rotate-center 1s ease-in-out infinite both;
    animation: rotate-center 1s ease-in-out infinite both;
  }
`;
