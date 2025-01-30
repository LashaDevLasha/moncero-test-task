import React, { useEffect, useState } from "react";
import styles from "@/styles/Chart.module.css";
import LineChart from "@/components/UI/LineChart";
import { getChartData } from "@/services/chart/charts";

const Chart: React.FC = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const interval = "d1"; 

  const currentTimestamp = Date.now(); 
  const sevenDaysAgoTimestamp = currentTimestamp - 7 * 24 * 60 * 60 * 1000;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chartData = await getChartData({
          assetId: "bitcoin",
          interval,
          start: sevenDaysAgoTimestamp, 
          end: currentTimestamp, 
        });
        console.log(chartData);

        const priceData = chartData.data.map((item) => parseFloat(item.priceUsd));
        const timeLabels = chartData.data.map((item) => new Date(item.time).toLocaleDateString()); 

        setLabels(timeLabels); 
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
    <main className={styles.main} style={{ marginTop: "100px" }}>
      <LineChart labels={labels} data={data} title={title} />
    </main>
  );
};

export default Chart;
