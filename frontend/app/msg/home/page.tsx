'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  MoreVertical, 
  MessageSquarePlus, 
  CircleDashed, 
  Filter, 
  Send, 
  Smile, 
  Plus,
  ChevronLeft,
  CheckCheck
} from 'lucide-react';

// Types for our data
interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  online: boolean;
}

export default function WhatsAppClone() {
  const [activeChat, setActiveChat] = useState<string | null>('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  
  // Mock Data
  const chats: Chat[] = [
    { id: '1', name: 'Alex Rivera', lastMessage: 'Check out the new UI!', time: '10:45 AM', unread: 2, avatar: 'AR', online: true },
    { id: '2', name: 'Design Team', lastMessage: 'Meeting at 3 PM', time: '9:20 AM', unread: 0, avatar: 'DT', online: false },
    { id: '3', name: 'Sarah Jenkins', lastMessage: 'The assets are ready.', time: 'Yesterday', unread: 0, avatar: 'SJ', online: true },
  ];

  return (
    <div className="flex h-screen w-full bg-[#f0f2f5] dark:bg-[#111b21] overflow-hidden">
      
      {/* 1. UTILITY SIDEBAR (Slim) */}
      <div className="w-[60px] flex flex-col items-center py-4 bg-[#f0f2f5] dark:bg-[#202c33] border-r border-slate-300 dark:border-slate-700 justify-between">
        <div className="flex flex-col gap-6 text-slate-600 dark:text-slate-400">
          <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center cursor-pointer">
            <span className="text-xs font-bold">ME</span>
          </div>
          <MessageSquarePlus className="cursor-pointer hover:text-green-500" size={24} />
          <CircleDashed className="cursor-pointer hover:text-green-500" size={24} />
        </div>
        <Settings size={24} className="text-slate-600 dark:text-slate-400 cursor-pointer" />
      </div>

      {/* 2. CONVERSATIONS LIST (WhatsApp Sidebar) */}
      <aside className="w-full max-w-[400px] flex flex-col bg-white dark:bg-[#111b21] border-r border-slate-300 dark:border-slate-700">
        <header className="p-4 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold dark:text-white">Chats</h1>
            <div className="flex gap-4 dark:text-slate-300">
              <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                <MessageSquarePlus size={20} title="New Chat" />
              </button>
              <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                <Search size={16} />
              </span>
              <input 
                type="text"
                placeholder="Search or start new chat"
                className="w-full pl-10 pr-4 py-1.5 bg-slate-100 dark:bg-[#202c33] rounded-lg text-sm focus:outline-none dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Filter size={18} className="text-slate-500 cursor-pointer" />
          </div>
        </header>

        {/* List of Chats */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors border-b border-slate-50 dark:border-slate-800/50 ${
                activeChat === chat.id ? 'bg-slate-100 dark:bg-[#2a3942]' : 'hover:bg-slate-50 dark:hover:bg-[#202c33]'
              }`}
            >
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                  {chat.avatar}
                </div>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#111b21] rounded-full" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h3 className="font-medium text-slate-900 dark:text-slate-100 truncate">{chat.name}</h3>
                  <span className={`text-[11px] ${chat.unread > 0 ? 'text-green-500 font-bold' : 'text-slate-500'}`}>
                    {chat.time}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{chat.lastMessage}</p>
                  {chat.unread > 0 && (
                    <span className="bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* 3. ACTIVE CHAT AREA */}
      <main className="flex-1 flex flex-col bg-[#efeae2] dark:bg-[#0b141a] relative">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <header className="h-16 flex items-center justify-between px-4 bg-[#f0f2f5] dark:bg-[#202c33] border-l border-slate-300 dark:border-slate-700 z-10">
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
                  {chats.find(c => c.id === activeChat)?.avatar}
                </div>
                <div>
                  <h2 className="text-sm font-semibold dark:text-white leading-tight">
                    {chats.find(c => c.id === activeChat)?.name}
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">online</p>
                </div>
              </div>
              <div className="flex items-center gap-5 text-slate-500 dark:text-slate-400">
                <Search size={20} />
                <MoreVertical size={20} />
              </div>
            </header>

            {/* Messages Background with subtle WhatsApp pattern */}
            <div className="flex-1 overflow-y-auto p-8 space-y-2 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] opacity-[0.06] dark:opacity-[0.03] absolute inset-0 pointer-events-none" />
            
            <div className="flex-1 overflow-y-auto p-6 space-y-2 relative z-0">
              {/* Sample Message Bubble */}
              <div className="flex justify-start">
                <div className="bg-white dark:bg-[#202c33] dark:text-slate-200 px-3 py-1.5 rounded-lg rounded-tl-none shadow-sm max-w-md text-sm relative">
                  Hey! Did you see the new components?
                  <span className="text-[10px] text-slate-400 ml-2 mt-2 float-right uppercase">10:45 AM</span>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="bg-[#d9fdd3] dark:bg-[#005c4b] dark:text-slate-200 px-3 py-1.5 rounded-lg rounded-tr-none shadow-sm max-w-md text-sm relative">
                  Just looking at them now. They look clean!
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[10px] text-slate-500 dark:text-slate-300 uppercase">10:46 AM</span>
                    <CheckCheck size={14} className="text-blue-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Input Bar */}
            <footer className="px-4 py-2 bg-[#f0f2f5] dark:bg-[#202c33] flex items-center gap-3">
              <div className="flex gap-2 text-slate-500 dark:text-slate-400">
                <Smile size={24} className="cursor-pointer" />
                <Plus size={24} className="cursor-pointer" />
              </div>
              <input 
                type="text"
                placeholder="Type a message"
                className="flex-1 bg-white dark:bg-[#2a3942] dark:text-white px-4 py-2 rounded-lg text-sm focus:outline-none"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <button 
                className="p-2 bg-green-500 hover:bg-green-600 rounded-full text-white transition-colors"
                disabled={!messageInput.trim()}
              >
                <Send size={18} />
              </button>
            </footer>
          </>
        ) : (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
            <div className="w-64 h-64 bg-slate-200 dark:bg-slate-800 rounded-full mb-8 opacity-20" />
            <h2 className="text-2xl font-light text-slate-600 dark:text-slate-400">WhatsApp for Web</h2>
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-2 max-w-sm">
              Send and receive messages without keeping your phone online.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

function Settings({ className, size }: { className?: string, size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  );
}