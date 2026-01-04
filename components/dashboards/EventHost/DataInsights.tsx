import React from 'react';
import PieChart from '../../charts/PieChart';
import BarChart from '../../charts/BarChart';

const DataInsights: React.FC = () => {
    const ageDemographics = [
        { name: '18-24', value: 45 },
        { name: '25-30', value: 35 },
        { name: '31-40', value: 15 },
        { name: '40+', value: 5 },
    ];
    
    const locationDemographics = [
        { name: 'Zurich', value: 60 },
        { name: 'Winterthur', value: 15 },
        { name: 'Aargau', value: 10 },
        { name: 'Luzern', value: 5 },
        { name: 'Other', value: 10 },
    ];
    
    const peakHoursData = [
        { name: '23-00h', value: 120 },
        { name: '00-01h', value: 280 },
        { name: '01-02h', value: 350 },
        { name: '02-03h', value: 250 },
        { name: '03-04h', value: 150 },
    ];
    
    const guestFeedbackData = [
      { name: 'Music', value: 4.8 },
      { name: 'Ambiance', value: 4.5 },
      { name: 'Drinks', value: 4.2 },
      { name: 'Service', value: 4.6 },
    ]

    return (
        <div className="space-y-8">
             <h3 className="font-bold text-lg text-purple-400">Post-Event Analytics & Insights</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <PieChart title="Guest Age Demographics" data={ageDemographics} />
                <PieChart title="Guest Origin (Canton)" data={locationDemographics} />
            </div>

            <BarChart title="Peak Hour Attendance (Entries)" data={peakHoursData} />
            <BarChart title="Guest Satisfaction (Avg. Rating / 5)" data={guestFeedbackData} />

            <div>
                 <h4 className="text-md font-semibold text-white mb-2">Key Statistics</h4>
                 <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-gray-800 p-3 rounded-lg">
                        <p className="text-gray-400">Total Revenue</p>
                        <p className="text-white font-bold text-lg">CHF 18,753</p>
                    </div>
                     <div className="bg-gray-800 p-3 rounded-lg">
                        <p className="text-gray-400">Total Guests</p>
                        <p className="text-white font-bold text-lg">589</p>
                    </div>
                     <div className="bg-gray-800 p-3 rounded-lg">
                        <p className="text-gray-400">Avg. Spend / Head</p>
                        <p className="text-white font-bold text-lg">CHF 31.84</p>
                    </div>
                     <div className="bg-gray-800 p-3 rounded-lg">
                        <p className="text-gray-400">Top Selling Item</p>
                        <p className="text-white font-bold text-lg">Club Mate</p>
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default DataInsights;
