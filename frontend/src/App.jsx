import { Navigate, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import {  useEffect } from "react";
import ProfilePage from "./pages/ProfilePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { Loader } from "lucide-react";
import Success from "./pages/success";
import Cancel from "./pages/cancel";
import HomePage from "./pages/HomePage";
import ProductsDetails from "./pages/ProductsDetails";
import Navbar from "./components/navbar";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import CategoriesPage from "./pages/CategoriesPage";
import AddProductPage from "./pages/AddProductPage";

//protect routes thatrequire authentication
const ProtectedRoute = ({children}) => {
  const {isAuthenticated,user}=useAuthStore();
  
  if(!isAuthenticated){
    return <Navigate to="/login" replace/>
  }
  if(user && !user.isVerified){
    return <Navigate to="/verify-email" replace/>
  }

  return children
}

//redirect authenticated users to the home page

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};


function App() {
  const {isCheckingAuth,checkAuth}=useAuthStore();

  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  if(isCheckingAuth)return <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center"><Loader className="size-10 animate-spin text-[#C9A227]"/></div>
  return (
  <>
  <Navbar/>
    <div className="min-h-screen bg-[#FAF7F0] pt-20 w-full"
     >
      
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        
        <Route path="/signup" element={<RedirectAuthenticatedUser><SignupPage/></RedirectAuthenticatedUser>}/>
        <Route path="/login" element={<RedirectAuthenticatedUser><LoginPage/></RedirectAuthenticatedUser>}/>
        <Route path="/verify-email" element={<EmailVerificationPage/>}/>
        <Route path="/forgot-password" element={<RedirectAuthenticatedUser><ForgotPasswordPage/></RedirectAuthenticatedUser>}/>
        <Route path="/reset-password/:token" element={<RedirectAuthenticatedUser><ResetPasswordPage/></RedirectAuthenticatedUser>}/>
        <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
        <Route path="/search" element={<SearchResultsPage/>}/>
        <Route path="/categories" element={<CategoriesPage/>}/>
        <Route path="/add-Product" element={<ProtectedRoute><AddProductPage/></ProtectedRoute>}/>
        <Route path="/product/:id" element={<ProductsDetails/>}/>
        <Route path="/cart" element={<ProtectedRoute><CartPage/></ProtectedRoute>}/>
        <Route path="/order" element={<ProtectedRoute><OrderPage/></ProtectedRoute>}/>
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1C1B1A',
            color: '#FAF7F0',
            borderRadius: '12px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
          },
        }}
      />
    </div></>
  )
}

export default App



