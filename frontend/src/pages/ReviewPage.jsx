import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import API_BASE_URL from "../api/config";
import { ArrowLeft, CheckCircle, ShieldAlert, Loader2 } from "lucide-react";
import { Link } from "react-router";

const C = {
  primary: "#1c8079",
  primaryLight: "#2fe0cb",
  bg: "#f0fafa",
  text: "#0d3533",
  textMuted: "#4a8580",
  white: "#ffffff",
  border: "#a8d8d4",
  success: "#10b981",
  danger: "#ef4444"
};

const ReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/queue/item/${id}`)
      .then(res => res.json())
      .then(data => {
        setItem(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      // If we are at the bottom (allow 5px margin of error)
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        setHasScrolledToBottom(true);
      }
    }
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/queue/${id}/pass-gate-2`, {
        method: 'PUT'
      });
      if (res.ok) {
        navigate('/queue');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: C.bg }}>
        <Loader2 className="animate-spin text-[#1c8079]" size={48} />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: C.bg }}>
        <h1 className="text-3xl font-black mb-4">Item Not Found</h1>
        <Link to="/queue" className="text-[#1c8079] underline">Return to Waitlist</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-6" style={{ backgroundColor: C.bg }}>
      <div className="max-w-5xl mx-auto">
        <Link to="/queue" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-8 transition-all hover:translate-x-[-4px]" style={{ color: C.textMuted }}>
          <ArrowLeft size={14} /> Back to Waitlist
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ color: C.text }}>
            Critical <span style={{ color: C.primary }}>Review</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: C.textMuted }}>
            Before you buy, our AI has analyzed this product. You must read through the pros and cons to ensure you are making a rational decision.
          </p>
        </div>

        <div className="bg-white rounded-3xl border shadow-xl overflow-hidden flex flex-col md:flex-row" style={{ borderColor: C.border }}>
          
          {/* Left Side: Product Info */}
          <div className="w-full md:w-1/3 p-8 bg-gray-50 border-r flex flex-col items-center justify-center text-center" style={{ borderColor: C.border }}>
            <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-md mb-6">
              <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <h2 className="text-2xl font-black mb-2" style={{ color: C.text }}>{item.name}</h2>
            <p className="text-3xl font-black" style={{ color: C.primary }}>${item.price * item.quantity}</p>
          </div>

          {/* Right Side: Scrollable Pros/Cons */}
          <div className="w-full md:w-2/3 flex flex-col h-[600px]">
            <div 
              className="flex-1 overflow-y-auto p-8"
              ref={scrollContainerRef}
              onScroll={handleScroll}
            >
              <div className="space-y-12 pb-12">
                {/* Pros Section */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-green-100 p-2 rounded-xl text-green-600">
                      <CheckCircle size={24} />
                    </div>
                    <h3 className="text-2xl font-black text-green-600">The Good</h3>
                  </div>
                  <ul className="space-y-4">
                    {item.pros && item.pros.length > 0 ? item.pros.map((pro, index) => (
                      <li key={index} className="bg-green-50 p-4 rounded-2xl text-green-900 border border-green-100 shadow-sm text-lg leading-relaxed">
                        {pro}
                      </li>
                    )) : (
                      <li className="text-gray-500">No pros found.</li>
                    )}
                  </ul>
                </div>

                <div className="h-px bg-gray-200 w-full" />

                {/* Cons Section */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-red-100 p-2 rounded-xl text-red-600">
                      <ShieldAlert size={24} />
                    </div>
                    <h3 className="text-2xl font-black text-red-600">The Bad</h3>
                  </div>
                  <ul className="space-y-4">
                    {item.cons && item.cons.length > 0 ? item.cons.map((con, index) => (
                      <li key={index} className="bg-red-50 p-4 rounded-2xl text-red-900 border border-red-100 shadow-sm text-lg leading-relaxed">
                        {con}
                      </li>
                    )) : (
                      <li className="text-gray-500">No cons found.</li>
                    )}
                  </ul>
                </div>
                
                {/* Visual indicator for end of scroll */}
                <div className="text-center pt-8 text-gray-400 text-sm font-bold uppercase tracking-widest">
                  End of Analysis
                </div>
              </div>
            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="p-6 bg-white border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: C.border }}>
              <p className={`text-sm font-bold transition-colors ${hasScrolledToBottom ? 'text-green-600' : 'text-amber-500'}`}>
                {hasScrolledToBottom ? "✓ You've read the analysis" : "↓ Scroll to the bottom to unlock"}
              </p>
              
              <button 
                onClick={handleConfirm}
                disabled={!hasScrolledToBottom || isSubmitting}
                className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all ${
                  hasScrolledToBottom && !isSubmitting
                    ? 'bg-[#1c8079] text-white hover:shadow-lg hover:-translate-y-1' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : "I Understand & Confirm"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
