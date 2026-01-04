import React from 'react';
import LineChart from '../../charts/LineChart';
import BarChart from '../../charts/BarChart';
import { mockTransactions } from '../../../services/mockData';

const StatCard: React.FC<{ title: string, value: string, change?: string }> = ({ title, value, change }) => (
    <div className="bg-gray-800 p-4 rounded-lg text-center">
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
        {change && <p className={`text-xs mt-1 ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{change}</p>}
    </div>
);

interface EventOverviewProps {
    onShowLiveFeed: () => void;
}

const EventOverview: React.FC<EventOverviewProps> = ({ onShowLiveFeed }) => {
    const attendanceData = [
        { name: '22:00', value: 50 },
        { name: '23:00', value: 150 },
        { name: '00:00', value: 350 },
        { name: '01:00', value: 480 },
        { name: '02:00', value: 450 },
        { name: '03:00', value: 380 },
    ];
    
    const topSellersData = [
        { name: 'Club Mate', value: 85 },
        { name: 'Beer', value: 60 },
        { name: 'Vodka', value: 30 },
        { name: 'Water', value: 25 },
    ];

    return (
        <div className="space-y-6">
            <h3 className="font-bold text-lg text-purple-400">Live at Plaza Klub</h3>
            
            <div className="grid grid-cols-3 gap-4">
                <StatCard title="Total Revenue" value="CHF 12,450" change="+5% vs last hour" />
                <StatCard title="Live Attendance" value="482 / 600" />
                <StatCard title="Avg. Spend/Head" value="CHF 25.83" />
            </div>

            <LineChart title="Live Attendance" data={attendanceData} />
            
            <BarChart title="Top Sellers (Units)" data={topSellersData} />

            <div>
                <div className="flex justify-between items-center mb-2">
                    <h4 className="text-md font-semibold text-white">Live Transaction Feed</h4>
                    <button onClick={onShowLiveFeed} className="text-xs bg-purple-600 text-white px-3 py-1 rounded-full hover:bg-purple-700">Fullscreen</button>
                </div>
                 <div className="space-y-2 h-40 overflow-y-auto font-mono text-xs bg-gray-800 p-2 rounded-lg no-scrollbar">
                    {mockTransactions.map(tx => (
                        <div key={tx.id} className="text-gray-400">
                            <span className="text-purple-400">[{tx.timestamp}]</span>
                            <span className="text-white"> {tx.cardHolder} </span>
                            <span>@{tx.location}: </span>
                            <span>{tx.description}</span>
                            {tx.value && <span className="text-green-400"> +CHF {tx.value}</span>}
                        </div>
                    ))}
                 </div>
            </div>
        </div>
    );
};

export default EventOverview;
