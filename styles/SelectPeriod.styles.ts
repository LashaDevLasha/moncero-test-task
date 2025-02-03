import styled, { css } from "styled-components";

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

  @media (max-width: 768px) {
    height: 28px;
    width: 80px;
    font-size: 12px;
    padding: 4px;
  }

  @media (max-width: 480px) {
    height: 24px;
    width: 70px;
    font-size: 10px;
    padding: 3px;
  }
`;
