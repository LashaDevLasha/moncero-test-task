import styled from "styled-components";

export const ChartContainer = styled.div`
  max-width: 1000px;
  width: 100%;
`;

export const PeriodContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

export const StyledLabel = styled.label`
  font-size: 25px;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const StyledButton = styled.button`
  margin: 5px;
  height: 32px;
  background-color: #06080f;
  color: #fff;
  border: 1px solid #1f2639;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  cursor: pointer;
  margin-right: 9px;
  border: 1px solid #1f2639;

  &:hover {
    background-color: #2b3449;
  }
  &:focus {
    outline: none;
  }
`;

export const StyledHeaderDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  height: 100px;
`;
