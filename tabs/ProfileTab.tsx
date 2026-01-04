
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { mockUser, mockSecurityUser, mockDoorStaffUser, mockBarStaffUser, mockEventHostUser, mockAdminUser, mockRunnerUser, mockTransactions } from '../services/mockData';
import EventOverview from '../components/dashboards/EventHost/EventOverview';
import DataInsights from '../components/dashboards/EventHost/DataInsights';
import GuestListManagement from '../components/dashboards/EventHost/GuestListManagement';

// --- SHARED COMPONENTS ---
const ActionButton: React.FC<{ children: React.ReactNode; onClick?: () => void; isActive?: boolean, className?: string }> = ({ children, onClick, isActive, className = '' }) => (
    <button onClick={onClick} className={`w-full text-left p-3 rounded-lg font-semibold transition-colors shadow-md shadow-purple-900/30 ${isActive ? 'bg-purple-700 text-white' : 'bg-purple-600 text-white hover:bg-purple-700'} ${className}`}>
        {children}
    </button>
);

const FullscreenModal: React.FC<{ title: string; onClose: () => void; children: React.ReactNode }> = ({ title, onClose, children }) => (
    <div className="fixed inset-0 bg-black z-50 p-4 animate-fade-in">
        <header className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-purple-500">{title}</h2>
            <button onClick={onClose} className="bg-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-600">Close</button>
        </header>
        <div className="bg-gray-900 rounded-lg p-4 h-[calc(100vh-100px)] overflow-y-auto no-scrollbar">{children}</div>
    </div>
);

// --- NFC Handler ---
const handleNfcScan = async () => {
    if ('NDEFReader' in window) {
        try {
            // @ts-ignore
            const ndef = new NDEFReader();
            await ndef.scan();
            alert("NFC Scan Started. Hold a tag near your device.");
            // @ts-ignore
            ndef.onreading = event => {
                const decoder = new TextDecoder();
                for (const record of event.message.records) {
                    alert(`NFC Tag Read: ${decoder.decode(record.data)}`);
                }
            };
        } catch (error) {
            console.error("NFC Scan error:", error);
            alert(`Error starting NFC scan: ${error}`);
        }
    } else {
        alert("Web NFC is not supported on this device/browser.");
    }
};

const ProductManifesto: React.FC = () => {
    const manifestoText = `
CLUBJOIN: PRODUCT MANIFESTO & MANUAL
====================================

1. VISION
ClubJoin is a hyper-local social ecosystem designed for the nightlife industry.
It bridges the gap between digital social networking and physical event operations.

2. CORE PILLARS
- DISCOVERY: Seamless event browsing and venue exploration.
- ECONOMY: The ClubCoin (CC) system rewards loyalty and drives secondary sales.
- OPERATIONS: Specialized tools for Security, Door Staff, and Runners.
- ANALYTICS: Real-time BI for Event Hosts and Promoters.

3. TECHNICAL SPECIFICATIONS
- Platform: Progressive Web App (PWA)
- Core Tech: React 19, Tailwind CSS, Web NFC API
- Offline Mode: Service Worker enabled for assets and image caching.
- Security: Role-based access control (RBAC) for staff dashboards.

4. USER GUIDE
- HOME: View weekend events and shop the CC Market.
- RADIO: Interact with live streams and studio DJs.
- NETWORK: Engage in community chat and read local news.
- PROFILE: Manage your digital identity or access staff tools.

(c) 2024 ClubJoin Engineering & Product.
    `;

    const downloadManifesto = () => {
        const element = document.createElement("a");
        const file = new Blob([manifestoText], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "ClubJoin_Product_Manual.txt";
        document.body.appendChild(element);
        element.click();
    };

    return (
        <div className="space-y-4 text-gray-300">
            <div className="bg-purple-900/20 border border-purple-500/50 p-4 rounded-lg">
                <h3 className="text-white font-bold mb-2">Internal Project Breakdown</h3>
                <p className="text-sm">This document serves as the final specification for the ClubJoin ecosystem.</p>
                <button 
                    onClick={downloadManifesto}
                    className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-bold w-full transition-colors"
                >
                    Download .TXT Manual
                </button>
            </div>
            <pre className="text-[10px] leading-relaxed font-mono bg-black p-4 rounded border border-gray-800 overflow-x-auto whitespace-pre-wrap">
                {manifestoText}
            </pre>
        </div>
    );
}


// --- DASHBOARDS ---
const UserDashboard: React.FC<{ user: User; onLogout: () => void; onPoke: (friendName: string) => void; }> = ({ user, onLogout, onPoke }) => {
    const handleContactStaff = () => {
        if (window.confirm("This will send an alert to security and event staff. Are you sure you need immediate assistance?")) {
            alert("Security has been alerted. Calling now...");
            window.location.href = "tel:+41791234567"; // Dummy security number
        }
    };
    
    return (
    <div className="p-4 space-y-6">
        <div className="flex items-center space-x-4">
            <img src={user.avatarUrl} alt={user.nickname} className="w-20 h-20 rounded-full border-2 border-purple-500" />
            <div>
                <h2 className="text-2xl font-bold text-white">{user.nickname}</h2>
                <p className="text-purple-400">Level {user.level}</p>
            </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-gray-900 p-4 rounded-lg">
                <p className="text-2xl font-bold text-purple-400">{user.xp}</p>
                <p className="text-sm text-gray-400">XP Points</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
                <p className="text-2xl font-bold text-purple-400">{user.ccBalance}</p>
                <p className="text-sm text-gray-400">ClubCoins</p>
            </div>
        </div>
        
        <ActionButton onClick={handleNfcScan}>Scan Other User</ActionButton>
        
        <div>
            <h3 className="text-lg font-semibold mb-2">Friends</h3>
            <div className="space-y-2">
                {user.friends.map(friend => (
                    <div key={friend.id} className="bg-gray-900 p-2 rounded-md flex justify-between items-center">
                        <div className="flex items-center">
                            <img src={friend.avatarUrl} alt={friend.nickname} className="w-10 h-10 rounded-full mr-3"/>
                            <div>
                                <p className="text-white font-semibold">{friend.nickname}</p>
                                <p className="text-xs text-gray-500">Last at: {friend.lastCheckIn.venueName}</p>
                            </div>
                        </div>
                        <button onClick={() => onPoke(friend.nickname)} className="bg-purple-600/50 text-white text-xs font-bold px-3 py-1 rounded-full hover:bg-purple-700/80">Poke</button>
                    </div>
                ))}
            </div>
        </div>
        
        <div className="space-y-3 pt-4 border-t border-gray-800">
             <ActionButton onClick={handleContactStaff} className="bg-red-600 hover:bg-red-700 text-center">Contact Staff (Emergency)</ActionButton>
             <button onClick={onLogout} className="w-full bg-gray-700 p-3 rounded-lg font-semibold hover:bg-gray-600">Logout</button>
        </div>
    </div>
    );
};

const SecurityDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => (
    <div className="p-4 bg-black min-h-screen">
        <h2 className="text-xl font-bold text-white text-center my-3">Security Panel</h2>
        <div className="space-y-3 mt-6">
            <ActionButton>Call Crew Assistance</ActionButton>
            <ActionButton>Create Incident Report</ActionButton>
            <ActionButton>View Live Camera Feeds</ActionButton>
            <ActionButton>Access Control Override</ActionButton>
        </div>
        <div className="mt-6">
             <h4 className="text-md font-semibold text-white mb-2 text-center">Venue Heatmap</h4>
             <div className="w-full h-48 bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-purple-800">
                <p className="text-gray-500">Live Heatmap Placeholder</p>
            </div>
        </div>
        <div className="pt-8 flex justify-center">
            <button onClick={handleNfcScan} className="bg-purple-600 text-white rounded-full w-40 h-40 flex flex-col items-center justify-center font-bold text-2xl hover:bg-purple-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-900/50">
               <span>SCAN</span>
               <span className="text-4xl">TAG</span>
            </button>
        </div>
        <button onClick={onLogout} className="w-full mt-8 bg-gray-700 p-3 rounded-lg font-semibold hover:bg-gray-600">Logout</button>
    </div>
);

const DoorStaffDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => (
    <div className="p-4 bg-black min-h-screen">
        <h2 className="text-xl font-bold text-white text-center my-3">Door Staff Panel</h2>
        <div className="space-y-3 mt-6">
            <ActionButton onClick={handleNfcScan}>Scan Entry (NFC)</ActionButton>
            <ActionButton>Read Card Data (NFC)</ActionButton>
            <ActionButton>Guest List Search</ActionButton>
            <ActionButton>Real-Time Capacity</ActionButton>
        </div>
        <button onClick={onLogout} className="w-full mt-8 bg-gray-700 p-3 rounded-lg font-semibold hover:bg-gray-600">Logout</button>
    </div>
);

const RunnerDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const [showStockModal, setShowStockModal] = useState(false);
    // Explicitly define type for initialStock to help with type inference in State and Object.entries
    const initialStock: Record<string, number> = { 'Club Mate': 80, 'Beer': 65, 'Vodka': 30, 'Water': 40, 'Red Bull': 25 };
    const [stock, setStock] = useState<Record<string, number>>(initialStock);

    const handleUpdateStock = (items: string[]) => {
        alert(`Notification sent to bar staff for low stock: ${items.join(', ')}`);
        setShowStockModal(false);
    }

    const StockModal: React.FC<{onClose: () => void, onUpdate: (items: string[]) => void}> = ({onClose, onUpdate}) => {
        const [selected, setSelected] = useState<string[]>([]);
        const toggleItem = (item: string) => {
            setSelected(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
        }
        return (
            <FullscreenModal title="Update Bar Stock" onClose={onClose}>
                <p className="text-gray-400 mb-4">Select items that are running low to notify the bar.</p>
                <div className="space-y-2">
                    {Object.keys(initialStock).map(item => (
                        <button key={item} onClick={() => toggleItem(item)}
                            className={`w-full text-left p-4 rounded-lg transition-colors ${selected.includes(item) ? 'bg-purple-600 text-white' : 'bg-gray-800'}`}>
                            {item}
                        </button>
                    ))}
                </div>
                <button onClick={() => onUpdate(selected)} className="w-full mt-6 bg-green-600 text-white p-4 rounded-lg font-semibold hover:bg-green-700" disabled={selected.length === 0}>Submit Update</button>
            </FullscreenModal>
        )
    };

    return (
        <div className="p-4 bg-black min-h-screen">
             {showStockModal && <StockModal onClose={() => setShowStockModal(false)} onUpdate={handleUpdateStock} />}
            <h2 className="text-xl font-bold text-white text-center my-3">Runner Panel</h2>
            <div className="space-y-6 mt-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Live Stock Levels</h3>
                    <div className="space-y-3 bg-gray-900 p-4 rounded-lg">
                        {Object.entries(stock).map(([item, countVal]) => {
                            // Fix: Operator '>' cannot be applied to types 'unknown' and 'number'.
                            // Explicitly casting to number.
                            const count = countVal as number;
                            return (
                                <div key={item}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-white">{item}</span>
                                        <span className="text-gray-400">{count}%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                                        <div className={`h-2.5 rounded-full ${count > 50 ? 'bg-green-500' : count > 25 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{width: `${count}%`}}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <ActionButton onClick={() => setShowStockModal(true)}>Update Bar with Stock</ActionButton>
            </div>
            <button onClick={onLogout} className="w-full mt-8 bg-gray-700 p-3 rounded-lg font-semibold hover:bg-gray-600">Logout</button>
        </div>
    );
};


type EventHostView = 'overview' | 'insights' | 'guestlist' | 'manifesto';

const EventHostDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const [view, setView] = useState<EventHostView>('overview');
    const [showFeed, setShowFeed] = useState(false);

    const navigation = {
        'overview': 'Real-Time Overview',
        'insights': 'Data Insights',
        'guestlist': 'Guest List & VIP',
        'manifesto': 'Product Manifesto',
    };

    const renderView = () => {
        switch(view) {
            case 'overview': return <EventOverview onShowLiveFeed={() => setShowFeed(true)} />;
            case 'insights': return <DataInsights />;
            case 'guestlist': return <GuestListManagement />;
            case 'manifesto': return <ProductManifesto />;
            default: return <EventOverview onShowLiveFeed={() => setShowFeed(true)} />;
        }
    }

    return (
        <div className="p-4 bg-black min-h-screen space-y-6">
            {showFeed && <FullscreenModal title="Live Transaction Feed" onClose={() => setShowFeed(false)}>
                 <div className="font-mono text-sm text-gray-400 space-y-2">
                    {[...mockTransactions, ...mockTransactions, ...mockTransactions].map((tx, i) => (
                         <div key={`${tx.id}-${i}`}>
                            <span className="text-purple-400">[{tx.timestamp}]</span>
                            <span className="text-white"> {tx.cardHolder} </span>
                            <span>@{tx.location}: </span>
                            <span>{tx.description}</span>
                            {tx.value && <span className="text-green-400"> +CHF {tx.value}</span>}
                        </div>
                    ))}
                 </div>
                </FullscreenModal>}

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-lg shadow-purple-900/20 text-center">
                <h2 className="text-xl font-bold text-white">Event Host Panel</h2>
                <p className="text-sm text-gray-400">Plaza Klub - Live Event</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
                {Object.entries(navigation).map(([key, text]) => (
                    <ActionButton 
                        key={key} 
                        onClick={() => setView(key as EventHostView)}
                        isActive={view === key}
                        className="text-xs py-2"
                    >
                        {text}
                    </ActionButton>
                ))}
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 mt-4 min-h-[400px]">
                 {renderView()}
            </div>
            
            <button onClick={onLogout} className="w-full bg-gray-700 p-3 rounded-lg font-semibold hover:bg-gray-600">Logout</button>
        </div>
    );
};

const LoginScreen: React.FC<{ onLogin: (role: UserRole) => void }> = ({ onLogin }) => (
    <div className="flex flex-col justify-center items-center h-full p-4">
        <h2 className="text-2xl font-bold text-white mb-2">Select Your Role</h2>
        <p className="text-gray-400 mb-8 text-center">Choose your login profile to continue.</p>
        <div className="w-full max-w-sm space-y-3">
            <button onClick={() => onLogin(UserRole.User)} className="w-full bg-purple-600 p-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-transform hover:scale-105">User</button>
            <button onClick={() => onLogin(UserRole.Security)} className="w-full bg-purple-600 p-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-transform hover:scale-105">Security</button>
            <button onClick={() => onLogin(UserRole.DoorStaff)} className="w-full bg-purple-600 p-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-transform hover:scale-105">Door Staff</button>
            <button onClick={() => onLogin(UserRole.Runner)} className="w-full bg-purple-600 p-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-transform hover:scale-105">Runner</button>
            <button onClick={() => onLogin(UserRole.EventHost)} className="w-full bg-purple-600 p-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-transform hover:scale-105">Event Host (Admin)</button>
        </div>
    </div>
);


const ProfileTab: React.FC<{ onPoke: (name: string) => void }> = ({ onPoke }) => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    const handleLogin = (role: UserRole) => {
        switch (role) {
            case UserRole.User: setLoggedInUser(mockUser); break;
            case UserRole.Security: setLoggedInUser(mockSecurityUser); break;
            case UserRole.DoorStaff: setLoggedInUser(mockDoorStaffUser); break;
            case UserRole.BarStaff: setLoggedInUser(mockBarStaffUser); break;
            case UserRole.EventHost: setLoggedInUser(mockEventHostUser); break;
            case UserRole.Admin: setLoggedInUser(mockAdminUser); break;
            case UserRole.Runner: setLoggedInUser(mockRunnerUser); break;
            default: setLoggedInUser(null);
        }
    };

    const handleLogout = () => {
        setLoggedInUser(null);
    };

    const renderContent = () => {
        if (!loggedInUser) {
            return <div className="flex items-center justify-center min-h-[calc(100vh-80px)]"><LoginScreen onLogin={handleLogin} /></div>;
        }
        
        switch(loggedInUser.role) {
            case UserRole.User: return <UserDashboard user={loggedInUser} onLogout={handleLogout} onPoke={onPoke} />;
            case UserRole.Security: return <SecurityDashboard onLogout={handleLogout} />;
            case UserRole.DoorStaff: return <DoorStaffDashboard onLogout={handleLogout} />;
            case UserRole.Runner: return <RunnerDashboard onLogout={handleLogout} />;
            case UserRole.EventHost: return <EventHostDashboard onLogout={handleLogout} />;
            default: return <div className="flex items-center justify-center min-h-[calc(100vh-80px)]"><LoginScreen onLogin={handleLogin} /></div>;
        }
    };

    return (
        <div className="pb-24 text-white bg-black min-h-screen">
             <style>{`.animate-fade-in { animation: fade-in 0.5s ease-out; } @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }`}</style>
            {renderContent()}
        </div>
    );
};

export default ProfileTab;
