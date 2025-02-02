import React from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import Image from "next/image";
import useWindowSize from "@/hooks/window-size";

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
    <div className="switchBox">
      <span className="boxLabel">{label}:</span>

      <div className="middle-input-div">
        <input
          value={inputValue}
          onChange={onInputChange}
          className="crypto-input"
          readOnly={false}
        />
        <div className="select-div" onClick={onClick}>
          {iconSrc ? (
            <Image
              src={iconSrc}
              alt={selectedItem}
              width={30}
              height={30}
              priority
              className="cryptoIcon"
            />
          ) : (
            <span className="icon-placeholder">🔑</span> 
          )}

          {width >= 600 && <span className="cryptoId">{selectedItem}</span>}
          <CaretDownOutlined className="downArrow" />
        </div>
      </div>
    </div>
  );
};

export default CryptoSelector;
