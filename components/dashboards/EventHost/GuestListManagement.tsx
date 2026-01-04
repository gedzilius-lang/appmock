import React, { useState } from 'react';
import { mockGuestList } from '../../../services/mockData';
import { Guest, GuestStatus } from '../../../types';

const GuestRow: React.FC<{ guest: Guest }> = ({ guest }) => {
    const statusColor = {
        [GuestStatus.Pending]: 'bg-yellow-500',
        [GuestStatus.CheckedIn]: 'bg-green-500',
        [GuestStatus.VIP]: 'bg-purple-500',
    };
    return (
        <div className="flex items-center justify-between p-2 bg-gray-800 rounded-md">
            <div>
                <p className="font-semibold text-white">{guest.name} {guest.plusOnes > 0 && `(+${guest.plusOnes})`}</p>
                <p className="text-xs text-gray-400">{guest.checkInTime ? `Checked in @ ${guest.checkInTime}` : 'Awaiting arrival'}</p>
            </div>
            <div className="flex items-center">
                <span className={`px-2 py-1 text-xs font-bold text-white rounded-full ${statusColor[guest.status]}`}>
                    {guest.status}
                </span>
            </div>
        </div>
    )
};

const GuestListManagement: React.FC = () => {
    const [guests, setGuests] = useState<Guest[]>(mockGuestList);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredGuests = guests.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return (
        <div className="space-y-6">
            <h3 className="font-bold text-lg text-purple-400">Guest List & VIP Management</h3>
            
            <input 
                type="text"
                placeholder="Search guest..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="space-y-2">
                {filteredGuests.map(guest => <GuestRow key={guest.id} guest={guest} />)}
            </div>
            
            <div className="flex space-x-2 mt-4">
                 <button className="w-full bg-purple-600 p-3 rounded-lg font-semibold hover:bg-purple-700">Add Guest</button>
                 <button className="w-full bg-gray-700 p-3 rounded-lg font-semibold hover:bg-gray-600">Import CSV</button>
            </div>
        </div>
    );
};

export default GuestListManagement;
