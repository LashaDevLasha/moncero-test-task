import React from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Statistic } from "antd";

interface StatisticsProps {
  value: string;
}

const Statistics: React.FC<StatisticsProps> = ({ value }) => {
  const percentageChange = parseFloat(value);
  const isPositive = percentageChange >= 0;

  return (
    <Statistic
      value={Math.abs(percentageChange)}
      precision={2}
      valueStyle={{ color: isPositive ? "#3f8600" : "#cf1322", fontSize: "17px" }}
      prefix={isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
      suffix="%"
    />
  );
};

export default Statistics;
