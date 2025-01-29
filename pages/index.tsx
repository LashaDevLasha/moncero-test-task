import { getCryptoAssets } from "@/services/table/cryptoAsset"; // Import the service
import { CryptoAsset } from "@/services/table/types"; // Correct path to types
import styles from "@/styles/Home.module.css";

interface HomeProps {
  cryptoAssets: CryptoAsset[]; // Expecting `cryptoAssets` as a prop
}

export default function Home({ cryptoAssets }: HomeProps) {
  return (
    <>
      <main className={styles.main}>
        <h1>Crypto Assets</h1>
        {cryptoAssets.length === 0 ? (
          <p>No data available</p> // Handle the case when no data is fetched
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
  try {
    const response = await getCryptoAssets();
    console.log("Response from getCryptoAssets in getServerSideProps:", response);

    return {
      props: {
        cryptoAssets: response,  
      },
    };
  } catch (error) {
    console.error("Error fetching data in getServerSideProps:", error);
    return {
      props: {
        cryptoAssets: [], 
      },
    };
  }
}

