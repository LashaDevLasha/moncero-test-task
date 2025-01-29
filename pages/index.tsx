import CustomCard from "@/components/UI/CustomCard";
import Table from "@/components/UI/table/CustomTable";
import { getCryptoAssets } from "@/services/table/cryptoAsset";
import { CryptoAsset } from "@/services/table/types";

interface HomeProps {
  cryptoAssets: CryptoAsset[];
}

export default function Home({ cryptoAssets }: HomeProps) {
  const columns = [
    {
      key: "1",
      title: "Name",
      dataIndex: "name",
      sorter: (a: CryptoAsset, b: CryptoAsset) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      },
    },
    {
      key: "2",
      title: "Symbol",
      dataIndex: "symbol",
    },
    {
      key: "3",
      title: "Price",
      dataIndex: "priceUsd",
    },
    {
      key: "3",
      title: "24h Volume",
      dataIndex: "changePercent24Hr",
    },
  ];
  return (
    <>
      <main>
        <CustomCard>
          <button onClick={() => console.log(cryptoAssets)}>data</button>
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
  const cryptoAssets = sortedAssets.slice(0, 10);
  console.log(cryptoAssets);

  return {
    props: {
      cryptoAssets,
    },
  };
}
