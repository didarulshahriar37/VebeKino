import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Clock, Lock, CheckCircle2, ArrowRight, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router";

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
    if (!targetDate) {
      setIsLocked(false);
      setTimeLeft("");
      return;
    }

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
                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: C.textMuted }}>
                  {isLocked ? "Cooling Down" : "Processing"}
                </p>
                <p className="font-mono font-black text-lg" style={{ color: C.text }}>
                  {isLocked ? timeLeft : "AI Analyzing..."}
                </p>
              </div>
            </div>
            <p className="text-[10px] font-bold text-gray-400 text-center">
              {isLocked 
                ? "Temporarily locked. Take a moment to think if you really need this." 
                : "Timer finished. Waiting for AI to generate Pros/Cons..."}
            </p>
          </>
        ) : item.gate === 2 ? (
          <div className="w-full">
            {!item.cognitivePassed ? (
              <>
                <Link 
                  to={`/review/${item._id}`}
                  className="w-full bg-[#1c8079] text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  Ready to Review <ArrowRight size={16} />
                </Link>
                <p className="text-[10px] font-bold text-[#1c8079] text-center mt-3 flex items-center justify-center gap-1">
                  <CheckCircle2 size={12} /> Pros & Cons Ready
                </p>
              </>
            ) : (
              <div className="w-full bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                <CheckCircle2 size={16} /> Review Complete
              </div>
            )}
          </div>
        ) : item.gate === 3 ? (
          <div className="w-full text-center p-4 bg-[#f0fafa] rounded-2xl border" style={{ borderColor: C.border }}>
            <p className="text-sm font-bold" style={{ color: C.text }}>Pending Community Validation</p>
            <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">Share to unlock</p>
          </div>
        ) : item.gate === 4 ? (
          <div className="w-full text-center p-4 bg-purple-50 rounded-2xl border border-purple-200">
            <p className="text-sm font-bold text-purple-700">Ready for Final Approval</p>
            <p className="text-[10px] text-purple-500 mt-1 uppercase tracking-widest">Explain your intent below</p>
          </div>
        ) : (
          <div className="w-full text-center p-4 bg-green-50 rounded-2xl border border-green-200">
            <p className="text-sm font-bold text-green-700 flex items-center justify-center gap-2">
              <CheckCircle2 size={16} /> Fully Unlocked
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const QueuePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [queueItems, setQueueItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let interval;
    if (user) {
      const fetchQueue = () => {
        fetch(`http://localhost:3000/queue/${user.email}`)
          .then((res) => res.json())
          .then((data) => setQueueItems(data))
          .catch((err) => console.error(err))
          .finally(() => setLoading(false));
      };

      fetchQueue();
      // Poll every 3 seconds to catch cron job updates automatically
      interval = setInterval(fetchQueue, 3000);
    }
    return () => clearInterval(interval);
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
            <div className="space-y-4">
              {queueItems.map((item) => (
                <QueueItemCard key={item._id} item={item} onRemove={handleRemoveItem} />
              ))}
            </div>

            {/* Global Action Block at the Bottom */}
            <div className="mt-12 bg-white p-8 rounded-3xl shadow-xl border flex flex-col md:flex-row items-center justify-between gap-6" style={{ borderColor: C.border }}>
              {(() => {
                const gate1Items = queueItems.filter(i => i.gate === 1);
                const gate2Items = queueItems.filter(i => i.gate === 2);
                const gate3Items = queueItems.filter(i => i.gate === 3);
                const gate4Items = queueItems.filter(i => i.gate === 4);
                const gate5Items = queueItems.filter(i => i.gate === 5);

                // Hierarchy: If ANY item is in Gate 1, we must wait.
                // If NO Gate 1, but ANY Gate 2, we must review those.
                // If NO Gate 1 or 2, and ANY Gate 3, we do Social.

                if (gate1Items.length > 0) {
                  return (
                    <div className="text-center w-full py-4">
                      <h3 className="text-2xl font-black mb-1 flex items-center justify-center gap-2" style={{ color: C.text }}>
                        <Lock size={24} style={{ color: C.primary }} /> Cooling Down
                      </h3>
                      <p className="font-bold text-gray-400 uppercase tracking-widest">Awaiting timer completion</p>
                    </div>
                  );
                } else if (gate2Items.length > 0) {
                  const unreviewedItems = gate2Items.filter(i => !i.cognitivePassed);
                  
                  if (unreviewedItems.length > 0) {
                    const firstUnreviewed = unreviewedItems[0];
                    return (
                      <>
                        <div className="flex-1">
                          <h3 className="text-2xl font-black mb-1" style={{ color: C.text }}>Ready for Review</h3>
                          <p style={{ color: C.textMuted }}>You must review all items before proceeding to the next phase. {unreviewedItems.length} item{unreviewedItems.length > 1 ? 's' : ''} left.</p>
                        </div>
                        <Link 
                          to={`/review/${firstUnreviewed._id}`}
                          className="bg-[#1c8079] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all hover:-translate-y-1 whitespace-nowrap"
                        >
                          Review Next Item <ArrowRight size={18} />
                        </Link>
                      </>
                    );
                  } else {
                    // All Gate 2 items are reviewed
                    return (
                      <>
                        <div className="flex-1">
                          <h3 className="text-2xl font-black mb-1 text-green-600 flex items-center gap-2">
                            <CheckCircle2 size={24} /> All Reviews Complete
                          </h3>
                          <p style={{ color: C.textMuted }}>You have successfully reviewed the AI pros and cons for all your items.</p>
                        </div>
                        <button 
                          onClick={async () => {
                            await fetch('http://localhost:3000/queue/batch-pass-gate-2', {
                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ userEmail: user.email })
                            });
                            // Force fetch
                            fetch(`http://localhost:3000/queue/${user.email}`)
                              .then(res => res.json())
                              .then(data => setQueueItems(data));
                          }}
                          className="bg-[#1c8079] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all hover:-translate-y-1 whitespace-nowrap"
                        >
                          Proceed to Community Validation <ArrowRight size={18} />
                        </button>
                      </>
                    );
                  }
                } else if (gate3Items.length > 0) {
                  return <GlobalSocialBlock gate3Items={gate3Items} userEmail={user.email} onUpdate={() => {
                    fetch(`http://localhost:3000/queue/${user.email}`)
                      .then((res) => res.json())
                      .then((data) => setQueueItems(data));
                  }} />;
                } else if (gate4Items.length > 0) {
                  const firstGate4 = gate4Items[0];
                  return (
                    <>
                      <div className="flex-1">
                        <h3 className="text-2xl font-black mb-1" style={{ color: C.text }}>Final Check: Is this necessary?</h3>
                        <p style={{ color: C.textMuted }}>Take a moment to explain why this purchase is a responsible decision. {gate4Items.length} item{gate4Items.length > 1 ? 's' : ''} left.</p>
                      </div>
                      <Link 
                        to={`/justify/${firstGate4._id}`}
                        className="bg-purple-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all hover:-translate-y-1 whitespace-nowrap"
                      >
                        Review Purchase Intent <ArrowRight size={18} />
                      </Link>
                    </>
                  );
                } else if (gate5Items.length > 0) {
                  return (
                    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
                      <div>
                        <h3 className="text-3xl font-black mb-1 text-green-600 flex items-center gap-2">
                          <CheckCircle2 size={28} /> All Gates Passed!
                        </h3>
                        <p style={{ color: C.textMuted }}>Congratulations! You have successfully survived the anti-impulse gauntlet. You may now proceed to final checkout.</p>
                      </div>
                      <button 
                        className="bg-green-600 text-white px-12 py-5 rounded-3xl font-black uppercase tracking-widest text-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all hover:-translate-y-1 whitespace-nowrap"
                        onClick={() => {
                          const totalAmount = gate5Items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
                          navigate('/checkout', { state: { amount: totalAmount } });
                        }}
                      >
                        Checkout Now
                      </button>
                    </div>
                  );
                } else {
                  return (
                    <div className="text-center w-full py-4">
                      <p className="font-bold text-[#1c8079] uppercase tracking-widest text-xl">Proceeding to Final Approval...</p>
                    </div>
                  );
                }
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Global Social Sharing Block (Gate 3)
const GlobalSocialBlock = ({ gate3Items, userEmail, onUpdate }) => {
  const stateItem = gate3Items[0]; // All items in Gate 3 have the same sharesCount
  const sharesCount = stateItem.sharesCount || 0;
  const { timeLeft, isLocked } = useCountdown(stateItem.socialFallbackTime);

  const handleShare = async () => {
    try {
      const res = await fetch('http://localhost:3000/queue/share', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail })
      });
      if (res.ok) {
        onUpdate();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-black mb-2" style={{ color: C.text }}>Community Validation</h3>
        <p style={{ color: C.textMuted }}>
          To ensure you truly need these items, we ask that you share them with 5 friends.
          <br/>Taking this extra step helps prevent impulsive purchases. (1-minute pause between shares.)
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 w-full max-w-3xl">
        {[0, 1, 2, 3, 4].map((index) => {
          const isCompleted = sharesCount > index;
          const isActive = sharesCount === index;
          
          if (isCompleted) {
            return (
              <div key={index} className="flex-1 min-w-[120px] h-14 bg-green-50 border border-green-200 rounded-xl flex items-center justify-center text-green-600 font-bold gap-2">
                <CheckCircle2 size={18} /> Shared
              </div>
            );
          }

          if (isActive) {
            if (isLocked) {
              return (
                <div key={index} className="flex-1 min-w-[120px] h-14 bg-gray-100 border border-gray-300 rounded-xl flex items-center justify-center text-gray-500 font-mono font-bold shadow-inner">
                  {timeLeft}
                </div>
              );
            }
            return (
              <button 
                key={index}
                onClick={handleShare}
                className="flex-1 min-w-[120px] h-14 bg-[#1c8079] text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                Share Now
              </button>
            );
          }

          return (
            <div key={index} className="flex-1 min-w-[120px] h-14 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 font-bold gap-2 opacity-50">
              <Lock size={14} /> Locked
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QueuePage;
