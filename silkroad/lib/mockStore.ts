/**
 * Mock Data Store (Development Only)
 * 
 * In-memory store for testing without database
 * Shared across all API routes
 * 
 * DESIGN: Easy to gut - all mock logic contained here
 * When ready for real DB: simply route API calls to Mongoose models instead
 */

interface MockUser {
  hasAcceptedTOS: boolean;
  isTokenGated: boolean;
  wallet: string;
}

interface MockListing {
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
  reportsCount: number;
  failedPurchaseCount: number;
  createdAt: Date;
  updatedAt: Date;
}

interface MockTransaction {
  _id: string;
  listingId: string;
  buyerWallet: string;
  sellerWallet: string;
  amount: number;
  txnHash: string;
  deliveryUrl: string; // encrypted in real DB
  status: 'success' | 'failed';
  createdAt: Date;
}

// Global mock stores
const mockUsers = new Map<string, MockUser>();
const mockListings = new Map<string, MockListing>();
const mockTransactions = new Map<string, MockTransaction>();
let listingIdCounter = 1;
let transactionIdCounter = 1;

export const mockStore = {
  /**
   * Get or create mock user
   */
  getUser(wallet: string, defaultTokenGating: boolean = false): MockUser {
    let user = mockUsers.get(wallet);
    
    if (!user) {
      user = {
        wallet,
        hasAcceptedTOS: false,
        isTokenGated: defaultTokenGating,
      };
      mockUsers.set(wallet, user);
      console.log(`🧪 MOCK: Created user ${wallet.slice(0, 8)}...`);
    }
    
    return user;
  },

  /**
   * Update user TOS acceptance
   */
  acceptTOS(wallet: string): boolean {
    const user = mockUsers.get(wallet);
    
    if (!user) {
      console.error(`🧪 MOCK: User ${wallet.slice(0, 8)}... not found`);
      return false;
    }
    
    user.hasAcceptedTOS = true;
    mockUsers.set(wallet, user);
    console.log(`🧪 MOCK: User ${wallet.slice(0, 8)}... accepted TOS`);
    return true;
  },

  /**
   * Update token gating status
   */
  updateTokenGating(wallet: string, passed: boolean): void {
    const user = mockUsers.get(wallet);
    
    if (user) {
      user.isTokenGated = passed;
      mockUsers.set(wallet, user);
    }
  },

  /**
   * Clear all mock data
   */
  clear(): void {
    mockUsers.clear();
    console.log('🧪 MOCK: Store cleared');
  },

  /**
   * Get all users (for debugging)
   */
  getAllUsers(): MockUser[] {
    return Array.from(mockUsers.values());
  },

  /**
   * Get ALL listings (for admin)
   */
  getAllListings(): MockListing[] {
    return Array.from(mockListings.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },

  // ============================================
  // LISTINGS
  // ============================================

  /**
   * Create listing
   */
  createListing(data: Omit<MockListing, '_id' | 'createdAt' | 'updatedAt' | 'reportsCount' | 'failedPurchaseCount' | 'approved' | 'state' | 'riskLevel'>): MockListing {
    const listing: MockListing = {
      _id: `listing_${listingIdCounter++}`,
      ...data,
      riskLevel: 'standard',
      state: 'in_review',
      approved: false,
      reportsCount: 0,
      failedPurchaseCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    mockListings.set(listing._id, listing);
    console.log(`🧪 MOCK: Created listing ${listing._id}`);
    return listing;
  },

  /**
   * Get listing by ID
   */
  getListing(id: string): MockListing | undefined {
    return mockListings.get(id);
  },

  /**
   * Get all approved listings (for browse page)
   */
  getApprovedListings(): MockListing[] {
    return Array.from(mockListings.values())
      .filter(l => l.state === 'on_market' && l.approved)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },

  /**
   * Get listings by wallet (seller's listings)
   */
  getListingsByWallet(wallet: string): MockListing[] {
    return Array.from(mockListings.values())
      .filter(l => l.wallet === wallet)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },

  /**
   * Update listing
   */
  updateListing(id: string, updates: Partial<MockListing>): MockListing | null {
    const listing = mockListings.get(id);
    if (!listing) return null;

    const updated = {
      ...listing,
      ...updates,
      updatedAt: new Date(),
    };

    mockListings.set(id, updated);
    console.log(`🧪 MOCK: Updated listing ${id}`);
    return updated;
  },

  /**
   * Delete listing
   */
  deleteListing(id: string): boolean {
    const result = mockListings.delete(id);
    if (result) {
      console.log(`🧪 MOCK: Deleted listing ${id}`);
    }
    return result;
  },

  // ============================================
  // TRANSACTIONS
  // ============================================

  /**
   * Create transaction
   */
  createTransaction(data: Omit<MockTransaction, '_id' | 'createdAt'>): MockTransaction {
    const transaction: MockTransaction = {
      _id: `txn_${transactionIdCounter++}`,
      ...data,
      createdAt: new Date(),
    };
    
    mockTransactions.set(transaction._id, transaction);
    console.log(`🧪 MOCK: Created transaction ${transaction._id}`);
    return transaction;
  },

  /**
   * Get transaction by ID
   */
  getTransaction(id: string): MockTransaction | undefined {
    return mockTransactions.get(id);
  },

  /**
   * Get transactions by buyer wallet
   */
  getTransactionsByBuyer(wallet: string): MockTransaction[] {
    return Array.from(mockTransactions.values())
      .filter(t => t.buyerWallet === wallet)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },

  // ============================================
  // SEED DATA (for testing UI)
  // ============================================

  /**
   * Seed with sample listings
   */
  seedListings(): void {
    const sampleListings = [
      {
        wallet: 'mockSeller1',
        title: 'Advanced Trading Bot - MEV Arbitrage',
        description: 'High-frequency trading bot optimized for Solana DEX arbitrage. Includes advanced MEV strategies, customizable parameters, and detailed profit tracking. Built with Rust for maximum performance.',
        imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
        price: 49.99,
        category: 'Trading Bot',
      },
      {
        wallet: 'mockSeller2',
        title: 'NFT Sniper Bot - Multi-Marketplace',
        description: 'Lightning-fast NFT minting and sniping bot supporting Magic Eden, Tensor, and other major Solana marketplaces. Real-time floor tracking and automated bidding.',
        imageUrl: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&h=600&fit=crop',
        price: 29.99,
        category: 'Trading Bot',
      },
      {
        wallet: 'mockSeller1',
        title: 'Solana RPC Analytics API',
        description: 'RESTful API providing real-time Solana blockchain analytics, wallet tracking, and transaction monitoring. Perfect for building dashboards and monitoring tools.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        price: 19.99,
        category: 'API Tool',
      },
      {
        wallet: 'mockSeller3',
        title: 'Token Launcher Script - Full Automation',
        description: 'Complete token launch automation for Solana. Creates mint, metadata, and initial liquidity pool. Includes anti-bot measures and customizable tokenomics.',
        imageUrl: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=600&fit=crop',
        price: 15.50,
        category: 'Script',
      },
      {
        wallet: 'mockSeller2',
        title: 'Wallet Drainer Detection Tool',
        description: 'Security tool that analyzes smart contracts and transaction patterns to detect potential wallet drainers and malicious dApps. Includes real-time alerts.',
        imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
        price: 24.99,
        category: 'Custom',
      },
      {
        wallet: 'mockSeller3',
        title: 'DeFi Yield Optimizer Bot',
        description: 'Automated yield farming optimizer that rebalances your portfolio across multiple Solana DeFi protocols to maximize APY. Set it and forget it.',
        imageUrl: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800&h=600&fit=crop',
        price: 34.99,
        category: 'Trading Bot',
      },
    ];

    sampleListings.forEach(listing => {
      const created = this.createListing(listing);
      // Auto-approve for testing
      this.updateListing(created._id, {
        approved: true,
        state: 'on_market',
      });
    });

    console.log('🧪 MOCK: Seeded 6 sample listings');
  },

  /**
   * Clear all mock data
   */
  clearAll(): void {
    mockUsers.clear();
    mockListings.clear();
    mockTransactions.clear();
    listingIdCounter = 1;
    transactionIdCounter = 1;
    console.log('🧪 MOCK: All data cleared');
  },
};

