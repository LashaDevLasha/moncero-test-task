import React, { useEffect, useState } from "react";
import styles from "@/styles/Chart.module.css";
import LineChart from "@/components/UI/LineChart";
import { getChartData } from "@/services/chart/charts";

const Chart: React.FC = () => {
  const [labels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const interval = "h1"; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chartData = await getChartData({
          assetId: "bitcoin",
          interval,
        });
        // console.log(chartData);

        // const timeLabels = chartData.map((item) => {
        //   const date = new Date(item.time); 

        //   if (interval === "d1") {
        //     const hours = date.getHours();
        //     return `${hours}:00`; 
        //   } else {
        //     return date.toLocaleString();
        //   }
        // });

        const priceData = chartData.map((item) => parseFloat(item.priceUsd));

        // setLabels(timeLabels);
        setData(priceData);
      } catch (error) {
        console.log(error);
        setError("Error fetching chart data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p>{error}</p>;

  const title = "Crypto Price Trend"; 

  return (
    <main className={styles.main} style={{marginTop: "100px"}}>
      <LineChart labels={labels} data={data} title={title} />
    </main>
  );
};

export default Chart;
