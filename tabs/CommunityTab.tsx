import React, { useState, useRef, useEffect } from 'react';
import { NetworkSubTab, ChatMessage } from '../types';
import { articles, newsItems, chatMessages as initialChatMessages, mockUser } from '../services/mockData';
import ArticleCard from '../components/ArticleCard';

const MagazineView: React.FC = () => (
  <div className="animate-fade-in">
    {articles.map(article => <ArticleCard key={article.id} article={article} />)}
  </div>
);

const NewsView: React.FC = () => (
  <div className="space-y-4 animate-fade-in">
    {newsItems.map(item => (
      <a key={item.id} href={item.link} className="block bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors border border-gray-800">
        <p className="text-white font-semibold">{item.title}</p>
        <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-purple-400 font-bold">{item.source}</span>
            <span className="text-xs text-gray-500">{item.timestamp}</span>
        </div>
      </a>
    ))}
  </div>
);

const ChatView: React.FC = () => {
    const channels = ["What’s Tonight?", "Lost & Found", "Saw You, But I Was Shy…"];
    const [activeChannel, setActiveChannel] = useState(channels[0]);
    const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(initialChatMessages);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, activeChannel]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const newMsg: ChatMessage = {
            id: Date.now(),
            author: { nickname: mockUser.nickname, avatarUrl: mockUser.avatarUrl },
            content: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => ({
            ...prev,
            [activeChannel]: [...(prev[activeChannel] || []), newMsg]
        }));
        setNewMessage('');
    };
    
    return (
        <div className="animate-fade-in flex flex-col h-[calc(100vh-260px)]">
            <div className="flex space-x-2 mb-4">
                {channels.map(channel => (
                    <button key={channel} onClick={() => setActiveChannel(channel)}
                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${activeChannel === channel ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>
                        #{channel}
                    </button>
                ))}
            </div>
            <div className="flex-grow bg-gray-900 border border-gray-800 rounded-lg p-4 overflow-y-auto no-scrollbar">
                {(messages[activeChannel] || []).map(msg => (
                    <div key={msg.id} className={`flex items-start mb-4 ${msg.author.nickname === mockUser.nickname ? 'justify-end' : ''}`}>
                         {msg.author.nickname !== mockUser.nickname && <img src={msg.author.avatarUrl} alt={msg.author.nickname} className="w-8 h-8 rounded-full mr-3" />}
                        <div className={`p-3 rounded-lg max-w-xs ${msg.author.nickname === mockUser.nickname ? 'bg-purple-700' : 'bg-gray-800'}`}>
                            <p className="text-white text-sm">{msg.content}</p>
                            <p className="text-xs text-gray-400 mt-1 text-right">{msg.author.nickname} @ {msg.timestamp}</p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="mt-4 flex space-x-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={`Message #${activeChannel}`}
                    className="flex-grow bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button type="submit" className="bg-purple-600 text-white font-semibold px-6 rounded-lg hover:bg-purple-700 transition-colors">Send</button>
            </form>
        </div>
    );
};


const NetworkTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<NetworkSubTab>(NetworkSubTab.Chat);

  const subTabs = [NetworkSubTab.Chat, NetworkSubTab.Magazine, NetworkSubTab.News];

  const renderContent = () => {
    switch (activeSubTab) {
      case NetworkSubTab.Magazine: return <MagazineView />;
      case NetworkSubTab.News: return <NewsView />;
      case NetworkSubTab.Chat: return <ChatView />;
      default: return <ChatView />;
    }
  };

  return (
    <div className="pb-24 text-white bg-black min-h-screen p-4">
        <h1 className="text-3xl font-bold text-purple-500 mb-6 mt-4">Network</h1>
      
        <div className="flex space-x-2 bg-gray-900 p-1 rounded-lg mb-6">
            {subTabs.map(tab => (
                 <button
                    key={tab}
                    onClick={() => setActiveSubTab(tab)}
                    className={`w-full py-2.5 text-sm font-medium leading-5 rounded-lg
                    transition-all duration-300
                    ${activeSubTab === tab ? 'bg-purple-600 shadow text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
                >
                    {tab}
                </button>
            ))}
        </div>
        
        <div>{renderContent()}</div>
        <style>{`.animate-fade-in { animation: fade-in 0.5s ease-out; } @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }`}</style>
    </div>
  );
};

export default NetworkTab;
