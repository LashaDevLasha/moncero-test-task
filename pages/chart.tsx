import React, { useEffect, useState } from "react";
import LineChart from "@/components/UI/LineChart";
import { getChartData } from "@/services/chart/charts";
import SelectPeriod from "@/components/UI/SelectPeriod";
import { useCryptoContext } from "@/context/CryptoContext";
import { getCryptoAssets } from "@/services/table/cryptoAsset";
import { CryptoAsset } from "@/context/types";
import SelectCryptoModal from "@/components/convert/SelectCryptoModal";
import {
  ChartContainer,
  PeriodContainer,
  StyledButton,
  StyledHeaderDiv,
  StyledLabel,
} from "@/styles/chart.styles";
import { Spin } from "antd/lib";

interface ChartProps {
  chartData: {
    priceUsd: string;
    time: string;
  }[];
  initialcryptoAssets: CryptoAsset[];
}

const Chart: React.FC<ChartProps> = ({ chartData, initialcryptoAssets }) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("24h");
  const [selectedCrypto, setSelectedCrypto] = useState<string>("bitcoin");
  const [selectedCryptoName, setSelectedCryptoName] = useState<string>("Bitcoin");
  const { setCryptoInfo, setCryptoAssets } = useCryptoContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    const chartArea = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - chartArea.left;
    const y = event.clientY - chartArea.top;
    setCursorPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setCursorPosition(null);
  };

  useEffect(() => {
    setCryptoAssets(initialcryptoAssets);
  }, [initialcryptoAssets, setCryptoAssets]);

  useEffect(() => {
    const cryptoInfo = initialcryptoAssets.map((asset) => ({
      id: asset.id,
      name: asset.name,
    }));
    setCryptoInfo(cryptoInfo);
  }, [initialcryptoAssets, setCryptoInfo]);

  useEffect(() => {
    if (chartData?.length > 0) {
      const formattedLabels = chartData.map((item) =>
        selectedPeriod === "24h"
          ? new Date(Number(item.time)).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : new Date(Number(item.time)).toLocaleDateString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })
      );

      const formattedData = chartData.map((item) => parseFloat(item.priceUsd));

      setLabels(formattedLabels);
      setData(formattedData);
    }
  }, [chartData, selectedPeriod]);

  useEffect(() => {
    const interval: "h1" | "d1" = selectedPeriod === "24h" ? "h1" : "d1";

    const currentTimestamp = Date.now();
    let startTimestamp: number;

    if (selectedPeriod === "24h") {
      startTimestamp = currentTimestamp - 24 * 60 * 60 * 1000;
    } else if (selectedPeriod === "7d") {
      startTimestamp = new Date(currentTimestamp - 7 * 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0);
    } else if (selectedPeriod === "30d") {
      startTimestamp = new Date(currentTimestamp - 30 * 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0);
    } else {
      startTimestamp = currentTimestamp - 24 * 60 * 60 * 1000;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getChartData({
          assetId: selectedCrypto,
          interval,
          start: startTimestamp,
          end: currentTimestamp,
        });

        const formattedLabels = response.data.map((item: { time: string }) => {
          return selectedPeriod === "24h"
            ? new Date(Number(item.time)).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : new Date(Number(item.time)).toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
              });
        });

        const formattedData = response.data.map((item: { priceUsd: string }) =>
          parseFloat(item.priceUsd)
        );

        setLabels(formattedLabels);
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCrypto, selectedPeriod]);

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(event.target.value);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSelectCrypto = (crypto: CryptoAsset) => {
    setSelectedCrypto(crypto.id);
    setSelectedCryptoName(crypto.name);
    setModalVisible(false);
  };

  return (
    <ChartContainer>
      <StyledHeaderDiv>
        <StyledLabel htmlFor="cryptoSelect">
          {selectedCryptoName
            ? ` ${selectedCryptoName} prices for the last ${
                selectedPeriod === "24h"
                  ? "24 hours"
                  : selectedPeriod === "7d"
                  ? "7 days"
                  : "30 days"
              }`
            : "Select Crypto"}
        </StyledLabel>
        <PeriodContainer>
          <SelectPeriod value={selectedPeriod} onChange={handlePeriodChange} />
          <StyledButton onClick={handleOpenModal}>Select Crypto</StyledButton>
        </PeriodContainer>
      </StyledHeaderDiv>

      <SelectCryptoModal
        modalVisible={modalVisible}
        onCancel={handleCloseModal}
        onSelectCrypto={handleSelectCrypto}
        excludedAssets={[]}
      />
      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "auto", paddingTop: "50px" }} />
      ) : (
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave} 
          style={{ position: "relative" }}
        >
          <LineChart labels={labels} data={data} title="Crypto Price Trend" />
          {cursorPosition && (
            <>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: cursorPosition.x,
                  width: "1px",
                  height: "100%",
                  backgroundColor: "white",
                  pointerEvents: "none", 
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: cursorPosition.y,
                  left: 0,
                  width: "100%",
                  height: "1px",
                  backgroundColor: "white",
                  pointerEvents: "none", 
                }}
              />
            </>
          )}
        </div>
      )}
    </ChartContainer>
  );
};

export default Chart;

export async function getServerSideProps() {
  const interval = "h1";
  const currentTimestamp = Date.now();
  const twentyFourHoursAgoTimestamp = currentTimestamp - 24 * 60 * 60 * 1000;

  const response = await getChartData({
    assetId: "bitcoin",
    interval,
    start: twentyFourHoursAgoTimestamp,
    end: currentTimestamp,
  });

  const responseForCryptoSelect = await getCryptoAssets();
  const sortedAssets = responseForCryptoSelect.sort(
    (a, b) => parseFloat(b.marketCapUsd) - parseFloat(a.marketCapUsd)
  );
  const initialcryptoAssets = sortedAssets.slice(0, 10);

  return {
    props: {
      chartData: response?.data || [],
      initialcryptoAssets,
    },
  };
}
