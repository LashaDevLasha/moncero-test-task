import React, { useEffect, useState, useRef } from "react";
import { ArrowDownOutlined } from "@ant-design/icons";
import { useCryptoContext } from "@/context/CryptoContext";
import CryptoSelector from "../UI/CryptoSelector";
import SelectCryptoModal from "./SelectCryptoModal";
import { SwitchButton, TradeBox } from "../../styles/SwapStyles.styles";



const Swap: React.FC = () => {
  const [fromInput, setFromInput] = useState<string>("0");
  const [toInput, setToInput] = useState<string>("0");
  const [lastUpdated, setLastUpdated] = useState<"FROM" | "TO" | null>(null);
  const [modalType, setModalType] = useState<"FROM" | "TO" | null>(null);
  const {
    selectedCryptoFROM,
    selectedCryptoTO,
    setSelectedCryptoFROM,
    setSelectedCryptoTO,
    cryptoAssets,
  } = useCryptoContext();

  const isUpdating = useRef(false);

  useEffect(() => {
    if (!selectedCryptoFROM && cryptoAssets[0]) {
      const fromAsset = cryptoAssets.find(
        (asset) => asset.id === cryptoAssets[0]?.id
      );
      if (fromAsset) setSelectedCryptoFROM(fromAsset);
    }
    if (!selectedCryptoTO && cryptoAssets[1]) {
      const toAsset = cryptoAssets.find(
        (asset) => asset.id === cryptoAssets[1]?.id
      );
      if (toAsset) setSelectedCryptoTO(toAsset);
    }
  }, [
    cryptoAssets,
    selectedCryptoFROM,
    selectedCryptoTO,
    setSelectedCryptoFROM,
    setSelectedCryptoTO,
  ]);

  const openModal = (type: "FROM" | "TO") => setModalType(type);
  const closeModal = () => setModalType(null);

  const fromCrypto = selectedCryptoFROM?.id ?? cryptoAssets[0]?.id;
  const toCrypto = selectedCryptoTO?.id ?? cryptoAssets[1]?.id;

  const switchBoxes = () => {
    setSelectedCryptoFROM(selectedCryptoTO);
    setSelectedCryptoTO(selectedCryptoFROM);
    setFromInput(toInput);
    setToInput(fromInput);
    setLastUpdated((prev) => (prev === "FROM" ? "TO" : "FROM"));
  };

  const fromPrice = cryptoAssets.find(
    (asset) => asset.id === selectedCryptoFROM?.id
  )?.priceUsd;
  const toPrice = cryptoAssets.find(
    (asset) => asset.id === selectedCryptoTO?.id
  )?.priceUsd;

  const MAX_DECIMALS = 2;
  const MAX_INPUT_LENGTH = 15;

  const handleFromInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isUpdating.current) return;
    let value = e.target.value;

    if (!/^\d*\.?\d*$/.test(value)) return;

    if (value.length > MAX_INPUT_LENGTH) {
      value = value.slice(0, MAX_INPUT_LENGTH);
    }

    const [integer, decimal] = value.split(".");
    if (decimal && decimal.length > MAX_DECIMALS) {
      value = `${integer}.${decimal.slice(0, MAX_DECIMALS)}`;
    }

    value = value.replace(/^0+(?=\d)/, "");
    setFromInput(value);
    setLastUpdated("FROM");

    if (!value) {
      setToInput("");
    } else if (fromPrice && toPrice) {
      const calculatedToValue =
        (parseFloat(value) * Number(fromPrice ?? 0)) / Number(toPrice ?? 1);
      setToInput(calculatedToValue.toString());
    }

    isUpdating.current = true;
  };

  const handleToInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isUpdating.current) return;
    let value = e.target.value;
    if (!/^\d*\.?\d*$/.test(value)) return;
    if (value.length > MAX_INPUT_LENGTH) {
      value = value.slice(0, MAX_INPUT_LENGTH);
    }
    const [integer, decimal] = value.split(".");
    if (decimal && decimal.length > MAX_DECIMALS) {
      value = `${integer}.${decimal.slice(0, MAX_DECIMALS)}`;
    }

    value = value.replace(/^0+(?=\d)/, "");
    setToInput(value);
    setLastUpdated("TO");

    if (!value) {
      setFromInput("");
    } else if (fromPrice && toPrice) {
      const calculatedFromValue =
        (parseFloat(value) * Number(toPrice ?? 0)) / Number(fromPrice ?? 1);
      setFromInput(calculatedFromValue.toString());
    }

    isUpdating.current = true;
  };

  useEffect(() => {
    isUpdating.current = false;
  }, [fromInput, toInput]);

  useEffect(() => {
    if (lastUpdated === "FROM" && fromInput && fromPrice && toPrice) {
      const calculatedToValue =
        (parseFloat(fromInput) * Number(fromPrice ?? 0)) / Number(toPrice ?? 1);
      setToInput(calculatedToValue.toString());
    }
  }, [fromInput, fromPrice, toPrice, lastUpdated]);

  useEffect(() => {
    if (lastUpdated === "TO" && toInput && fromPrice && toPrice) {
      const calculatedFromValue =
        (parseFloat(toInput) * Number(toPrice ?? 0)) / Number(fromPrice ?? 1);
      setFromInput(calculatedFromValue.toString());
    }
  }, [toInput, fromPrice, toPrice, lastUpdated]);

  return (
    <TradeBox>
      <CryptoSelector
        label="FROM"
        selectedItem={fromCrypto}
        onClick={() => openModal("FROM")}
        inputValue={fromInput}
        onInputChange={handleFromInputChange}
        iconSrc={`/${fromCrypto}.png`}
      />
      <SwitchButton onClick={switchBoxes}>
        <ArrowDownOutlined className="switchArrow" />
      </SwitchButton>
      <CryptoSelector
        label="TO"
        selectedItem={toCrypto}
        onClick={() => openModal("TO")}
        inputValue={toInput}
        onInputChange={handleToInputChange}
        iconSrc={`/${toCrypto}.png`}
      />

      <SelectCryptoModal
        modalVisible={modalType !== null}
        onCancel={closeModal}
        onSelectCrypto={(cryptoId) => {
          if (modalType === "FROM") {
            setSelectedCryptoFROM(cryptoId);
          } else if (modalType === "TO") {
            setSelectedCryptoTO(cryptoId);
          }
          closeModal();
        }}
        excludedAssets={ [selectedCryptoFROM?.id, selectedCryptoTO?.id].filter(Boolean) as string[] }
      />
    </TradeBox>
  );
};

export default Swap;
