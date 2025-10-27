export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-800 sticky top-0 bg-black/95 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold">
              <span className="text-green-400">Silk</span>
              <span className="text-cyan-400">Road</span>
              <span className="text-gray-500">x402</span>
            </div>
          </div>
          <button className="px-6 py-2 bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 transition-all">
            Join X Community →
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          The <span className="gradient-text">Anonymous</span> Marketplace<br />
          for Private Software
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
          Sell your private tools, bots, and software to the world—no identity required. 
          Get paid instantly in USDC on Solana with x402 payments.
        </p>
        <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Anonymous Listings
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
            Instant Payments
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Near-Zero TX Fees
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            Legal Software Only
          </div>
        </div>
      </section>

      {/* What is x402? */}
      <section className="border-t border-gray-800 bg-gray-950/50">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold mb-4">What is <span className="text-cyan-400">x402</span>?</h2>
          <p className="text-gray-400 mb-8 max-w-3xl">
            x402 is an open protocol that makes the internet payable. Built on the HTTP 402 &quot;Payment Required&quot; status code, 
            it enables instant, wallet-based micropayments without accounts, subscriptions, or middlemen.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="border-glow bg-black/50 p-6 rounded">
              <h3 className="text-xl font-bold mb-3 text-green-400">How It Works</h3>
              <ol className="space-y-3 text-gray-400 list-decimal list-inside">
                <li>Buyer requests software download</li>
                <li>Server responds with <code className="text-cyan-400 bg-gray-900 px-2 py-0.5 rounded">HTTP 402</code> + payment details</li>
                <li>Wallet signs payment authorization (USDC on Solana)</li>
                <li>Transaction settles on-chain in &lt;1 second</li>
                <li>Software delivered instantly to buyer</li>
              </ol>
            </div>
            
            <div className="border-glow bg-black/50 p-6 rounded">
              <h3 className="text-xl font-bold mb-3 text-cyan-400">Why It&apos;s Powerful</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>No accounts:</strong> Pure wallet-based, anonymous by design</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>Micro-fees:</strong> Solana costs $0.000005 per transaction</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>Instant:</strong> Sub-second payment finality</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>AI-ready:</strong> Bots and agents can pay autonomously</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gray-900/50 border border-gray-800 rounded">
            <p className="text-sm text-gray-500 leading-relaxed">
              <strong className="text-gray-300">Technical Deep Dive:</strong> When your software is requested, 
              the server responds with a 402 status containing payment parameters (amount, recipient address, USDC mint, network). 
              The buyer&apos;s wallet (e.g., Phantom) signs a structured message following EIP-712/ed25519 standards with a nonce, 
              timestamp, and paymentId to prevent replay attacks. The signed payload is attached as an HTTP header on retry. 
              The server verifies the signature, broadcasts the SPL token transfer to Solana mainnet, and serves the download 
              link upon confirmation. No chargebacks, no accounts, no friction—just pure peer-to-peer commerce.
            </p>
          </div>
        </div>
      </section>

      {/* Why SilkRoadx402? */}
      <section className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold mb-4">Why <span className="gradient-text">SilkRoadx402</span>?</h2>
          <p className="text-gray-400 mb-12 max-w-3xl">
            Most marketplaces force you to reveal your identity, wait days for payments, and lose 15-30% to fees. 
            We&apos;re building the first truly anonymous, instant-settlement marketplace for developers.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-black/50 border border-gray-800 p-6 rounded">
              <div className="text-3xl mb-3">🎭</div>
              <h3 className="text-lg font-bold mb-2 text-green-400">Anonymous by Default</h3>
              <p className="text-gray-400 text-sm">
                List and sell without revealing your identity. Your Solana wallet address is your only fingerprint—no KYC, 
                no personal info, no trace.
              </p>
            </div>

            <div className="bg-black/50 border border-gray-800 p-6 rounded">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-bold mb-2 text-cyan-400">Instant Settlement</h3>
              <p className="text-gray-400 text-sm">
                Payments settle on Solana in under 1 second. Smart contract escrow auto-releases funds upon delivery—no 
                manual holds, no waiting periods. Money flows instantly.
              </p>
            </div>

            <div className="bg-black/50 border border-gray-800 p-6 rounded">
              <div className="text-3xl mb-3">💸</div>
              <h3 className="text-lg font-bold mb-2 text-purple-400">0.5% Fees</h3>
              <p className="text-gray-400 text-sm">
                Keep 99.5% of your revenue on compliant software. No payment processor fees, no platform cut, no hidden charges. 
                Just 0.5% to keep the marketplace running.
              </p>
            </div>

            <div className="bg-black/50 border border-gray-800 p-6 rounded">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="text-lg font-bold mb-2 text-yellow-400">AI Agent Ready</h3>
              <p className="text-gray-400 text-sm">
                x402 enables autonomous purchases. AI agents, trading bots, and automated systems can buy your software 
                without human intervention—opening massive M2M revenue streams.
              </p>
            </div>

            <div className="bg-black/50 border border-gray-800 p-6 rounded">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="text-lg font-bold mb-2 text-red-400">Encrypted Storage</h3>
              <p className="text-gray-400 text-sm">
                Files stored with client-side encryption. Only paying customers get the decryption keys. 
                Your intellectual property stays protected.
              </p>
            </div>

            <div className="bg-black/50 border border-gray-800 p-6 rounded">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="text-lg font-bold mb-2 text-green-400">Global Access</h3>
              <p className="text-gray-400 text-sm">
                Sell to anyone, anywhere, instantly. No geographic restrictions, no currency conversions, no payment gateway 
                rejections. If they have USDC, they can buy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Make Money */}
      <section className="border-t border-gray-800 bg-gray-950/50">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold mb-4">How to Make <span className="text-green-400">Money</span></h2>
          <p className="text-gray-400 mb-12 max-w-3xl">
            Turn your private tools into passive income. Whether it&apos;s a Solana trading bot, MEV script, 
            data scraper, or custom API—if it&apos;s valuable, people will pay for it.
          </p>

          <div className="space-y-6">
            <div className="bg-black/50 border-l-4 border-green-500 p-6 rounded">
              <h3 className="text-xl font-bold mb-2">1. List Your Software</h3>
              <p className="text-gray-400">
                Connect your wallet, upload your encrypted software, and sign the listing metadata with your private key. 
                Set your price in USDC—could be $0.10 or $10,000, your call. No approval process, no waiting.
              </p>
            </div>

            <div className="bg-black/50 border-l-4 border-cyan-500 p-6 rounded">
              <h3 className="text-xl font-bold mb-2">2. Buyers Pay via x402</h3>
              <p className="text-gray-400">
                When someone wants your software, they click &quot;Buy.&quot; x402 triggers their wallet to authorize payment. 
                Transaction settles on Solana in 400ms. They get the download link, you get paid instantly.
              </p>
            </div>

            <div className="bg-black/50 border-l-4 border-purple-500 p-6 rounded">
              <h3 className="text-xl font-bold mb-2">3. Collect Revenue 24/7</h3>
              <p className="text-gray-400">
                Your listing stays live. Every purchase sends USDC directly to your wallet—no withdrawals, no minimums. 
                Build it once, sell it repeatedly to buyers worldwide.
              </p>
            </div>
          </div>

          <div className="mt-12 p-8 bg-gradient-to-br from-green-900/20 to-cyan-900/20 border border-green-500/30 rounded-lg">
            <h3 className="text-2xl font-bold mb-3">Example: Solana Sniper Bot</h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <div className="text-sm text-gray-500 mb-1">Listing Price</div>
                <div className="text-3xl font-bold text-green-400">$49.99</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Your Cut (99.5%)</div>
                <div className="text-3xl font-bold text-cyan-400">$49.74</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">100 Sales/Month</div>
                <div className="text-3xl font-bold text-purple-400">$4,974</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Annual Revenue</div>
                <div className="text-3xl font-bold text-yellow-400">$59,688</div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              * Revenue potential varies by software quality, market demand, and pricing strategy. No guarantees.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold mb-12">What Can You <span className="gradient-text">Sell</span>?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "🤖", title: "Trading Bots", desc: "MEV, arbitrage, snipers" },
              { icon: "🔧", title: "Dev Tools", desc: "CLIs, libraries, frameworks" },
              { icon: "📊", title: "Data Tools", desc: "Scrapers, parsers, analytics" },
              { icon: "🎨", title: "Design Assets", desc: "UI kits, templates, fonts" },
              { icon: "🔐", title: "Security Tools", desc: "Auditors, scanners, monitors" },
              { icon: "💻", title: "Scripts", desc: "Automation, deployment, testing" },
              { icon: "📱", title: "APIs", desc: "Custom endpoints, wrappers" },
              { icon: "🎮", title: "Game Mods", desc: "Plugins, enhancements, utilities" },
            ].map((item, i) => (
              <div key={i} className="bg-black/50 border border-gray-800 p-4 rounded text-center hover:border-green-500/30 transition-all">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-red-900/10 border border-red-500/30 rounded-lg">
            <h3 className="text-lg font-bold mb-2 text-red-400">⚠️ Legal Software Only</h3>
            <p className="text-gray-400 text-sm mb-3">
              SilkRoadx402 strictly prohibits the sale of any illegal software, malware, hacking tools intended for 
              unauthorized access, or software that violates United States regulations. All listings must comply with 
              applicable laws. Violators will be permanently banned and reported to authorities.
            </p>
            <p className="text-gray-400 text-sm">
              <strong className="text-red-300">Fee Structure:</strong> Compliant software pays 0.5% fees. High-risk or 
              non-compliant listings incur a 35% fee, used exclusively for SRx420 token buyback/burn—not as platform profit. 
              We do not profit from any questionable software.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-800 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Start <span className="gradient-text">Selling</span>?</h2>
          <p className="text-xl text-gray-400 mb-10">
            Join the future of anonymous software commerce. Turn your code into cash.
          </p>
          <button className="px-12 py-4 bg-green-500 text-black font-bold text-lg rounded hover:bg-green-400 transition-all border-glow">
            Join X Community →
          </button>
          <p className="text-sm text-gray-600 mt-6">
            Platform launching Q4 2025
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-3 text-green-400">SilkRoadx402</h3>
              <p className="text-sm text-gray-500">
                The first decentralized marketplace for private software sales using x402 payments on Solana.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-3">Technology</h3>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• x402 Payment Protocol</li>
                <li>• Solana Blockchain</li>
                <li>• Encrypted Cloud Storage</li>
                <li>• Client-Side Encryption</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3">Legal</h3>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• US Compliant</li>
                <li>• No Illegal Software</li>
                <li>• Peer-to-Peer Model</li>
                <li>• No Liability for Listings</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-900 pt-8">
            <p className="text-xs text-gray-600 text-center">
              SilkRoadx402 operates as a decentralized peer-to-peer marketplace. We do not host, verify, or guarantee any software listings. 
              Buyers and sellers interact directly via smart contracts. All transactions are final and non-refundable due to blockchain immutability.
            </p>
            <p className="text-xs text-gray-600 text-center mt-4">
              <strong>Platform Fees:</strong> 0.5% on compliant software transactions. High-risk or non-compliant listings are subject to a 35% fee, 
              which is used exclusively for SRx420 token buyback and burn—not as profit. This protects the platform from liability associated with 
              potentially problematic software. SilkRoadx402 does not profit from any non-compliant software sales.
            </p>
            <p className="text-xs text-gray-700 text-center mt-6">
              © 2025 SilkRoadx402. All rights reserved. Not affiliated with the original Silk Road.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

