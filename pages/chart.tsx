import React, { useEffect, useState } from "react";
// import styles from "@/styles/Chart.module.css";
import LineChart from "@/components/UI/LineChart";
import { getChartData } from "@/services/chart/charts";
import SelectPeriod from "@/components/UI/SelectPeriod";
import { useCryptoContext } from "@/context/CryptoContext";
import { getCryptoAssets } from "@/services/table/cryptoAsset";
import { CryptoAsset } from "@/context/types";
import SelectCryptoModal from "@/components/convert/SelectCryptoModal";

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
  const { cryptoInfo, setCryptoInfo, setCryptoAssets } = useCryptoContext();
  const [modalVisible, setModalVisible] = useState(false);

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
      startTimestamp = new Date(
        currentTimestamp - 7 * 24 * 60 * 60 * 1000
      ).setHours(0, 0, 0, 0);
    } else if (selectedPeriod === "30d") {
      startTimestamp = new Date(
        currentTimestamp - 30 * 24 * 60 * 60 * 1000
      ).setHours(0, 0, 0, 0);
    } else {
      startTimestamp = currentTimestamp - 24 * 60 * 60 * 1000;
    }

    const fetchData = async () => {
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
      }
    };

    fetchData();
  }, [selectedCrypto, selectedPeriod]);

  const handleCryptoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCrypto(event.target.value);
  };

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
    setModalVisible(false);
  };

  return (
    <div className="chart-cointainer">
      <SelectPeriod value={selectedPeriod} onChange={handlePeriodChange} />
      <div>
        <label htmlFor="cryptoSelect">Select Crypto:</label>
        <select
          id="cryptoSelect"
          value={selectedCrypto}
          onChange={handleCryptoChange}
        >
          {cryptoInfo?.map((crypto) => (
            <option key={crypto.id} value={crypto.id}>
              {crypto.name}
            </option>
          ))}
        </select>
        <button onClick={handleOpenModal}>Select Crypto</button>
      </div>

      <SelectCryptoModal
        modalVisible={modalVisible}
        onCancel={handleCloseModal}
        onSelectCrypto={handleSelectCrypto}
        excludedAssets={[]}
      />

      <LineChart labels={labels} data={data} title="Crypto Price Trend" />
    </div>
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
