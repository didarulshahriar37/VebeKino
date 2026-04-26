import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import API_BASE_URL from "../api/config";
import { ArrowLeft, Loader2, PenTool, CheckCircle } from "lucide-react";

const C = {
  primary: "#1c8079",
  primaryLight: "#2fe0cb",
  bg: "#f0fafa",
  text: "#0d3533",
  textMuted: "#4a8580",
  white: "#ffffff",
  border: "#a8d8d4",
  danger: "#ef4444"
};

const JustifyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [justification, setJustification] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

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

  const wordCount = justification.trim().split(/\s+/).filter(word => word.length > 0).length;

  const handleSubmit = async () => {
    if (justification.trim().length === 0) return;
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch(`${API_BASE_URL}/queue/${id}/justify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ justification })
      });
      const data = await res.json();
      
      if (data.success) {
        setFeedback({ type: 'success', text: data.feedback, score: data.score });
        setTimeout(() => {
          navigate('/queue');
        }, 3000);
      } else {
        setFeedback({ type: 'error', text: data.feedback, score: data.score });
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

  return (
    <div className="min-h-screen pt-28 pb-20 px-6" style={{ backgroundColor: C.bg }}>
      <div className="max-w-5xl mx-auto">
        <Link to="/queue" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-8 transition-all hover:translate-x-[-4px]" style={{ color: C.textMuted }}>
          <ArrowLeft size={14} /> Back to Waitlist
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ color: C.text }}>
            Purchase <span style={{ color: C.primary }}>Intent Validation</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: C.textMuted }}>
            Before you finalize this purchase, let's take a step back. Explain why you are choosing to buy this item and how it brings genuine value to your life.
          </p>
        </div>

        <div className="bg-white rounded-3xl border shadow-xl overflow-hidden flex flex-col md:flex-row" style={{ borderColor: C.border }}>
          
          {/* Left Side: Product Info */}
          <div className="w-full md:w-1/3 p-8 bg-gray-50 border-r flex flex-col items-center justify-center text-center" style={{ borderColor: C.border }}>
            <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-md mb-6">
              <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <h2 className="text-2xl font-black mb-2" style={{ color: C.text }}>{item.name}</h2>
            <p className="text-3xl font-black mb-4" style={{ color: C.primary }}>${item.price * item.quantity}</p>
          </div>

          {/* Right Side: Text Area */}
          <div className="w-full md:w-2/3 p-8 flex flex-col">
            <h3 className="text-xl font-black mb-4 flex items-center gap-2" style={{ color: C.text }}>
              <PenTool size={20} style={{ color: C.primary }} /> Why do you deserve this?
            </h3>
            
            <textarea
              className="flex-1 w-full p-6 bg-[#f0fafa] border rounded-2xl focus:outline-none focus:ring-2 resize-none min-h-[300px]"
              style={{ borderColor: C.border, color: C.text, focusRingColor: C.primaryLight }}
              placeholder="Explain how this item brings long-term value to your life, how it solves a genuine problem, and why you are choosing to buy it now instead of waiting..."
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              disabled={isSubmitting || feedback?.type === 'success'}
            ></textarea>

            <div className="flex items-center justify-between mt-4">
              <p className={`text-xs font-bold uppercase tracking-widest text-gray-500`}>
                {wordCount} words
              </p>
            </div>

            {feedback && (
              <div className={`mt-6 p-4 rounded-xl border flex gap-4 items-start ${feedback.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className={`font-black text-2xl ${feedback.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {feedback.score}
                </div>
                <div>
                  <p className={`font-bold ${feedback.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                    {feedback.type === 'success' ? 'AI Approved!' : 'AI Rejected.'}
                  </p>
                  <p className="text-sm mt-1">{feedback.text}</p>
                </div>
              </div>
            )}

            <button 
              onClick={handleSubmit}
              disabled={justification.trim().length === 0 || isSubmitting || feedback?.type === 'success'}
              className={`w-full mt-6 py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all ${
                justification.trim().length > 0 && !isSubmitting && feedback?.type !== 'success'
                  ? 'bg-[#1c8079] text-white hover:shadow-lg hover:-translate-y-1' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Analyzing Text...
                </>
              ) : feedback?.type === 'success' ? (
                <>
                  <CheckCircle size={18} /> Verified & Unlocked
                </>
              ) : (
                "Submit Justification"
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default JustifyPage;
