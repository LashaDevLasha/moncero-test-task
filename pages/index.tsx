import CustomCard from "@/components/UI/CustomCard";
import Statistics from "@/components/UI/Statistics";
import Table from "@/components/UI/table/CustomTable";
import { useCryptoContext } from "@/context/CryptoContext";
import { getChartData } from "@/services/chart/charts";
import { getCryptoAssets } from "@/services/table/cryptoAsset";
import { CryptoAsset } from "@/services/table/types";
import { formatCurrency } from "@/utils/helper";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface HomeProps {
  initialcryptoAssets: CryptoAsset[];
}

export default function Home({ initialcryptoAssets }: HomeProps) {
  const { cryptoAssets, setCryptoAssets } = useCryptoContext();
  const [selectedPeriod, setSelectedPeriod] = useState<string>("24h");

  const fetchCryptoAssets = useCallback(async () => {
    const response = await getCryptoAssets();
    const sortedAssets = response.sort(
      (a, b) => parseFloat(b.marketCapUsd) - parseFloat(a.marketCapUsd)
    );
    const cryptoAssets = sortedAssets.slice(0, 10);
    setCryptoAssets(cryptoAssets);
  }, [setCryptoAssets]);

  useEffect(() => {
    setCryptoAssets(initialcryptoAssets);
  }, [initialcryptoAssets, setCryptoAssets]);

  useEffect(() => {
    if (selectedPeriod === "24h") {
      fetchCryptoAssets();
    }
  }, [selectedPeriod, fetchCryptoAssets]);

  const fetchChangePercentage = async (assetId: string, period: string) => {
    let interval: "d1" | "h1" | "m1" = "d1";
    let start: number = Date.now();
    const end: number = Date.now();

    switch (period) {
      case "7d":
        start = Date.now() - 7 * 24 * 60 * 60 * 1000;
        break;
      case "30d":
        start = Date.now() - 30 * 24 * 60 * 60 * 1000;
        break;
      default:
        interval = "d1";
    }

    try {
      const response = await getChartData({ assetId, interval, start, end });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePeriodChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const period = event.target.value;
    setSelectedPeriod(period);

    if (period === "24h") {
      return;
    }

    const updatedData = await Promise.all(
      cryptoAssets.map(async (asset) => {
        const chartData = await fetchChangePercentage(asset.id, period);

        if (chartData && Array.isArray(chartData) && chartData.length > 1) {
          const latestData = chartData[0];
          const previous = chartData[chartData.length - 1];
          const latestPrice = parseFloat(latestData.priceUsd);
          const previousPrice = parseFloat(previous.priceUsd);

          const priceChangePercent =
            previousPrice === 0
              ? 0
              : ((latestPrice - previousPrice) / previousPrice) * 100;

          return {
            ...asset,
            changePercent24Hr: priceChangePercent.toFixed(2),
          };
        }

        return asset;
      })
    );

    setCryptoAssets(updatedData);
  };

  useEffect(() => {
    fetchCryptoAssets();

    const interval = setInterval(() => {
      fetchCryptoAssets();
    }, 60000);

    return () => clearInterval(interval);
  }, [fetchCryptoAssets]);

  const columns = [
    {
      key: "1",
      title: "Name",
      dataIndex: "name",
      canSort: true,
      canFilter: true,
      render: (name: string, record: CryptoAsset) => {
        const iconPath = `/${record.id.toLowerCase()}.png`;

        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* <button onClick={() => console.log(iconPath)}>record</button> */}
            <Image src={iconPath} alt={`${name} icon`} width={24} height={24} />
            <span key={name} style={{ marginLeft: 8 }}>
              {name}
            </span>
            <span key={record.symbol} style={{ marginLeft: 8 }}>
              ({record.symbol})
            </span>
          </div>
        );
      },
    },
    {
      key: "2",
      title: "Price",
      dataIndex: "priceUsd",
      canSort: true,
      render: (price: string) => formatCurrency(parseFloat(price)),
    },
    {
      key: "3",
      dataIndex: "",
      canSort: true,
      render: (record: CryptoAsset) => (
        <Statistics value={record.changePercent24Hr} />
      ),
      title: (
        <>
          Change
          <select
            defaultValue="24h"
            style={{ width: 120, marginLeft: 8 }}
            onClick={(e) => e.stopPropagation()}
            onChange={handlePeriodChange}
          >
            <option value="24h">24 Hours</option>
            <option value="7d">7 Days</option>
            <option value="30d">30 Days</option>
          </select>
        </>
      ),
    },
  ];
  return (
    <>
      <main>
        <CustomCard>
          {/* <button onClick={() => console.log(cryptoAssets)}>data</button> */}
          <h1>Crypto Assets</h1>

          <Table columns={columns} data={cryptoAssets} />
        </CustomCard>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const response = await getCryptoAssets();
  const sortedAssets = response.sort(
    (a, b) => parseFloat(b.marketCapUsd) - parseFloat(a.marketCapUsd)
  );
  const initialcryptoAssets = sortedAssets.slice(0, 10);
  console.log(initialcryptoAssets);

  return {
    props: {
      initialcryptoAssets,
    },
  };
}
