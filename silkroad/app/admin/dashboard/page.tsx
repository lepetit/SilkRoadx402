'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CONFIG } from '@/config/constants';

interface Listing {
  _id: string;
  wallet: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
  riskLevel: 'standard' | 'high-risk';
  state: 'in_review' | 'on_market' | 'pulled';
  approved: boolean;
  createdAt: Date;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'pulled'>('pending');

  // Block if admin is disabled
  useEffect(() => {
    if (CONFIG.DISABLE_ADMIN) {
      router.push('/');
      return;
    }
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/listings');
      setListings(response.data.listings || []);
    } catch (err: any) {
      if (err.response?.status === 401) {
        router.push('/admin');
      } else {
        setError(err.response?.data?.error || 'Failed to load listings');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await axios.post(`/api/admin/listings/${id}/approve`);
      fetchListings();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to approve listing');
    }
  };

  const handleReject = async (id: string) => {
    try {
      await axios.post(`/api/admin/listings/${id}/reject`);
      fetchListings();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to reject listing');
    }
  };

  const handleSetRisk = async (id: string, riskLevel: 'standard' | 'high-risk') => {
    try {
      await axios.post(`/api/admin/listings/${id}/risk`, { riskLevel });
      fetchListings();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to update risk level');
    }
  };

  const filteredListings = listings.filter(l => {
    if (filter === 'pending') return l.state === 'in_review' && !l.approved;
    if (filter === 'approved') return l.state === 'on_market' && l.approved;
    if (filter === 'pulled') return l.state === 'pulled';
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-black py-12 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Review and manage marketplace listings
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800'
            }`}
          >
            All ({listings.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'pending'
                ? 'bg-yellow-600 text-white'
                : 'bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800'
            }`}
          >
            Pending ({listings.filter(l => l.state === 'in_review' && !l.approved).length})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'approved'
                ? 'bg-green-600 text-white'
                : 'bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800'
            }`}
          >
            Approved ({listings.filter(l => l.state === 'on_market' && l.approved).length})
          </button>
          <button
            onClick={() => setFilter('pulled')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'pulled'
                ? 'bg-red-600 text-white'
                : 'bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800'
            }`}
          >
            Pulled ({listings.filter(l => l.state === 'pulled').length})
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950">
            <p className="text-sm text-red-600 dark:text-red-400">⚠️ {error}</p>
          </div>
        )}

        {/* Listings */}
        {!loading && !error && (
          <div className="space-y-4">
            {filteredListings.length === 0 ? (
              <div className="text-center py-12 text-zinc-600 dark:text-zinc-400">
                No listings in this category
              </div>
            ) : (
              filteredListings.map((listing) => (
                <div
                  key={listing._id}
                  className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="flex items-start space-x-4">
                    {/* Image */}
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={listing.imageUrl}
                        alt={listing.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                            {listing.title}
                          </h3>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            {listing.category} • ${listing.price.toFixed(2)} USDC
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            listing.riskLevel === 'high-risk'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}>
                            {listing.riskLevel}
                          </span>
                        </div>
                      </div>

                      <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                        {listing.description}
                      </p>

                      <p className="mb-3 text-xs text-zinc-500">
                        Seller: {listing.wallet.slice(0, 8)}...{listing.wallet.slice(-6)}
                      </p>

                      {/* Actions */}
                      {listing.state === 'in_review' && !listing.approved && (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleApprove(listing._id)}
                            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
                          >
                            ✓ Approve
                          </button>
                          <button
                            onClick={() => handleReject(listing._id)}
                            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
                          >
                            ✗ Reject
                          </button>
                          <button
                            onClick={() => handleSetRisk(listing._id, listing.riskLevel === 'standard' ? 'high-risk' : 'standard')}
                            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
                          >
                            Set as {listing.riskLevel === 'standard' ? 'High-Risk' : 'Standard'}
                          </button>
                        </div>
                      )}

                      {listing.state === 'on_market' && listing.approved && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">
                            ✓ Live on marketplace
                          </span>
                          <button
                            onClick={() => handleReject(listing._id)}
                            className="text-sm text-red-600 hover:text-red-700 dark:text-red-400"
                          >
                            Pull Listing
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

