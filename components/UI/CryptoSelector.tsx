import React from "react";
import Image from "next/image";
import useWindowSize from "@/hooks/window-size";
import {
  SwitchBox,
  BoxLabel,
  MiddleInputDiv,
  CryptoInput,
  SelectDiv,
  DownArrow,
  IconPlaceholder,
} from "@/styles/CryptoSelector.styles";

interface CryptoSelectorProps {
  label: string;
  selectedItem: string;
  onClick: () => void;
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  iconSrc?: string; 
}

const CryptoSelector = ({
  label,
  selectedItem,
  onClick,
  inputValue,
  onInputChange,
  iconSrc,
}: CryptoSelectorProps) => {
  const { width } = useWindowSize();

  return (
    <SwitchBox>
      <BoxLabel>{label}:</BoxLabel>

      <MiddleInputDiv>
        <CryptoInput
          value={inputValue}
          onChange={onInputChange}
          readOnly={false}
        />
        <SelectDiv onClick={onClick}>
          {iconSrc ? (
            <Image
              src={iconSrc}
              alt={selectedItem}
              width={30}
              height={30}
              style={{
                marginRight: "5px",
              }}
            />
          ) : (
            <IconPlaceholder>🔑</IconPlaceholder>
          )}
          {width >= 600 && (
            <span style={{ color: "white" }}>{selectedItem}</span>
          )}
          <DownArrow />
        </SelectDiv>
      </MiddleInputDiv>
    </SwitchBox>
  );
};

export default CryptoSelector;
