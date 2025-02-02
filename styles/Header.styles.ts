import styled from "styled-components";

export const Header = styled.header`
  color: #fff;
  height: 4vh;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: row;
    justify-content: center;
    gap: 10px;
    align-items: center;
  }
`;

export const StyledLink = styled.a`
  text-decoration: none;
  color: white;
  font-size: 18px;
  padding: 10px 15px;
  transition: color 0.3s ease-in-out;
  cursor: pointer;

  &.active {
    font-weight: bold;
    color: rgb(75, 192, 192);
  }

  &:hover {
    color: rgb(75, 192, 192);
  }
`;
