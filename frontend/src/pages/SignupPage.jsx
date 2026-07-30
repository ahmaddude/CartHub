import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from '../store/authStore';
import Input from '../components/Input';
import { Loader, Lock, Mail, User, ArrowRight, Store, ShoppingBag, Phone, MapPin } from 'lucide-react';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';

const SignupPage = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("buyer");
  const [phone, setPhone] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [country, setCountry] = React.useState("");
  const navigate = useNavigate();
  const { signup, error, isLoading } = useAuthStore();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const address = role === "seller" ? { street, city, state, zip, country } : undefined;
      await signup(email, password, name, role, phone, address);
      navigate("/verify-email");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-lg border border-[#1C1B1A]/10 p-10 space-y-8">
      <div className="text-center">
        <h1 className="font-['Fraunces'] text-3xl font-medium text-[#1C1B1A]">Create Account</h1>
        <p className="font-['Inter'] text-[#8A8577] mt-2 text-sm">Join us and start your journey</p>
      </div>

      <form onSubmit={handleSignup} className="space-y-6">
        <div className="flex gap-3 p-1.5 bg-[#FAF7F0] rounded-xl">
          <button
            type="button"
            onClick={() => setRole("buyer")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-['Inter'] text-sm font-semibold transition-all duration-200 ${
              role === "buyer" ? "bg-[#1C1B1A] text-[#FAF7F0]" : "text-[#8A8577] hover:text-[#1C1B1A]"
            }`}
          >
            <ShoppingBag size={16} /> Buyer
          </button>
          <button
            type="button"
            onClick={() => setRole("seller")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-['Inter'] text-sm font-semibold transition-all duration-200 ${
              role === "seller" ? "bg-[#1C1B1A] text-[#FAF7F0]" : "text-[#8A8577] hover:text-[#1C1B1A]"
            }`}
          >
            <Store size={16} /> Seller
          </button>
        </div>

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

        {role === "seller" && (
          <div className="space-y-4 p-5 bg-[#FAF7F0] rounded-xl border border-[#1C1B1A]/10">
            <h3 className="font-['Fraunces'] text-base font-medium text-[#1C1B1A] flex items-center gap-2">
              <Store size={16} className="text-[#C9A227]" /> Seller Information
            </h3>

            <Input
              icon={Phone}
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <div className="space-y-1">
              <span className="font-['Inter'] text-xs text-[#8A8577] flex items-center gap-1"><MapPin size={12} /> Address</span>
              <input
                type="text"
                placeholder="Street Address"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full bg-white text-[#1C1B1A] border border-[#1C1B1A]/20 rounded-xl px-4 py-3 font-['Inter'] text-sm focus:outline-none focus:border-[#C9A227] placeholder:text-[#8A8577] transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-white text-[#1C1B1A] border border-[#1C1B1A]/20 rounded-xl px-4 py-3 font-['Inter'] text-sm focus:outline-none focus:border-[#C9A227] placeholder:text-[#8A8577] transition-colors"
              />
              <input
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full bg-white text-[#1C1B1A] border border-[#1C1B1A]/20 rounded-xl px-4 py-3 font-['Inter'] text-sm focus:outline-none focus:border-[#C9A227] placeholder:text-[#8A8577] transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="ZIP Code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="w-full bg-white text-[#1C1B1A] border border-[#1C1B1A]/20 rounded-xl px-4 py-3 font-['Inter'] text-sm focus:outline-none focus:border-[#C9A227] placeholder:text-[#8A8577] transition-colors"
              />
              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-white text-[#1C1B1A] border border-[#1C1B1A]/20 rounded-xl px-4 py-3 font-['Inter'] text-sm focus:outline-none focus:border-[#C9A227] placeholder:text-[#8A8577] transition-colors"
              />
            </div>
          </div>
        )}

        {error && (
          <p className="font-['Inter'] text-red-500 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="group w-full py-3 bg-[#1C1B1A] hover:bg-[#C9A227] text-[#FAF7F0] rounded-full font-['Inter'] font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
        >
          {isLoading ? <Loader className="animate-spin mx-auto" size={20} /> : <>Create Account <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></>}
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
