import styled from "styled-components";

export const ButtonGroup = styled.div`
  text-align: right;
  margin: 3px;
  margin-right: 20px;
  width: 500px;
  justify-content: center;
  color: white;
  :hover {
    border-style: unset;
    color: black;
  }
  div {
    height: 15px !important;
  }
  span {
    display: none;
  }
`;

export const Header = styled.div`
  background-color: grey;
  display: flex;
  justify-content: space-between;
`;
