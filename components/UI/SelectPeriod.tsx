import { StyledSelect } from "@/styles/SelectPeriod.styles";
import React from "react";

interface SelectPeriodProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectPeriod: React.FC<SelectPeriodProps> = ({ value, onChange }) => {
  return (
    <StyledSelect
      value={value}
      onClick={(e) => e.stopPropagation()}
      onChange={onChange}
    >
      <option value="24h">24 Hours</option>
      <option value="7d">7 Days</option>
      <option value="30d">30 Days</option>
    </StyledSelect>
  );
};

export default SelectPeriod;
