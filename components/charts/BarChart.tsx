import React from 'react';
import { ChartDataPoint } from '../../types';

interface BarChartProps {
  data: ChartDataPoint[];
  title: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, title }) => {
  const maxValue = Math.max(...data.map(d => d.value), 0);

  return (
    <div>
      <h4 className="text-md font-semibold text-white mb-2">{title}</h4>
      <div className="bg-gray-800 p-4 rounded-lg space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="text-xs text-gray-400 w-24 truncate pr-2 text-right">{item.name}</div>
            <div className="flex-1 bg-gray-700 rounded-full h-4">
              <div
                className="bg-purple-600 h-4 rounded-full text-right pr-2 text-white text-xs flex items-center justify-end"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              >
                {item.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;
