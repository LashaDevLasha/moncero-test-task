import { ArrowDownOutlined, CaretDownOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Image from "next/image";
import { Modal } from "antd"; 

interface SwapProps {
  cryptoIds: string[];
}

export default function Swap({ cryptoIds }: SwapProps) {
  const [isSwitched, setIsSwitched] = useState(false);
  const [modalType, setModalType] = useState<"FROM" | "TO" | null>(null); 

  const switchBoxes = () => {
    setIsSwitched(!isSwitched);
  };

  const openModal = (type: "FROM" | "TO") => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null); 
  };

  return (
    <div className="tradeBox">
      <div className="switchBox">
        <span className="boxLabel">FROM</span>

        <div className="select-div" onClick={() => openModal("FROM")}>
          {isSwitched ? (
            <>
              <Image
                src={`/${cryptoIds[0]}.png`}
                alt={cryptoIds[0]}
                width={30}
                height={30}
                priority
                className="cryptoIcon"
              />
              <span className="cryptoId">{cryptoIds[0].toUpperCase()}</span>
              <CaretDownOutlined className="downArrow" />
            </>
          ) : (
            <>
              <Image
                src={`/${cryptoIds[1]}.png`}
                alt={cryptoIds[1]}
                width={30}
                height={30}
                priority
                className="cryptoIcon"
              />
              <span className="cryptoId">{cryptoIds[1].toUpperCase()}</span>
              <CaretDownOutlined className="downArrow" />
            </>
          )}
        </div>
      </div>

      <div className="switchButton" onClick={switchBoxes}>
        <ArrowDownOutlined className="switchArrow" />
      </div>

      <div className="switchBox">
        <span className="boxLabel">TO</span>
        <div className="select-div" onClick={() => openModal("TO")}>
          {isSwitched ? (
            <>
              <Image
                src={`/${cryptoIds[1]}.png`}
                alt={cryptoIds[1]}
                width={30}
                height={30}
                priority
                className="cryptoIcon"
              />
              <span className="cryptoId">{cryptoIds[1].toUpperCase()}</span>
              <CaretDownOutlined className="downArrow" />
            </>
          ) : (
            <>
              <Image
                src={`/${cryptoIds[0]}.png`}
                alt={cryptoIds[0]}
                width={30}
                height={30}
                priority
                className="cryptoIcon"
              />
              <span className="cryptoId">{cryptoIds[0].toUpperCase()}</span>
              <CaretDownOutlined className="downArrow" />
            </>
          )}
        </div>
      </div>

      <Modal
        title={`Select Token - ${modalType}`}
        open={modalType !== null}
        onCancel={closeModal}
        footer={null} 
      >
        <div className="modalContent">
          <p>Select a token for {modalType}</p>
        </div>
      </Modal>
    </div>
  );
}
