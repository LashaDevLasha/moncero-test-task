import CustomCard from "@/components/UI/CustomCard";
import Statistics from "@/components/UI/Statistics";
import Table from "@/components/UI/table/CustomTable";
import { getCryptoAssets } from "@/services/table/cryptoAsset";
import { CryptoAsset } from "@/services/table/types";
import { formatCurrency } from "@/utils/helper";
import Image from "next/image";
import { useEffect, useState } from "react";

interface HomeProps {
  cryptoAssets: CryptoAsset[];
}

export default function Home({ cryptoAssets }: HomeProps) {
  const [data, setData] = useState<CryptoAsset[]>(cryptoAssets);

  const fetchCryptoAssets = async () => {
    const response = await getCryptoAssets();
    const sortedAssets = response.sort(
      (a, b) => parseFloat(b.marketCapUsd) - parseFloat(a.marketCapUsd)
    );
    const cryptoAssets = sortedAssets.slice(0, 10);
    setData(cryptoAssets);
  };

  useEffect(() => {
    fetchCryptoAssets();

    const interval = setInterval(() => {
      fetchCryptoAssets();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

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
            <span key={name} style={{ marginLeft: 8 }}>{name}</span>
            <span key={record.symbol} style={{ marginLeft: 8 }}>({record.symbol})</span>
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
      dataIndex: "changePercent24Hr",
      canSort: true,
      render: (value: string) => <Statistics value={value} />,
      title: (
        <>
          Change
          <select
            defaultValue="24h"
            style={{ width: 120, marginLeft: 8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <option value="1h">1 Hour</option>
            <option value="24h">24 Hours</option>
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

          <Table columns={columns} data={data} />
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
  const cryptoAssets = sortedAssets.slice(0, 10);
  // console.log(cryptoAssets);

  return {
    props: {
      cryptoAssets,
    },
  };
}
