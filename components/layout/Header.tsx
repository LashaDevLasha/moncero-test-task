import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Header, Nav, StyledLink } from "@/styles/Header.styles";

const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <Header>
      <Nav>
        <Link href="/" legacyBehavior style={{ textDecoration: "none" }}>
          <StyledLink className={router.pathname === "/" ? "active" : ""}>
            Table
          </StyledLink>
        </Link>
        <Link href="/convert" legacyBehavior style={{ textDecoration: "none" }}>
          <StyledLink
            className={router.pathname === "/convert" ? "active" : ""}
          >
            Convert
          </StyledLink>
        </Link>
        <Link href="/chart" legacyBehavior style={{ textDecoration: "none" }}>
          <StyledLink className={router.pathname === "/chart" ? "active" : ""}>
            Chart
          </StyledLink>
        </Link>
      </Nav>
    </Header>
  );
};

export default Navbar;
