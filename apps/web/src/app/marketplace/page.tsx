'use client';

import React, { useState } from 'react';

interface MarketplaceListing {
  id: string;
  type: 'COMPANY' | 'FACTION';
  title: string;
  name: string;
  ratingOrRespect: string;
  seller: string;
  askingPrice: number;
  originalPrice: number;
  membersOrEmployees: string;
  perksOrSpecials: string;
  verified: boolean;
  offersCount: number;
}

export default function MarketplacePage() {
  const [filterType, setFilterType] = useState<'ALL' | 'COMPANY' | 'FACTION'>('ALL');
  const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(null);
  const [offerAmount, setOfferAmount] = useState<number>(500000000);
  const [offerMessage, setOfferMessage] = useState<string>('');
  const [submittedOffers, setSubmittedOffers] = useState<any[]>([]);

  const listings: MarketplaceListing[] = [
    {
      id: 'list-comp-101',
      type: 'COMPANY',
      title: 'Established 10★ Oil Rig - Turnkey Operation',
      name: 'Apex Petroleum Corp',
      ratingOrRespect: '10 Stars ★★★★★',
      seller: 'ShadowBroker [2841920]',
      askingPrice: 850000000,
      originalPrice: 900000000,
      membersOrEmployees: '18 / 20 Employees Included (All Active)',
      perksOrSpecials: 'High Daily Profit, Fully Upgraded Facilities',
      verified: true,
      offersCount: 3,
    },
    {
      id: 'list-comp-102',
      type: 'COMPANY',
      title: '10★ Sweet Shop with loyal staff',
      name: 'Sugar Rush Delights',
      ratingOrRespect: '10 Stars ★★★★★',
      seller: 'CandyQueen [1940121]',
      askingPrice: 420000000,
      originalPrice: 420000000,
      membersOrEmployees: '14 / 15 Employees',
      perksOrSpecials: 'Candy Effect special, steady passive income',
      verified: true,
      offersCount: 1,
    },
    {
      id: 'list-fact-201',
      type: 'FACTION',
      title: 'Platinum Tier Ranked Warring Faction',
      name: 'Phoenix Resurgence [PHX]',
      ratingOrRespect: '2,140,800 Respect',
      seller: 'FireBrand [840192]',
      askingPrice: 1200000000,
      originalPrice: 1350000000,
      membersOrEmployees: 'Roster can be transferred or cleared on request',
      perksOrSpecials: 'Heavy Steadfast & Gym Gains branches maxed',
      verified: true,
      offersCount: 5,
    },
  ];

  const filtered = listings.filter((item) => {
    if (filterType !== 'ALL' && item.type !== filterType) return false;
    return true;
  });

  const handleMakeOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedListing) return;

    setSubmittedOffers([
      ...submittedOffers,
      {
        listingId: selectedListing.id,
        title: selectedListing.title,
        amount: offerAmount,
        message: offerMessage,
        status: 'PENDING SELLER REVIEW',
        submittedAt: 'Just now',
      },
    ]);
    setSelectedListing(null);
    setOfferMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-semibold mb-2">
              Verified Organization Marketplace
            </div>
            <h1 className="text-3xl font-black text-white">Torn Organization Marketplace</h1>
            <p className="text-sm text-slate-400 mt-1">
              Buy and sell verified Torn companies and factions with transparent price history and offer negotiation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-1">
              <button
                onClick={() => setFilterType('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  filterType === 'ALL' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('COMPANY')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  filterType === 'COMPANY' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Companies For Sale
              </button>
              <button
                onClick={() => setFilterType('FACTION')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  filterType === 'FACTION' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Factions For Sale
              </button>
            </div>

            <a
              href="/"
              className="h-10 px-4 flex items-center rounded-xl text-xs font-semibold border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300"
            >
              ← Home
            </a>
          </div>
        </div>

        {/* Non-Custodial Safety Banner (Section 22 of Master Spec) */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-1">
          <p className="font-bold flex items-center gap-2">
            <span>🛡️</span> Non-Custodial & Verification Protocol (Section 22)
          </p>
          <p className="text-slate-400">
            This platform does not hold or custody in-game Torn money or execute ownership transfers. All sellers must verify company directorship or faction leadership through official Torn API v2 before listing. Transactions are completed directly between players in Torn.
          </p>
        </div>

        {/* Active Offers tracker */}
        {submittedOffers.length > 0 && (
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">Your Active Offers</h3>
            <div className="space-y-2">
              {submittedOffers.map((off, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs">
                  <div>
                    <span className="font-bold text-white">{off.title}</span>
                    <span className="text-slate-400 ml-2">Offered: ${off.amount.toLocaleString()}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold">
                    {off.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {item.verified ? 'OWNER / DIRECTOR VERIFIED' : 'UNVERIFIED'}
                  </span>
                  <span className="text-xs text-slate-400">{item.offersCount} Active Offers</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-amber-400 font-semibold mt-0.5">
                    {item.name} • {item.ratingOrRespect}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Verified Seller: {item.seller}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Asking Price:</span>
                    <div className="text-right">
                      <span className="text-base font-black text-white">${item.askingPrice.toLocaleString()}</span>
                      {item.originalPrice > item.askingPrice && (
                        <span className="text-xs text-rose-400 line-through ml-2">
                          ${item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Inventory/Roster:</span>
                    <span className="text-slate-200">{item.membersOrEmployees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Perks & Assets:</span>
                    <span className="text-emerald-400 font-medium">{item.perksOrSpecials}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                <span className="text-xs text-slate-500">Price History: 1 Reduction Recorded</span>
                <button
                  onClick={() => setSelectedListing(item)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 cursor-pointer"
                >
                  Make an Offer →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Offer Negotiation Modal */}
      {selectedListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedListing(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-lg">
                💰
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Submit Marketplace Offer</h3>
                <p className="text-xs text-slate-400">{selectedListing.title}</p>
              </div>
            </div>

            <form onSubmit={handleMakeOffer} className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Asking Price:</span>
                  <span className="font-bold text-white">${selectedListing.askingPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Seller:</span>
                  <span className="text-slate-200">{selectedListing.seller}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Your Offer Amount (USD / In-Game Equivalent)
                </label>
                <input
                  type="number"
                  step="10000000"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(Number(e.target.value))}
                  className="w-full h-11 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-amber-500 text-sm font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Message to Seller / Terms
                </label>
                <textarea
                  value={offerMessage}
                  onChange={(e) => setOfferMessage(e.target.value)}
                  placeholder="e.g. Ready to transfer funds immediately; please confirm armory inventory..."
                  className="w-full h-20 p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedListing(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20"
                >
                  Send Offer to Seller
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
