import React from 'react';
import { Card } from 'antd/lib';

interface CustomCardProps {
  children: React.ReactNode;
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  boxShadow?: string;
  padding?: string;
}

const CustomCard: React.FC<CustomCardProps> = ({
  children,
  width = '90vw',
  height = '90vh',
  borderRadius = '8px',
  boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)',
  padding = '20px',
}) => {
  return (
    <Card
      style={{
        width,
        height,
        borderRadius,
        boxShadow,
        padding,
        overflow: 'hidden', 
      }}
    >
      {children}
    </Card>
  );
};

export default CustomCard;
