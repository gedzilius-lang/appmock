import React from 'react';
import { ChartDataPoint } from '../../types';

interface LineChartProps {
  data: ChartDataPoint[];
  title: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, title }) => {
  const maxValue = Math.max(...data.map(d => d.value), 0);
  const points = data.map((point, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - (point.value / maxValue) * 100;
      return `${x},${y}`;
  }).join(' ');

  return (
    <div>
        <h4 className="text-md font-semibold text-white mb-2">{title}</h4>
        <div className="bg-gray-800 p-2 rounded-lg">
            <svg viewBox="0 0 100 100" className="w-full h-48">
                <polyline
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                    points={points}
                />
            </svg>
        </div>
    </div>
  );
};

export default LineChart;
