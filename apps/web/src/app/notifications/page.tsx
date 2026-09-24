'use client';

import React from 'react';

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: 'NEW_MATCH',
      title: 'New 10★ Company Match Found!',
      message: 'Apex Petroleum Corp (Oil Rig) has 2 vacancies that match your work stats (52k MAN, 65k END).',
      time: '15 minutes ago',
      unread: true,
      icon: '⚡',
      link: '/jobs',
    },
    {
      id: 2,
      type: 'OFFER_RECEIVED',
      title: 'Counter Offer Received on Marketplace Listing',
      message: 'FireBrand [840192] countered your offer for Phoenix Resurgence [PHX] with $1,150,000,000.',
      time: '1 hour ago',
      unread: true,
      icon: '💰',
      link: '/marketplace',
    },
    {
      id: 3,
      type: 'WATCHLIST_UPDATE',
      title: 'Tracked Organization Opening Detected',
      message: 'Sugar Rush Delights (Sweet Shop) has opened 1 new spot.',
      time: '3 hours ago',
      unread: false,
      icon: '🍬',
      link: '/companies',
    },
    {
      id: 4,
      type: 'APPLICATION_UPDATE',
      title: 'Application Status Updated',
      message: 'Director ShadowBroker has marked your interest as UNDER REVIEW.',
      time: 'Yesterday',
      unread: false,
      icon: '📋',
      link: '/applications',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-black text-white">Notifications</h1>
            <p className="text-xs text-slate-400">Real-time alerts for vacancy matches, offer counters, and application updates</p>
          </div>
          <a
            href="/"
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300"
          >
            ← Back to Home
          </a>
        </div>

        <div className="space-y-3">
          {notifications.map((n) => (
            <a
              key={n.id}
              href={n.link}
              className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 block ${
                n.unread
                  ? 'bg-slate-900/80 border-amber-500/40 shadow-md shadow-amber-500/5'
                  : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl p-2 rounded-xl bg-slate-900 border border-slate-800">{n.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{n.title}</h3>
                    {n.unread && (
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{n.message}</p>
                  <span className="text-[10px] text-slate-500 mt-2 block">{n.time}</span>
                </div>
              </div>

              <span className="text-xs font-bold text-amber-400 hover:text-amber-300 whitespace-nowrap pt-1">
                View →
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
