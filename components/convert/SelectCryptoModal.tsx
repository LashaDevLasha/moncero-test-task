import { useCryptoContext } from "@/context/CryptoContext";
import { CryptoAsset } from "@/context/types";
import { filterCryptoAssets } from "@/utils/helper";
import { Input } from "antd/lib";
import React, { useState } from "react";

interface SelectCryptoModalProps {
  onCancel: () => void;
  onSelectCrypto: (crypto: CryptoAsset) => void;
  excludedAssets: string[]; // This will be passed from parent
}

export default function SelectCryptoModal({
  onCancel,
  onSelectCrypto,
  excludedAssets, // Destructure excludedAssets from props
}: SelectCryptoModalProps) {
  const { cryptoAssets } = useCryptoContext();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter out the assets that are in the excludedAssets array
  const filteredAssets = filterCryptoAssets(
    cryptoAssets.filter((asset) => !excludedAssets.includes(asset.id)), // Exclude the assets in excludedAssets
    searchTerm
  );

  const handleSelectCrypto = (crypto: CryptoAsset) => {
    onSelectCrypto(crypto); // This will invoke the function passed from parent
    onCancel(); // Close modal after selection
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Search cryptocurrency..."
        value={searchTerm}
        allowClear
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {filteredAssets?.map((asset) => (
        <div
          key={asset.id}
          style={{ padding: "8px", borderBottom: "1px solid #eee" }}
          onClick={() => handleSelectCrypto(asset)} // When an asset is clicked, call handleSelectCrypto
        >
          <p>
            <strong>ID:</strong> {asset.id} <br />
            <strong>Name:</strong> {asset.name}
          </p>
        </div>
      ))}
    </div>
  );
}
