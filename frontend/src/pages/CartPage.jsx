import { Link, useNavigate } from "react-router";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, Loader2 } from "lucide-react";
import { useState } from "react";

const C = {
  primary: "#1c8079",
  primaryLight: "#2fe0cb",
  bg: "#f0fafa",
  text: "#0d3533",
  textMuted: "#4a8580",
  white: "#ffffff",
  border: "#a8d8d4",
};

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (!user) return;
    setIsProcessing(true);
    try {
      const res = await fetch("http://localhost:3000/queue/move-from-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: user.email })
      });
      if (res.ok) {
        clearCart();
        navigate("/queue");
      } else {
        console.error("Failed to move to queue");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center" style={{ backgroundColor: C.bg }}>
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-6 shadow-xl">
          <ShoppingBag size={40} style={{ color: C.primary }} />
        </div>
        <h2 className="text-4xl font-black mb-4" style={{ color: C.text }}>Your cart is empty</h2>
        <p className="mb-8" style={{ color: C.textMuted }}>Looks like you haven't added anything yet.</p>
        <Link 
          to="/all-products" 
          className="px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-white transition-all hover:-translate-y-1 hover:shadow-xl shadow-md"
          style={{ background: `gradient-to-r from-[${C.primary}] to-[${C.primaryLight}]`, backgroundColor: C.primary }}
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-6" style={{ backgroundColor: C.bg }}>
      <div className="max-w-7xl mx-auto">
        <Link to="/all-products" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-8 transition-all hover:translate-x-[-4px]" style={{ color: C.textMuted }}>
          <ArrowLeft size={14} /> Continue Shopping
        </Link>

        <h1 className="text-5xl font-black mb-12" style={{ color: C.text }}>Your <span style={{ color: C.primary }}>Cart</span></h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item.productId} className="bg-white p-4 rounded-3xl flex gap-6 items-center shadow-sm border transition-all hover:shadow-md" style={{ borderColor: C.border }}>
                {/* Item Image */}
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Item Info */}
                <div className="flex-1">
                  <h3 className="font-bold text-lg leading-tight mb-1" style={{ color: C.text }}>{item.name}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: C.primary }}>{item.category}</p>
                  <p className="font-black text-xl" style={{ color: C.text }}>${item.price}</p>
                </div>

                {/* Controls */}
                <div className="flex flex-col items-end gap-4">
                  <button 
                    onClick={() => removeFromCart(item.productId)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="flex items-center bg-[#f8fcfb] rounded-xl border p-1" style={{ borderColor: C.border }}>
                    <button 
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-gray-500 transition-all"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-bold text-sm" style={{ color: C.text }}>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-gray-500 transition-all"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border sticky top-28" style={{ borderColor: C.border }}>
            <h2 className="text-2xl font-black mb-6" style={{ color: C.text }}>Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm" style={{ color: C.textMuted }}>
                <span>Subtotal</span>
                <span className="font-bold" style={{ color: C.text }}>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm" style={{ color: C.textMuted }}>
                <span>Shipping</span>
                <span className="font-bold text-green-600">Free</span>
              </div>
              <div className="h-px bg-gray-200 my-4" />
              <div className="flex justify-between items-end">
                <span className="text-sm font-bold uppercase tracking-widest" style={{ color: C.text }}>Total</span>
                <span className="text-4xl font-black" style={{ color: C.primary }}>${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full h-14 rounded-2xl bg-[#1c8079] text-white font-black uppercase tracking-[0.2em] text-sm hover:shadow-lg hover:shadow-[#1c8079]/30 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing ? <Loader2 size={20} className="animate-spin" /> : "Checkout Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
