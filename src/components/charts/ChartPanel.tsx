import React from 'react';
import { DataChart } from '@/components/charts/DataChart';
import { Select, Space } from 'antd';

interface ChartPanelProps<T = number | string> {
  data: Record<string, T>[];
  columns: string[];
}

export const ChartPanel: React.FC<ChartPanelProps> = ({ data, columns }) => {
  const [xField, setXField] = React.useState(columns[0]);
  const [yField, setYField] = React.useState(columns[1]);
  const [chartType, setChartType] = React.useState<'column' | 'line' | 'pie'>('column');

  return (
    <div className="p-4">
      <div className="mb-4">
        <Space>
          <span>X軸：</span>
          <Select
            value={xField}
            style={{ width: 120 }}
            onChange={setXField}
            options={columns.map(col => ({ value: col, label: col }))}
          />
          <span>Y軸：</span>
          <Select
            value={yField}
            style={{ width: 120 }}
            onChange={setYField}
            options={columns.map(col => ({ value: col, label: col }))}
          />
          <span>圖表類型：</span>
          <Select
            value={chartType}
            style={{ width: 120 }}
            onChange={setChartType}
            options={[
              { value: 'column', label: '柱狀圖' },
              { value: 'line', label: '折線圖' },
              { value: 'pie', label: '圓餅圖' },
            ]}
          />
        </Space>
      </div>
      <DataChart
        data={data}
        type={chartType}
        xField={xField}
        yField={yField}
      />
    </div>
  );
};