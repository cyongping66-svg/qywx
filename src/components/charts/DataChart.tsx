import React from 'react';
import { Column, Line, Pie } from '@ant-design/charts';
import { Card, Select, Space } from 'antd';

interface DataItem {
  [key: string]: string | number;
}

interface ChartProps {
  data: DataItem[];
  type: 'column' | 'line' | 'pie';
  xField: string;
  yField: string;
}

export const DataChart: React.FC<ChartProps> = ({
  data,
  type,
  xField,
  yField,
}) => {
  const config = {
    data,
    xField,
    yField,
    meta: {
      [yField]: {
        alias: '數值',
      },
      [xField]: {
        alias: '類別',
      },
    },
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
  };

  const renderChart = () => {
    switch (type) {
      case 'column':
        return <Column {...config} />;
      case 'line':
        return <Line {...config} />;
      case 'pie':
        return (
          <Pie
            {...config}
            angleField={yField}
            colorField={xField}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="mt-4">
      <div className="mb-4">
        <Space>
          <Select
            defaultValue={type}
            style={{ width: 120 }}
            options={[
              { value: 'column', label: '柱狀圖' },
              { value: 'line', label: '折線圖' },
              { value: 'pie', label: '圓餅圖' },
            ]}
          />
        </Space>
      </div>
      <div className="h-[400px]">
        {renderChart()}
      </div>
    </Card>
  );
};