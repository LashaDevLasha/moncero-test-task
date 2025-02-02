import styled from "styled-components";

export const StyledSelect = styled.select`
  margin-left: 10px;
  height: 32px;
  width: 90px;
  padding: 5px;
  background-color: #06080f;
  color: #fff;
  border: 1px solid #1f2639;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #2b3449;
  }
  &:focus {
    outline: none;
  }
`;
