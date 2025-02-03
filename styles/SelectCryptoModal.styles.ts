import styled from "styled-components";
import Image from "next/image";

export const ModalContent = styled.div`
  background-color: #06080f;
  color: white;
  // padding: 5px;
  border: solid 1px #1f2639;
  padding-top: 10px;
`;

export const SearchInput = styled.input`
  width: 92%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 5px;
  margin-top: 10px;
  background-color: rgb(25, 33, 52);
  border: none;
  outline: none;
  color: white;
  height: 30px;
  font-size: 17px;
  
  &::placeholder {
    color: rgb(90, 110, 150);
    opacity: 1;
  }

  &:hover {
    background-color: #1f2639;
  }
`;

export const TokenChoice = styled.div`
  padding-left: 20px;
  border: none !important;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding-bottom:10px;
  padding-top:10px;

  &:hover {
    background-color: #1f2639;
  }
`;

export const CryptoIcon = styled(Image)`
  width: 50px;
  height: 50px;
`;

export const TokenText = styled.p`
  margin-left: 10px;
`;

export const CryptoName = styled.strong`
  font-size: 18px;
  font-weight: bold;
`;

export const CryptoId = styled.strong`
  font-size: 14px;
  color: gray;
`;


