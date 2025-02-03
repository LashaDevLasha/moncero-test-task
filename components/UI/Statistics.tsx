import React from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Statistic } from "antd/lib";
import useWindowSize from "@/hooks/window-size";

interface StatisticsProps {
  value: string;
}

const Statistics: React.FC<StatisticsProps> = ({ value }) => {
  const { width } = useWindowSize();
  const fontSize = width < 768 ? "12px" : "17px";

  const percentageChange = parseFloat(value);
  const isPositive = percentageChange >= 0;

  return (
    <Statistic
      value={Math.abs(percentageChange)}
      precision={2}
      valueStyle={{ color: isPositive ? "#3f8600" : "#cf1322", fontSize }}
      prefix={isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
      suffix="%"
    />
  );
};

export default Statistics;
