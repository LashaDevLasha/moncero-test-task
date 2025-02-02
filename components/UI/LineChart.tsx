import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  TooltipItem,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
);

interface LineChartProps {
  labels: string[];
  data: number[];
  title: string;
}

function LineChart({ labels, data, title }: LineChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        pointBackgroundColor: "rgb(75, 192, 192)",
        pointHoverBackgroundColor: "rgb(255, 99, 132)",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: true,
        intersect: false,
        callbacks: {
          label: function (tooltipItem: TooltipItem<"line">) {
            return `Value: ${tooltipItem.raw as number}`;
          },
        },
      },  
    },
    hover: {
      mode: "nearest" as const,
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "white", 
        },
      },
      y: {
        grid: {
          display: true,
          color: "rgba(255, 255, 255, 0.1)", 
        },

        ticks: {
          color: "white", 
        },
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default LineChart;
