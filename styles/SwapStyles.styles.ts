import styled from "styled-components";

export const TradeBox = styled.div`
  background-color: #0e111b;
  border: 2px solid #21273a;
  min-height: 400px;
  border-radius: 15px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  max-width: 600px;
  width: 100%;
  margin-top: 100px;
  box-sizing: border-box;
  
  overflow-x: hidden;

  @media (max-width: 768px) {
    margin-top: 60px;
    padding: 15px;
  }

  @media (max-width: 480px) {
    margin-top: 80px;
    padding: 10px; 
  }
`;

export const SwitchButton = styled.div`
  background-color: #3a4157;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 8px;
  color: #5f6783;
  border: 3px solid #0e111b;
  font-size: 12px;
  transition: 0.3s;
  cursor: pointer;
  
  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 10px;
  }

  &:hover {
    color: white;
  }

  .switchArrow {
    font-size: 24px;
  }

  .switchArrow:hover {
    color: #fff;
  }
`;
