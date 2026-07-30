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
    newCode[index] = value;
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

  // auto submit when all fields are filled
  useEffect(() => {
    if (code.every(digit => digit !== '')) {
      handleSubmit({ preventDefault: () => {} });
    }
  }, [code]);

  return (
      <div className="w-full max-w-md bg-gray-900 text-white rounded-2xl shadow-xl p-10 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Verify Your Email</h1>
          <p className="text-gray-400">Enter the 6-digit code sent to your email address.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
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
                className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            ))}
          </div>


          <button
            type="submit"
            disabled={isLoading || code.some(digit => !digit)}
            className="w-full py-3 bg-gray-700 hover:bg-gray-800 rounded-lg font-semibold transition"
          >
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>
      </div>
  );
};

export default EmailVerificationPage;
