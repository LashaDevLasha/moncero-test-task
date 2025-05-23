import styled from "styled-components";

export const ChartContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  margin-top: 40px;
  overflow-x: hidden;  

  @media (max-width: 1000px) {
    margin-top: 60px;
  }

  @media (max-width: 768px) {
    margin-top: 80px;
  }

  @media (max-width: 480px) {
    margin-top: 100px;
  }
`;

export const PeriodContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  box-sizing: border-box; 
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
  padding: 10px;
  height: 32px;
  background-color: #06080f;
  color: #fff;
  border: 1px solid #1f2639;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin-right: 9px;
  border: 1px solid #1f2639;

  display: flex;               
  justify-content: center;     
  align-items: center;         

  @media (max-width: 768px) {
    font-size: 12px;
    height: 28px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    height: 24px;
  }

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
  width: 100%;
  box-sizing: border-box;
`;

