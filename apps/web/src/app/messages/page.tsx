'use client';

import React, { useState } from 'react';

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState('conv-1');
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      sender: 'ShadowBroker [Director]',
      senderType: 'director',
      time: '11:24 AM',
      text: 'Hey! Saw your stats match on our 10★ Oil Rig. Can you confirm your current work stats and daily active hours?',
    },
    {
      id: 2,
      sender: 'You',
      senderType: 'you',
      time: '11:32 AM',
      text: 'Hi! Yes, I have 52k MAN and 65k END. I am active at every Torn energy refill and available on Discord.',
    },
    {
      id: 3,
      sender: 'ShadowBroker [Director]',
      senderType: 'director',
      time: '11:35 AM',
      text: 'Perfect. We have a spot opening today after the company train cycle. Submit your application on Torn and I will accept it right away.',
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages([
      ...messages,
      {
        id: Date.now(),
        sender: 'You',
        senderType: 'you',
        time: 'Just now',
        text: inputText,
      },
    ]);
    setInputText('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-black text-white">Platform Messages</h1>
            <p className="text-xs text-slate-400">Direct communication with company directors, faction leaders, and marketplace buyers</p>
          </div>
          <a
            href="/"
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300"
          >
            ← Back to Home
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[650px]">
          {/* Conversation List */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-2 overflow-y-auto">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Active Conversations</h3>

            <div
              onClick={() => setActiveConversation('conv-1')}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                activeConversation === 'conv-1'
                  ? 'bg-amber-500/10 border-amber-500/40'
                  : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-xs">ShadowBroker [2841920]</span>
                <span className="text-[10px] text-amber-400 font-semibold">11:35 AM</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 truncate">
                Director • Apex Petroleum Corp (10★ Oil Rig)
              </p>
              <p className="text-xs text-slate-300 mt-1 truncate">
                Perfect. We have a spot opening today after...
              </p>
            </div>

            <div
              onClick={() => setActiveConversation('conv-2')}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                activeConversation === 'conv-2'
                  ? 'bg-amber-500/10 border-amber-500/40'
                  : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-xs">FireBrand [840192]</span>
                <span className="text-[10px] text-slate-500">Yesterday</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 truncate">
                Seller • Phoenix Resurgence Faction Listing
              </p>
              <p className="text-xs text-slate-300 mt-1 truncate">
                Offer received for $1.1B. Can we counter at $1.15B?
              </p>
            </div>
          </div>

          {/* Chat Window */}
          <div className="md:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-white">ShadowBroker [2841920]</h4>
                <p className="text-xs text-amber-400">Director of Apex Petroleum Corp • Verified</p>
              </div>
              <a
                href="https://www.torn.com/profiles.php?XID=2841920"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-lg text-xs font-semibold border border-slate-700 bg-slate-800 text-slate-300"
              >
                Torn Profile ↗
              </a>
            </div>

            {/* Message Thread */}
            <div className="p-4 space-y-3 overflow-y-auto flex-1">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.senderType === 'you' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold text-slate-400">{m.sender}</span>
                    <span className="text-[10px] text-slate-500">{m.time}</span>
                  </div>
                  <div
                    className={`p-3 rounded-2xl max-w-md text-xs leading-relaxed ${
                      m.senderType === 'you'
                        ? 'bg-amber-500 text-slate-950 font-medium'
                        : 'bg-slate-950 border border-slate-800 text-slate-200'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-950 flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message to the director..."
                className="flex-1 h-11 px-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-5 h-11 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs shadow-md shadow-amber-500/20"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
