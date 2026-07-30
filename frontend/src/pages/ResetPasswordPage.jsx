import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from "../components/Input"
import {Lock} from "lucide-react"

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {resetPassword,error,isLoading,message}= useAuthStore();

    const {token}=useParams();
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert("Passwords do not match");
            return;
        }
        try {
            await resetPassword(token,password);
            toast.success("Password reset successfully, redirecting to login page...");
            setTimeout(()=>{
                navigate("/login");
            },2000);
        } catch (error) {
          console.error(error);
          toast.error(error.message ||"Error resetting password");
        }
    }
  return (
    <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-[#1C1B1A]/10 p-10 space-y-8">
        <div className="text-center">
          <h1 className="font-['Fraunces'] text-3xl font-medium text-[#1C1B1A]">Reset Password</h1>
          <p className="font-['Inter'] text-[#8A8577] mt-2 text-sm">Enter your new password below.</p>
        </div>
          {error && <p className="font-['Inter'] text-sm text-red-500">{error}</p>}
          {message && <p className="font-['Inter'] text-sm text-[#C9A227]">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            icon={Lock}
            type='password'
            placeholder='New Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            icon={Lock}
            type='password'
            placeholder='Confirm New Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            className='w-full py-3 bg-[#1C1B1A] hover:bg-[#C9A227] text-[#FAF7F0] rounded-full font-['Inter'] font-semibold transition-colors duration-300'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Set New Password"}
          </button>
        </form>
    </div>
  )
}

export default ResetPasswordPage