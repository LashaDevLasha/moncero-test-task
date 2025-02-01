import { ArrowDownOutlined, CaretDownOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Modal } from "antd/lib";
import SelectCryptoModal from "./SelectCryptoModal";
import { useCryptoContext } from "@/context/CryptoContext";

const CryptoSelector = ({
  label,
  selectedCrypto,
  priceUsd,
  onClick,
}: {
  label: "FROM" | "TO";
  selectedCrypto: string;
  priceUsd?: number;
  onClick: () => void;
}) => (
  <div className="switchBox">
    <span className="boxLabel">{label}</span>

    <div className="middle-input-div">
      <input
        // type="text"
        value={`$${priceUsd}`}
        readOnly
        className="crypto-input"
      />
      <div className="select-div" onClick={onClick}>
        <Image
          src={`/${selectedCrypto}.png`}
          alt={selectedCrypto}
          width={30}
          height={30}
          priority
          className="cryptoIcon"
        />
        <span className="cryptoId">{selectedCrypto}</span>
        <CaretDownOutlined className="downArrow" />
      </div>
    </div>
  </div>
);

const Swap: React.FC = () => {
  const [modalType, setModalType] = useState<"FROM" | "TO" | null>(null);
  const {
    selectedCryptoFROM,
    selectedCryptoTO,
    setSelectedCryptoFROM,
    setSelectedCryptoTO,
    cryptoAssets,
  } = useCryptoContext();

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
  };

  const fromPrice = cryptoAssets.find(
    (asset) => asset.id === selectedCryptoFROM?.id
  )?.priceUsd;
  const toPrice = cryptoAssets.find(
    (asset) => asset.id === selectedCryptoTO?.id
  )?.priceUsd;

  return (
    <div className="tradeBox">
      <CryptoSelector
        label="FROM"
        selectedCrypto={fromCrypto}
        priceUsd={fromPrice ? parseFloat(fromPrice) : undefined}
        onClick={() => openModal("FROM")}
      />
      <div className="switchButton" onClick={switchBoxes}>
        <ArrowDownOutlined className="switchArrow" />
      </div>
      <CryptoSelector
        label="TO"
        selectedCrypto={toCrypto}
        priceUsd={toPrice ? parseFloat(toPrice) : undefined}
        onClick={() => openModal("TO")}
      />

      <Modal
        title={`Select Currency - ${modalType}`}
        open={modalType !== null}
        onCancel={closeModal}
        footer={null}
      >
        <SelectCryptoModal
          onCancel={closeModal}
          onSelectCrypto={(cryptoId) => {
            if (modalType === "FROM") {
              setSelectedCryptoFROM(cryptoId);
            } else if (modalType === "TO") {
              setSelectedCryptoTO(cryptoId);
            }
            closeModal();
          }}
          excludedAssets={
            [selectedCryptoFROM?.id, selectedCryptoTO?.id].filter(
              Boolean
            ) as string[]
          }
        />
      </Modal>
    </div>
  );
};

export default Swap;
