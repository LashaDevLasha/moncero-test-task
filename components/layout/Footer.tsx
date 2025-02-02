import React from "react";
import { Footer as StyledFooter, Text as StyledText } from "@/styles/Footer.styles"; 

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <StyledText> 
        © 2025 Moncero. All rights reserved.
      </StyledText>
    </StyledFooter>
  );
};

export default Footer;
