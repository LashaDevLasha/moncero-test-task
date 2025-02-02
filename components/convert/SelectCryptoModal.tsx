import { useCryptoContext } from "@/context/CryptoContext";
import { CryptoAsset } from "@/context/types";
import { filterCryptoAssets } from "@/utils/helper";
import { Modal } from "antd";
import React, { useState } from "react";
import {
  ModalContent,
  SearchInput,
  TokenChoice,
  CryptoIcon,
  TokenText,
  CryptoName,
  CryptoId,
} from "./SelectCryptoModal.styles";

interface SelectCryptoModalProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSelectCrypto: (crypto: CryptoAsset) => void;
  excludedAssets: string[];
}

export default function SelectCryptoModal({
  modalVisible,
  onCancel,
  onSelectCrypto,
  excludedAssets,
}: SelectCryptoModalProps) {
  const { cryptoAssets } = useCryptoContext();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAssets = filterCryptoAssets(
    cryptoAssets.filter((asset) => !excludedAssets.includes(asset.id)),
    searchTerm
  );

  const handleSelectCrypto = (crypto: CryptoAsset) => {
    onSelectCrypto(crypto);
    onCancel();
  };

  return (
    <Modal
      title={`Select CryptoCurrency`}
      open={modalVisible}
      onCancel={onCancel}
      footer={null}
      style={{ color: "white" }}
    >
      <ModalContent>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <SearchInput
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredAssets?.map((asset) => (
          <TokenChoice key={asset.id} onClick={() => handleSelectCrypto(asset)}>
            <CryptoIcon
              src={`/${asset.id}.png`}
              alt={asset.name}
              width={50}
              height={50}
              priority
            />
            <TokenText>
              <CryptoName>{asset.name}</CryptoName>
              <br />
              <CryptoId>{asset.id}</CryptoId>
            </TokenText>
          </TokenChoice>
        ))}
      </ModalContent>
    </Modal>
  );
}
