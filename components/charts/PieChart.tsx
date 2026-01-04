import React from 'react';
import { ChartDataPoint } from '../../types';

interface PieChartProps {
    data: ChartDataPoint[];
    title: string;
}

const PieChart: React.FC<PieChartProps> = ({ data, title }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulative = 0;

    const colors = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe'];

    return (
        <div>
            <h4 className="text-md font-semibold text-white mb-2">{title}</h4>
            <div className="flex items-center space-x-4">
                <div className="relative w-40 h-40">
                    <svg viewBox="0 0 32 32" className="transform -rotate-90">
                        {data.map((item, index) => {
                            const percentage = (item.value / total) * 100;
                            const dashArray = `${percentage} ${100 - percentage}`;
                            const dashOffset = -cumulative;
                            cumulative += percentage;
                            return (
                                <circle
                                    key={index}
                                    r="15.9"
                                    cx="16"
                                    cy="16"
                                    fill="transparent"
                                    stroke={colors[index % colors.length]}
                                    strokeWidth="32"
                                    strokeDasharray={dashArray}
                                    strokeDashoffset={dashOffset}
                                />
                            );
                        })}
                    </svg>
                </div>
                <div className="text-sm space-y-1">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center">
                            <span className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: colors[index % colors.length] }}></span>
                            <span className="text-gray-300">{item.name}:</span>
                            <span className="text-white font-semibold ml-1">{((item.value / total) * 100).toFixed(0)}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PieChart;
