import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from '../store/authStore';
import Input from '../components/Input';
import { Loader, Lock, Mail, User, ArrowRight } from 'lucide-react';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';

const SignupPage = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const { signup, error, isLoading } = useAuthStore();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      navigate("/verify-email");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-[#1C1B1A]/10 p-10 space-y-8">
      <div className="text-center">
        <h1 className="font-['Fraunces'] text-3xl font-medium text-[#1C1B1A]">Create Account</h1>
        <p className="font-['Inter'] text-[#8A8577] mt-2 text-sm">Sign up to start shopping</p>
      </div>

      <form onSubmit={handleSignup} className="space-y-6">
        <Input
          icon={User}
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          icon={Mail}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          icon={Lock}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <PasswordStrengthMeter password={password} />

        <button
          type="submit"
          disabled={isLoading}
          className="group w-full py-3 bg-[#1C1B1A] hover:bg-[#C9A227] text-[#FAF7F0] rounded-full font-['Inter'] font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
        >
          {isLoading ? <Loader className="animate-spin mx-auto" size={20} /> : <>Sign Up <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></>}
        </button>
      </form>

      <div className="text-center font-['Inter'] text-sm text-[#8A8577]">
        Already have an account?{" "}
        <Link to="/login" className="text-[#C9A227] hover:text-[#1C1B1A] transition-colors font-medium">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;