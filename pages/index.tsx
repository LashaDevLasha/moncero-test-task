import { getCryptoAssets } from "@/services/table/cryptoAsset"; 
import { CryptoAsset } from "@/services/table/types"; 
import styles from "@/styles/Home.module.css";

interface HomeProps {
  cryptoAssets: CryptoAsset[]; 
}

export default function Home({ cryptoAssets }: HomeProps) {
  return (
    <>
      <main className={styles.main}>
        <button onClick={() => console.log(cryptoAssets)}>data</button>
        <h1>Crypto Assets</h1>
        {cryptoAssets.length === 0 ? (
          <p>No data available</p>
        ) : (
          <ul>
            {cryptoAssets.map((asset) => (
              <li key={asset.id}>
                {asset.name} ({asset.symbol}) - ${asset.priceUsd}
              </li>
            ))}
          </ul>
        )}
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
