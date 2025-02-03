import React, { useEffect, useState } from "react";
// import { Select } from "antd/lib";
import fetchCurrency from "@/services/fetchDifferentCurrency";
import { StyledSelect } from "@/styles/SelectPeriod.styles";

interface CurrencySelectProps {
  setEurRate: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({
  setEurRate,
  setCurrency,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>("1");

  useEffect(() => {
    const getCurrencyData = async () => {
      if (selectedCurrency === "2") {
        const data = await fetchCurrency();
        if (data && data.data) {
          setEurRate(data.data["EUR"]);
        }
      } else {
        setEurRate(1);
      }
    };

    getCurrencyData();
    setCurrency(selectedCurrency === "1" ? "USD" : "EUR");
  }, [selectedCurrency, setEurRate, setCurrency]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(event.target.value);
  };

  return (
    <StyledSelect value={selectedCurrency} onChange={handleChange} style={{ marginLeft: 0, marginBottom: 5 }}>
      <option value="1">Dollar</option>
      <option value="2">EUR</option>
    </StyledSelect>
  );
};

export default CurrencySelect;
