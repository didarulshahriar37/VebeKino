import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import SEO from "../components/Shared/SEO";
import { 
  Star, 
  ShoppingCart, 
  ArrowLeft, 
  Check, 
  ShieldCheck, 
  RotateCcw,
  Plus,
  Minus,
  Loader2
} from "lucide-react";

const C = {
  primary: "#1c8079",
  primaryLight: "#2fe0cb",
  bg: "#f0fafa",
  text: "#0d3533",
  textMuted: "#4a8580",
  white: "#ffffff",
  border: "#a8d8d4",
};

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart, cartItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const isInCart = product && cartItems.some((item) => item._id === product._id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      navigate('/auth/login');
      return;
    }
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: C.bg }}>
        <Loader2 className="animate-spin" style={{ color: C.primary }} size={48} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center" style={{ backgroundColor: C.bg }}>
        <h2 className="text-3xl font-bold mb-4" style={{ color: C.text }}>Product not found</h2>
        <Link to="/all-products" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest" style={{ color: C.primary }}>
          <ArrowLeft size={16} /> Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-6" style={{ backgroundColor: C.bg }}>
      <SEO 
        title={product.name} 
        description={product.description?.slice(0, 150) || `Buy ${product.name} at VebeKino. Experience mindful shopping with our AI-powered system.`} 
      />
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <Link to="/all-products" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-12 transition-all hover:translate-x-[-4px]" style={{ color: C.textMuted }}>
          <ArrowLeft size={14} /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Image Section */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-white/40 blur-3xl rounded-[4rem] group-hover:bg-[#2fe0cb]/10 transition-all duration-1000" />
            <div className="relative aspect-square rounded-[3.5rem] overflow-hidden bg-white shadow-2xl border" style={{ borderColor: C.border }}>
              <img 
                src={product.image_url} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              {!product.availability && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-md flex items-center justify-center">
                  <span className="px-8 py-3 rounded-full bg-[#d94f3d] text-white text-xs font-black uppercase tracking-[0.3em] shadow-2xl">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>
            
            {/* Quick Badges */}
            <div className="absolute bottom-8 left-8 flex flex-col gap-3">
              <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl flex items-center gap-3 border" style={{ borderColor: C.border }}>
                <ShieldCheck size={18} style={{ color: C.primary }} />
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: C.text }}>Verified Premium</span>
              </div>
            </div>
          </div>

          {/* Right: Info Section */}
          <div className="flex flex-col h-full py-4">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg" style={{ backgroundColor: C.primary }}>
                {product.category}
              </span>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border shadow-sm" style={{ borderColor: C.border }}>
                <Star size={14} fill="#e8a860" stroke="#e8a860" />
                <span className="text-xs font-black" style={{ color: C.text }}>{product.rating}</span>
                <span className="text-[10px] font-bold opacity-40 ml-1">/ 5.0</span>
              </div>
            </div>

            <h1 className="text-5xl font-black leading-tight mb-6" style={{ color: C.text }}>
              {product.name}
            </h1>

            <div className="flex items-baseline gap-4 mb-10">
              <span className="text-5xl font-black tracking-tighter" style={{ color: C.text }}>${product.price}</span>
              <span className="text-sm font-bold opacity-40">Inc. VAT & Delivery</span>
            </div>

            <p className="text-lg leading-relaxed mb-12" style={{ color: C.textMuted }}>
              {product.description || `Elevate your lifestyle with the ${product.name}. Carefully curated for the VebeKino collection, this piece represents the perfect balance of aesthetic design and functional excellence.`}
            </p>

            {/* Actions */}
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="flex items-center bg-white rounded-2xl border p-1 shadow-sm" style={{ borderColor: C.border }}>
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center rounded-xl transition-all hover:bg-gray-50 text-gray-400 hover:text-black"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-black text-xl" style={{ color: C.text }}>{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center rounded-xl transition-all hover:bg-gray-50 text-gray-400 hover:text-black"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={!product.availability || isInCart}
                  className={`flex-1 h-14 rounded-2xl font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 transition-all duration-500 transform active:scale-95 shadow-2xl ${
                    !product.availability || isInCart
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border-none" 
                    : isAdded 
                      ? "bg-green-500 text-white shadow-green-200" 
                      : "bg-gradient-to-r from-[#1c8079] to-[#2fe0cb] text-white hover:shadow-[#2fe0cb]/40"
                  }`}
                >
                  {isInCart ? (
                    <>
                      <Check size={20} />
                      Already in Cart
                    </>
                  ) : isAdded ? (
                    <>
                      <Check size={20} />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>

              {/* 30 Day Returns */}
              <div className="bg-white/40 p-4 rounded-2xl border inline-flex items-center gap-4 transition-all hover:bg-white/80 w-fit" style={{ borderColor: C.border }}>
                <div className="w-10 h-10 rounded-xl bg-[#1c8079]/10 flex items-center justify-center text-[#1c8079]">
                  <RotateCcw size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-0.5">30 Day Returns</h4>
                  <p className="text-[9px] font-bold text-gray-400">Easy hassle-free returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;