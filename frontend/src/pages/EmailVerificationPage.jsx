import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const EmailVerificationPage = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { error, isLoading, verifyEmail } = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value.slice(0, 1);
    setCode(newCode);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '').slice(0, 6);
    const newCode = [...code];
    for (let i = 0; i < 6; i++) {
      newCode[i] = pastedData[i] || '';
    }
    setCode(newCode);
    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join('');
    try {
      await verifyEmail(verificationCode);
      navigate('/');
      toast.success('Email verified successfully!');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (code.every(digit => digit !== '')) {
      handleSubmit({ preventDefault: () => {} });
    }
  }, [code]);

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-[#1C1B1A]/10 p-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-['Fraunces'] text-3xl font-medium text-[#1C1B1A]">Verify Your Email</h1>
        <p className="font-['Inter'] text-[#8A8577] text-sm">Enter the 6-digit code sent to your email</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between gap-2">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={el => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-2xl font-['Fraunces'] bg-[#FAF7F0] text-[#1C1B1A] border-2 border-[#1C1B1A]/20 rounded-lg focus:border-[#C9A227] focus:outline-none"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={isLoading || code.some(digit => !digit)}
          className="w-full py-3 bg-[#1C1B1A] hover:bg-[#C9A227] text-[#FAF7F0] rounded-full font-['Inter'] font-semibold transition-colors duration-300"
        >
          {isLoading ? 'Verifying...' : 'Verify Email'}
        </button>
      </form>
    </div>
  );
};

export default EmailVerificationPage;