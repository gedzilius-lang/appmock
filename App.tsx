
import React, { useState, useEffect } from 'react';
import { Tab, User, Product, Club } from './types';
import { mockUser, clubs } from './services/mockData';
import Header from './components/Header';
import HomeTab from './tabs/HomeTab';
import RadioTab from './tabs/RadioTab';
import NetworkTab from './tabs/NetworkTab';
import ProfileTab from './tabs/ProfileTab';
import { THUMBNAIL_PATTERNS } from './components/Thumbnails';

// --- MODAL COMPONENTS ---

const PurchaseModal: React.FC<{ product: Product; user: User; onConfirm: (cost: number) => void; onCancel: () => void }> = ({ product, user, onConfirm, onCancel }) => {
    const Thumbnail = THUMBNAIL_PATTERNS[product.id % THUMBNAIL_PATTERNS.length];

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-fade-in">
            <div className="bg-gray-900 rounded-2xl w-full max-w-md border border-purple-500/30 shadow-[0_0_50px_rgba(139,92,246,0.2)] overflow-hidden">
                {/* Image Header */}
                <div className="relative h-48 bg-black overflow-hidden border-b border-gray-800">
                    <Thumbnail className="w-full h-full text-purple-600 opacity-40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                    {product.limitedEdition && (
                        <div className="absolute top-4 right-4 bg-purple-600 text-white text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase animate-pulse">
                            Limited Edition
                        </div>
                    )}
                    <div className="absolute bottom-4 left-4">
                        <p className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">{product.vendorName}</p>
                        <h2 className="text-2xl font-bold text-white leading-tight">{product.name}</h2>
                    </div>
                </div>

                <div className="p-6">
                    <div className="mb-6">
                        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Description</h3>
                        <p className="text-gray-200 text-sm leading-relaxed">{product.description}</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">Key Details</h3>
                        <div className="grid grid-cols-1 gap-2">
                            {product.keyInfo.map((info, i) => (
                                <div key={i} className="flex items-center text-sm text-gray-300 bg-gray-800/50 p-2 rounded-lg border border-gray-700/50">
                                    <span className="text-purple-500 mr-2">✦</span>
                                    {info}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-purple-900/10 border border-purple-500/20 rounded-xl p-4 mb-6 flex justify-between items-center">
                        <div>
                            <p className="text-xs text-purple-300 font-bold uppercase tracking-widest mb-1">Price</p>
                            <p className="text-3xl font-black text-white">{product.price} <span className="text-sm font-normal text-purple-400">CC</span></p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Your Balance</p>
                            <p className="text-lg font-bold text-gray-300">{user.ccBalance} CC</p>
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <button 
                            onClick={onCancel} 
                            className="flex-1 bg-gray-800 text-gray-300 py-4 rounded-xl font-bold hover:bg-gray-700 transition-colors border border-gray-700"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={() => onConfirm(product.price)}
                            disabled={user.ccBalance < product.price}
                            className="flex-[2] bg-purple-600 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-purple-600/20 enabled:hover:bg-purple-500 enabled:hover:scale-[1.02] disabled:bg-gray-700 disabled:opacity-50 disabled:grayscale cursor-pointer disabled:cursor-not-allowed"
                        >
                            {user.ccBalance >= product.price ? 'Purchase Item' : 'Insufficient Balance'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ClubProfile: React.FC<{ club: Club, onBack: () => void, onPoke: (clubName: string) => void }> = ({ club, onBack, onPoke }) => (
    <div className="bg-black min-h-screen text-white pb-24 p-4 animate-fade-in">
        <header className="flex items-center mb-6">
            <button onClick={onBack} className="text-purple-400 p-2 -ml-2 mr-2">&larr; Back</button>
            <h1 className="text-3xl font-bold text-purple-500">{club.name}</h1>
        </header>
        <button onClick={() => onPoke(club.name)} className="w-full mb-6 bg-purple-600/80 p-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">Poke Subscribers</button>
        <div className="space-y-6">
            <h2 className="text-xl font-bold">Feed</h2>
            {club.feed.length > 0 ? club.feed.map(post => (
                 <div key={post.id} className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                    {post.imageUrl && <img src={post.imageUrl} alt="Post image" className="rounded-md mb-3" />}
                    <p className="text-gray-300">{post.content}</p>
                    <p className="text-xs text-gray-500 mt-2">{post.author} &middot; {post.timestamp}</p>
                 </div>
            )) : <p className="text-gray-500">No posts yet. Stay tuned!</p>}
        </div>
    </div>
);

// --- MAIN APP ---

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>(mockUser);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Home);
  const [view, setView] = useState<{ type: 'main' | 'clubProfile', data: any }>({ type: 'main', data: null });
  const [modal, setModal] = useState<{ type: 'none' | 'purchase', data: any }>({ type: 'none', data: null });
  const [notification, setNotification] = useState<string>('');

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handlePurchase = (product: Product) => {
    setModal({ type: 'purchase', data: product });
  };
  
  const handleConfirmPurchase = (cost: number) => {
    const product = modal.data as Product;
    setCurrentUser(prev => ({...prev, ccBalance: prev.ccBalance - cost}));
    setModal({ type: 'none', data: null });
    setNotification(`Purchase successful! "${product.name}" is yours.`);
  };
  
  const handleSelectClub = (clubId: number) => {
    const club = clubs.find(c => c.id === clubId);
    if (club) {
      setView({ type: 'clubProfile', data: club });
    }
  };

  const handlePoke = (target: string) => {
      setNotification(`You poked ${target}!`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case Tab.Home:
        return <HomeTab onPurchase={handlePurchase} onSelectClub={handleSelectClub} user={currentUser} />;
      case Tab.Radio:
        return <RadioTab />;
      case Tab.Network:
        return <NetworkTab />;
      case Tab.Profile:
        return <ProfileTab onPoke={handlePoke} />;
      default:
        return <HomeTab onPurchase={handlePurchase} onSelectClub={handleSelectClub} user={currentUser} />;
    }
  };

  if (view.type === 'clubProfile') {
    return <ClubProfile club={view.data} onBack={() => setView({type: 'main', data: null})} onPoke={handlePoke} />;
  }

  return (
    <div className="bg-black min-h-screen">
      {/* Notification Popup */}
      {notification && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[110] animate-fade-in-down">
            {notification}
        </div>
      )}
      
      {/* Modals */}
      {modal.type === 'purchase' && (
        <PurchaseModal 
            product={modal.data} 
            user={currentUser}
            onConfirm={handleConfirmPurchase} 
            onCancel={() => setModal({ type: 'none', data: null })} 
        />
      )}

      {/* Main Content */}
      <main>
        {renderContent()}
      </main>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
       <style>{`
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        @keyframes fade-in-down { 0% { opacity: 0; transform: translate(-50%, -20px); } 100% { opacity: 1; transform: translate(-50%, 0); } }
        .animate-fade-in-down { animation: fade-in-down 0.5s ease-out; }
      `}</style>
    </div>
  );
};

export default App;
