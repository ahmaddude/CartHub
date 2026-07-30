import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Loader, Mail, ArrowLeft } from 'lucide-react';
import Input from '../components/Input';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error sending reset email:", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-[#1C1B1A]/10 p-10 space-y-8">
      <div className="text-center">
        <h1 className="font-['Fraunces'] text-3xl font-medium text-[#1C1B1A]">Forgot Password</h1>
        <p className="font-['Inter'] text-[#8A8577] mt-2 text-sm">
          Enter your email and we'll send a reset link.
        </p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#1C1B1A] hover:bg-[#C9A227] text-[#FAF7F0] rounded-full font-['Inter'] font-semibold transition-colors duration-300"
          >
            {isLoading ? <Loader className="animate-spin mx-auto" size={20} /> : "Send Reset Link"}
          </button>
        </form>
      ) : (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-[#C9A227]/20 rounded-full flex items-center justify-center mx-auto">
            <Mail className="h-8 w-8 text-[#C9A227]" />
          </div>
          <p className="font-['Inter'] text-[#8A8577] text-sm">
            If an account exists for <strong className="text-[#1C1B1A]">{email}</strong>, you will receive a password reset link shortly.
          </p>
        </div>
      )}

      <div className="text-center">
        <Link
          to="/login"
          className="font-['Inter'] text-sm text-[#C9A227] hover:text-[#1C1B1A] transition-colors inline-flex items-center gap-1"
        >
          <ArrowLeft size={14} /> Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;