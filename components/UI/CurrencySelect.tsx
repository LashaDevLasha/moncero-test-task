import React, { useEffect, useState } from "react";
import { Select } from "antd/lib";
import fetchCurrency from "@/services/fetchDifferentCurrency";

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

  const handleChange = (value: string) => {
    setSelectedCurrency(value);
  };

  return (
    <Select
      showSearch
      value={selectedCurrency}
      onChange={handleChange}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={[
        { value: "1", label: "Dollar" },
        { value: "2", label: "EUR" },
      ]}
    />
  );
};

export default CurrencySelect;
