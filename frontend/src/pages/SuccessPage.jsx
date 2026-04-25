import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const SuccessPage = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    if (count === 0) {
      navigate('/');
    }

    return () => clearInterval(timer);
  }, [count, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0fafa] px-6 text-center">
      <div className="bg-white p-12 rounded-3xl shadow-xl border border-[#a8d8d4] max-w-md w-full animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle size={64} className="text-green-600" />
          </div>
        </div>
        <h1 className="text-3xl font-black text-[#0d3533] mb-4">Payment Successful!</h1>
        <p className="text-lg text-[#4a8580] mb-8">
          Thanks for shopping with us. Our Customer service will soon contact you.
        </p>
        <div className="border-t pt-6">
          <p className="text-sm text-gray-400">
            Redirecting to home in <span className="font-bold text-[#1c8079]">{count}</span> seconds...
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
