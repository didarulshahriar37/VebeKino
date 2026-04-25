import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader2, CreditCard, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Replace with your publishable key from Stripe Dashboard
const stripePromise = loadStripe('pk_test_51SWKQfBDrJk4FICQz5nSoDl0BwaYbcou9UWud7xLX5JPNRZzQBiqoLaq2evLsvRqm0terCoP7402AbNpLH0b0KxB004pqXsNEy');

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('http://localhost:3000/payment/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, email: user?.email }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) return;

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
            email: user?.email,
        }
      },
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      // Clear queue on success
      await fetch(`http://localhost:3000/queue/clear/${user.email}`, { method: 'DELETE' });
      navigate('/success');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-[#f0fafa] p-6 rounded-2xl border border-[#a8d8d4]">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#0d3533',
                '::placeholder': {
                  color: '#4a8580',
                },
              },
              invalid: {
                color: '#ef4444',
              },
            },
          }}
        />
      </div>
      
      {error && <div className="text-red-500 text-sm font-bold">{error}</div>}

      <button
        disabled={!stripe || processing || !clientSecret}
        className="w-full bg-[#1c8079] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? (
          <>
            <Loader2 className="animate-spin" size={20} /> Processing...
          </>
        ) : (
          `Pay $${amount.toFixed(2)}`
        )}
      </button>
      
      <div className="flex items-center justify-center gap-2 text-[#4a8580] text-xs font-bold uppercase tracking-wider">
        <ShieldCheck size={14} /> Secure SSL Encrypted Payment
      </div>
    </form>
  );
};

const CheckoutPage = () => {
  const location = useLocation();
  const amount = location.state?.amount || 0;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-[#f0fafa]">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-[#0d3533] mb-4">Complete <span className="text-[#1c8079]">Order</span></h1>
          <p className="text-[#4a8580]">Finalize your purchase securely with Stripe.</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#a8d8d4]">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#f0fafa]">
            <span className="text-lg font-bold text-[#4a8580]">Total Amount</span>
            <span className="text-3xl font-black text-[#0d3533]">${amount.toFixed(2)}</span>
          </div>

          <Elements stripe={stripePromise}>
            <CheckoutForm amount={amount} />
          </Elements>
        </div>
        
        <div className="mt-8 flex justify-center gap-6">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6 opacity-50" />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
