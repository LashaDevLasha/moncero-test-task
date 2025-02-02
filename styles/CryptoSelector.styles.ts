import styled from "styled-components";
import { CaretDownOutlined } from "@ant-design/icons";

export const SwitchBox = styled.div`
  max-width: 100%;
  height: 100px;
  background-color: rgb(25, 33, 52);
  border-radius: 20px;
  padding: 30px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const BoxLabel = styled.span`
  color: white;
`;

export const MiddleInputDiv = styled.div`
  margin-top: 20px;
  max-width: 400px;
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CryptoInput = styled.input`
  background-color: rgb(25, 33, 52);
  color: white;
  font-size: 24px;
  border: none;
  outline: none;
  padding: none;
  width: 80%;

  @media (max-width: 400px) {
    font-size: 16px;
  }
`;

export const SelectDiv = styled.div`
  background-color: #3a4157;
  border-radius: 100px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  font-size: 17px;
  cursor: pointer;
  white-space: nowrap;
`;

export const DownArrow = styled(CaretDownOutlined)`
  color: white;
  margin-right: 5px;
`;

export const IconPlaceholder = styled.span`
  font-size: 20px;
`;
