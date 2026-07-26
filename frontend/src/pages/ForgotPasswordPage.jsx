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
      <div className="w-full max-w-md bg-gray-900 text-white rounded-2xl shadow-xl p-10 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <p className="text-gray-400 mt-2">
            Enter your email address and we'll send you a link to reset your password.
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
              className="w-full py-3 bg-gray-700 hover:bg-gray-800 rounded-lg font-semibold transition"
            >
              {isLoading ? <Loader className="animate-spin mx-auto" size={20} /> : "Send Reset Link"}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <p className="text-gray-300">
              If an account exists for <strong>{email}</strong>, you will receive a password reset link shortly.
            </p>
          </div>
        )}

        <div className="text-center">
          <Link
            to="/login"
            className="text-blue-500 hover:underline flex items-center justify-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
          </Link>
        </div>
      </div>
    
  );
};

export default ForgotPasswordPage;
