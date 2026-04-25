import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Clock, Lock, CheckCircle2, ArrowRight, Trash2 } from "lucide-react";

const C = {
  primary: "#1c8079",
  primaryLight: "#2fe0cb",
  bg: "#f0fafa",
  text: "#0d3533",
  textMuted: "#4a8580",
  white: "#ffffff",
  border: "#a8d8d4",
};

// Countdown Hook
const useCountdown = (targetDate) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft("00:00:00");
        setIsLocked(false);
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
        setIsLocked(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return { timeLeft, isLocked };
};

const QueueItemCard = ({ item, onRemove }) => {
  const { timeLeft, isLocked } = useCountdown(item.lockedUntil);

  return (
    <div className="bg-white p-6 rounded-3xl border shadow-sm flex flex-col md:flex-row gap-6 items-center transition-all hover:shadow-md relative" style={{ borderColor: C.border }}>
      
      {/* Test Remove Button */}
      <button 
        onClick={() => onRemove(item._id)}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors bg-white rounded-full p-2 hover:bg-red-50"
        title="Remove from queue"
      >
        <Trash2 size={18} />
      </button>

      {/* Product Image */}
      <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0 relative">
        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-white text-[10px] font-black tracking-widest uppercase">
          Qty: {item.quantity}
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 text-center md:text-left">
        <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
          <span className="px-3 py-1 rounded-full bg-[#1c8079]/10 text-[#1c8079] text-[10px] font-black uppercase tracking-widest">
            Step {item.gate} of 4
          </span>
          <span className="text-[10px] font-bold text-gray-400">
            Added {new Date(item.createdAt).toLocaleDateString()}
          </span>
        </div>
        <h3 className="font-bold text-xl leading-tight mb-2" style={{ color: C.text }}>{item.name}</h3>
        <p className="font-black text-2xl" style={{ color: C.primary }}>${item.price * item.quantity}</p>
      </div>

      {/* State Controls */}
      <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-3 min-w-[200px]">
        {item.gate === 1 ? (
          <>
            <div className="bg-[#f0fafa] border px-4 py-3 rounded-2xl flex items-center gap-3 w-full justify-center" style={{ borderColor: C.border }}>
              <Lock size={18} style={{ color: C.primary }} />
              <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: C.textMuted }}>Cooling Down</p>
                <p className="font-mono font-black text-lg" style={{ color: C.text }}>{timeLeft}</p>
              </div>
            </div>
            <p className="text-[10px] font-bold text-gray-400 text-center">
              Temporarily locked. Take a moment to think if you really need this.
            </p>
          </>
        ) : (
          <div className="w-full">
            <button className="w-full bg-[#1c8079] text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:shadow-lg transition-all hover:-translate-y-1">
              Ready to Review <ArrowRight size={16} />
            </button>
            <p className="text-[10px] font-bold text-[#1c8079] text-center mt-3 flex items-center justify-center gap-1">
              <CheckCircle2 size={12} /> Pros & Cons Ready
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const QueuePage = () => {
  const { user } = useAuth();
  const [queueItems, setQueueItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3000/queue/${user.email}`)
        .then((res) => res.json())
        .then((data) => setQueueItems(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleRemoveItem = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/queue/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setQueueItems(prev => prev.filter(item => item._id !== id));
      }
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center" style={{ backgroundColor: C.bg }}>
        <p className="font-bold text-gray-500 animate-pulse">Loading your queue...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-6" style={{ backgroundColor: C.bg }}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ color: C.text }}>
            Your <span style={{ color: C.primary }}>Waitlist</span>
          </h1>
          <p className="text-lg" style={{ color: C.textMuted }}>
            These items are currently in the cool-down phase. Take a breather, let the timer run out, and carefully review them before deciding to purchase.
          </p>
        </div>

        {queueItems.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border text-center shadow-sm" style={{ borderColor: C.border }}>
            <Clock size={48} className="mx-auto mb-6 text-gray-300" />
            <h2 className="text-2xl font-black mb-2" style={{ color: C.text }}>Queue is empty</h2>
            <p style={{ color: C.textMuted }}>Add items from your cart to start the journey.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {queueItems.map((item) => (
              <QueueItemCard key={item._id} item={item} onRemove={handleRemoveItem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QueuePage;
