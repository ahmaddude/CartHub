import { useState, useEffect } from "react";
import { Lock, Mail, Loader, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { Login, isLoading, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    await Login(email, password);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-[#1C1B1A]/10 p-10 space-y-8">
      <div className="text-center">
        <h1 className="font-['Fraunces'] text-3xl font-medium text-[#1C1B1A]">Welcome Back</h1>
        <p className="font-['Inter'] text-[#8A8577] mt-2 text-sm">Log in to continue shopping</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
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

        <div className="flex justify-end mb-2">
          <Link
            to="/forgot-password"
            className="font-['Inter'] text-sm text-[#C9A227] hover:text-[#1C1B1A] transition-colors"
          >
            Forgot your password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="group w-full py-3 bg-[#1C1B1A] hover:bg-[#C9A227] text-[#FAF7F0] rounded-full font-['Inter'] font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
        >
          {isLoading ? <Loader className="animate-spin" size={20} /> : <>Login <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></>}
        </button>
      </form>

      <div className="text-center font-['Inter'] text-sm text-[#8A8577]">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="text-[#C9A227] hover:text-[#1C1B1A] transition-colors font-medium">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;