import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  ChevronRight, 
  Star, 
  User, 
  MapPin, 
  ChevronDown,
  X,
  Plus,
  Minus,
  CheckCircle,
  Loader2,
  AlertTriangle,
  Info
} from 'lucide-react';

// Change this to your local backend URL
const API_URL = "https://back-dngo.onrender.com";

// Fallback data in case the backend is unreachable from the preview environment
const FALLBACK_PRODUCTS = [
  { _id: "f1", title: "Apple iPhone 15 Pro, 256GB, Blue Titanium", price: 999.00, rating: 4.8, reviews: 2450, category: "Electronics", image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=400&auto=format&fit=crop" },
  { _id: "f2", title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones", price: 348.00, rating: 4.7, reviews: 1820, category: "Electronics", image: "https://images.unsplash.com/photo-1670057037306-03487313095d?q=80&w=400&auto=format&fit=crop" },
  { _id: "f3", title: "Kindle Paperwhite (16 GB) – 6.8\" display", price: 149.99, rating: 4.9, reviews: 15600, category: "Devices", image: "https://images.unsplash.com/photo-1594980596247-87c52a3465b4?q=80&w=400&auto=format&fit=crop" },
  { _id: "f4", title: "Logitech MX Master 3S Wireless Mouse", price: 99.00, rating: 4.8, reviews: 3100, category: "Accessories", image: "https://images.unsplash.com/photo-1633526543814-9718c8922b7a?q=80&w=400&auto=format&fit=crop" },
];

export default function App() {
  // Navigation & UI State
  const [view, setView] = useState('home'); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Data State
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  
  // Form State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [authData, setAuthData] = useState({ name: '', email: '', password: '' });

  // 1. Fetch Products from Backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // Note: fetch to localhost from a cloud environment often fails due to browser security/CORS
        const response = await fetch(`${API_URL}/api/products`).catch(e => {
            throw new Error("Connection failed");
        });
        
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
        setError(null);
        setIsDemoMode(false);
      } catch (err) {
        console.warn("Backend unreachable, switching to Demo Mode:", err.message);
        setProducts(FALLBACK_PRODUCTS);
        setIsDemoMode(true);
        setError("Note: Could not connect to your local backend at http://localhost:5000. Running in Demo Mode.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter logic (Frontend side)
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, products]);

  // 2. Auth: Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    if (isDemoMode) {
        setUser({ name: authData.name || 'Demo User', email: authData.email });
        setView('home');
        return;
    }
    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authData),
      });
      const data = await response.json();
      if (response.ok) {
        setView('login');
        setAuthData({ ...authData, password: '' });
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      alert("Backend error during signup. Running in local mode.");
    }
  };

  // 3. Auth: Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (isDemoMode) {
        setUser({ name: 'Demo User', email: authData.email });
        setView('home');
        return;
    }
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authData.email, password: authData.password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('token', data.token);
        setView('home');
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Backend error during login. Make sure your server is running.");
    }
  };

  // 4. Cart: Add to Database Cart
  const addToCart = async (product) => {
    // Local state update for instant UI feedback
    setCart(prev => {
      const itemId = product._id || product.id;
      const existing = prev.find(item => (item._id || item.id) === itemId);
      if (existing) {
        return prev.map(item => (item._id || item.id) === itemId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // Backend sync
    if (user && !isDemoMode) {
      try {
        await fetch(`${API_URL}/api/cart`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: product.title,
            price: product.price,
            image: product.image,
            userId: user.id || user._id
          }),
        });
      } catch (err) {
        console.error("Failed to sync cart to DB");
      }
    }
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      const itemId = item._id || item.id;
      if (itemId === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem('token');
    setView('home');
  };

  const CATEGORIES = ["All", ...new Set(products.map(p => p.category))];

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      {/* Backend Status Banner */}
      {isDemoMode && !isLoading && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-1 text-center flex items-center justify-center gap-2">
            <Info size={14} className="text-amber-600" />
            <span className="text-[10px] md:text-xs text-amber-800 font-medium">
                Running in Demo Mode. Local backend at <code className="bg-amber-100 px-1 rounded">localhost:5000</code> is unreachable from this preview.
            </span>
        </div>
      )}

      {/* Navigation Header */}
      <header className="sticky top-0 z-50">
        <div className="bg-[#131921] text-white px-4 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center cursor-pointer p-1" onClick={() => setView('home')}>
            <span className="text-2xl font-bold tracking-tighter">amazon<span className="text-[#febd69]">.clone</span></span>
          </div>

          <div className="flex-1 flex max-w-3xl overflow-hidden rounded-md group">
            <button className="bg-gray-100 text-gray-600 px-3 flex items-center gap-1 text-sm border-r border-gray-300">
              {selectedCategory} <ChevronDown size={14} />
            </button>
            <input 
              type="text" 
              placeholder="Search Amazon" 
              className="flex-1 px-3 py-2 text-black outline-none focus:ring-2 focus:ring-[#febd69]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-[#febd69] p-2 text-[#131921]">
              <Search size={24} />
            </button>
          </div>

          <div className="flex items-center gap-1 text-sm">
            <div 
              className="px-2 py-1 cursor-pointer flex flex-col"
              onClick={() => !user ? setView('login') : null}
            >
              <span className="text-xs text-gray-300 truncate max-w-[80px]">
                Hello, {user ? user.name.split(' ')[0] : 'sign in'}
              </span>
              <span className="font-bold flex items-center">Account <ChevronDown size={14} /></span>
            </div>

            <div 
              className="relative px-2 py-1 cursor-pointer flex items-end gap-1"
              onClick={() => setView('cart')}
            >
              <span className="absolute top-0 right-8 bg-[#f3a847] text-[#131921] text-xs font-bold px-1.5 rounded-full">
                {cartCount}
              </span>
              <ShoppingCart size={32} />
              <span className="font-bold mb-1 hidden sm:inline">Cart</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1500px] mx-auto pb-10">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="animate-spin text-orange-500" size={48} />
            <p className="text-gray-500 font-medium text-lg italic">Checking connection to backend...</p>
          </div>
        )}

        {view === 'home' && !isLoading && (
          <div className="relative">
            <div className="relative h-48 md:h-[300px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-100 to-transparent z-10" />
              <img src="https://images-na.ssl-images-amazon.com/images/G/01/kindle/journeys/Nzg3NzY5ZmEt/Nzg3NzY5ZmEt-MjliZmFjYTct-w1500._CB412093539_.jpg" className="w-full h-full object-cover" alt="Banner" />
            </div>

            <div className="relative z-20 px-4 -mt-12 md:-mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.length === 0 ? (
                 <div className="col-span-full bg-white p-10 text-center rounded shadow">
                    <p className="text-xl text-gray-500">No products found.</p>
                 </div>
              ) : filteredProducts.map((product) => (
                <div key={product._id} className="bg-white p-5 flex flex-col group shadow hover:shadow-lg transition-shadow">
                  <span className="text-gray-500 text-[10px] mb-1 uppercase tracking-wider">{product.category}</span>
                  <h3 className="font-medium text-sm md:text-lg mb-2 h-10 md:h-14 overflow-hidden leading-tight line-clamp-2">{product.title}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < Math.floor(product.rating || 4) ? "currentColor" : "none"} />)}
                    </div>
                    <span className="text-blue-600 text-xs">{product.reviews?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="mb-4 flex-1 flex items-center justify-center p-4">
                    <img src={product.image} className="max-h-32 md:max-h-48 w-auto object-contain" alt={product.title} />
                  </div>
                  <div className="flex items-start mb-4">
                    <span className="text-sm mt-1">$</span>
                    <span className="text-2xl font-bold">{Math.floor(product.price)}</span>
                    <span className="text-sm mt-1">{(product.price % 1).toFixed(2).slice(2)}</span>
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-[#ffd814] hover:bg-[#f7ca00] py-2 rounded-full font-medium transition-colors text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'cart' && (
          <div className="p-4 flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-white p-6 rounded-sm shadow">
              <h1 className="text-2xl md:text-3xl font-semibold mb-4 border-b pb-4">Shopping Cart</h1>
              {cart.length === 0 ? (
                <div className="py-10 text-center">
                  <p className="text-gray-500 mb-4">Your cart is empty.</p>
                  <button onClick={() => setView('home')} className="text-blue-600 hover:underline">Continue shopping</button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item._id || item.id} className="flex gap-4 py-4 border-b">
                      <img src={item.image} className="w-20 h-20 md:w-32 md:h-32 object-contain" alt={item.title} />
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between">
                          <h3 className="text-sm md:text-lg font-medium leading-tight">{item.title}</h3>
                          <span className="font-bold text-lg md:text-xl mt-1 md:mt-0">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <div className="mt-4 flex items-center gap-4">
                          <div className="flex items-center border rounded">
                            <button onClick={() => updateQuantity(item._id || item.id, -1)} className="p-1 hover:bg-gray-100"><Minus size={14} /></button>
                            <span className="px-3 text-sm">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item._id || item.id, 1)} className="p-1 hover:bg-gray-100"><Plus size={14} /></button>
                          </div>
                          <button onClick={() => updateQuantity(item._id || item.id, -item.quantity)} className="text-blue-600 text-xs md:text-sm hover:underline">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="w-full lg:w-72 bg-white p-5 rounded-sm shadow h-fit">
                <p className="text-lg">Subtotal ({cartCount} items): <span className="font-bold">${cartTotal.toFixed(2)}</span></p>
                <button onClick={() => setView('checkout')} className="w-full bg-[#ffd814] hover:bg-[#f7ca00] py-2 rounded-lg mt-4 font-medium shadow-sm transition-all active:scale-95">Proceed to Checkout</button>
              </div>
            )}
          </div>
        )}

        {view === 'login' && (
          <div className="flex flex-col items-center pt-10 md:pt-20 px-4">
             <div className="w-full max-w-sm border rounded p-6 bg-white shadow-sm">
               <h1 className="text-2xl font-semibold mb-6">Sign in</h1>
               <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-1">Email</label>
                    <input 
                      type="email" 
                      required 
                      className="w-full border p-2 rounded outline-none focus:ring-1 focus:ring-orange-400"
                      value={authData.email}
                      onChange={(e) => setAuthData({...authData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">Password</label>
                    <input 
                      type="password" 
                      required 
                      className="w-full border p-2 rounded outline-none focus:ring-1 focus:ring-orange-400"
                      value={authData.password}
                      onChange={(e) => setAuthData({...authData, password: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="w-full bg-[#ffd814] hover:bg-[#f7ca00] py-2 rounded shadow-sm font-medium">Continue</button>
               </form>
               <div className="mt-10 border-t pt-4">
                  <p className="text-sm text-center text-gray-600">New to Amazon?</p>
                  <button onClick={() => setView('signup')} className="w-full border bg-gray-50 py-1 rounded shadow-sm mt-2 text-sm">Create your account</button>
               </div>
             </div>
          </div>
        )}

        {view === 'signup' && (
          <div className="flex flex-col items-center pt-10 md:pt-20 px-4">
             <div className="w-full max-w-sm border rounded p-6 bg-white shadow-sm">
               <h1 className="text-2xl font-semibold mb-6">Create account</h1>
               <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-1">Your name</label>
                    <input 
                      type="text" 
                      required 
                      className="w-full border p-2 rounded outline-none focus:ring-1 focus:ring-orange-400"
                      value={authData.name}
                      onChange={(e) => setAuthData({...authData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">Email</label>
                    <input 
                      type="email" 
                      required 
                      className="w-full border p-2 rounded outline-none focus:ring-1 focus:ring-orange-400"
                      value={authData.email}
                      onChange={(e) => setAuthData({...authData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">Password</label>
                    <input 
                      type="password" 
                      required 
                      className="w-full border p-2 rounded outline-none focus:ring-1 focus:ring-orange-400"
                      value={authData.password}
                      onChange={(e) => setAuthData({...authData, password: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="w-full bg-[#ffd814] hover:bg-[#f7ca00] py-2 rounded shadow-sm font-medium">Create account</button>
               </form>
               <p className="mt-4 text-sm text-center">Already have an account? <button onClick={() => setView('login')} className="text-blue-600 underline">Sign in</button></p>
             </div>
          </div>
        )}

        {view === 'checkout' && (
          <div className="max-w-xl mx-auto mt-10 md:mt-20 p-10 bg-white shadow text-center rounded">
            <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">Thank you, {user?.name || 'Customer'}. Your order is on the way.</p>
            <button onClick={() => { setCart([]); setView('home'); }} className="mt-8 bg-[#ffd814] px-10 py-2 rounded-full font-bold">Back Home</button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#232f3e] text-white py-10 mt-auto text-center px-4">
        <p className="text-xs md:text-sm opacity-70">© 2024 Fullstack Amazon Clone • Powered by Express & MongoDB</p>
        {user && <button onClick={handleLogout} className="mt-4 text-[10px] underline text-orange-400">Logout of {user.email}</button>}
        {isDemoMode && (
             <div className="mt-6 flex flex-col items-center gap-2 opacity-60">
                <AlertTriangle size={16} className="text-amber-400" />
                <p className="text-[10px] max-w-xs leading-tight">
                    This preview is running in Demo Mode because a browser cannot easily connect to <code className="bg-gray-700 px-1 rounded">localhost</code> from a cloud hosted site. 
                    Running this code on your local machine with <code className="bg-gray-700 px-1 rounded">npm start</code> will allow it to connect to your Express server.
                </p>
             </div>
        )}
      </footer>
    </div>
  );
}