import {create} from 'zustand';
import axios from 'axios';

const API_URL=import.meta.env.MODE==="development" ?"http://localhost:5000/api/auth": "/api/auth";

axios.defaults.withCredentials=true;

export const useAuthStore=create((set)=>({
user:null,
isAuthenticated:false,
error:null,
isLoading:false,
isCheckingAuth:true,
message:null,
verifyEmail:async(code)=>{
    set({isLoading:true, error:null});
    try {
        const response=await axios.post(`${API_URL}/verify-email`,{code});
        set({user:response.data.user,isAuthenticated:true,isLoading:false});
        return response.data;
    } catch (error) {
        set({error:error.response.data.message || "Error verifying email",isLoading:false});
        throw error;
    }
},
signup:async(email,password,name)=>{
    set({isLoading:true,error:null});
    try {
        const response=await axios.post(`${API_URL}/signup`,{
            email,password,name
        });
        set({user:response.data.user, isAuthenticated:true,isLoading:false})
    } catch (error) {
        set({error:error.response.data.message || "Error signing up",isLoading:false});
        throw error;
    }
},
Login:async(email,password)=>{
    set({isLoading:true,error:null});
    try {
        const response= await axios.post(`${API_URL}/login`,{
            email,password
        });
        set({user:response.data.user, isAuthenticated:true, isLoading:false})
    } catch (error) {
        set({error:error.response.data.message||"Error in login", isLoading:false});
        throw error;
    }
},

forgotPassword:async(email)=>{
    set({isLoading:true,error:null});
    try {
        const respose=await axios.post(`${API_URL}/forgot-password`,{email})
        set({message:respose.data.message,isLoading:false});

    } catch (error) {
        set({
                isLoading:false,
                error:error.response.data.message || "Error sending reset password email",
            });
            throw error;
    }
},
resetPassword:async(token,password)=>{
    set({isLoading:true,error:null});
    try {
        const response =await axios.post(`${API_URL}/reset-password/${token}`,{password});
        set({message:response.data.message,isLoading:false});
    } catch (error) {
            set({error:error.response.data.message || "Error resetting password",isLoading:false});
            throw error;
    }
},
logout:async()=>{
    set({isLoading:true,error:null});
        try {
            await axios.post(`${API_URL}/logout`);
            set({user:null,isAuthenticated:false,error:null,isLoading:false});
        } catch (error) {
            set({error:error.response.data.message || "Error logging out",isLoading:false});
            throw error;
        }
},
checkAuth:async()=>{
    set({isCheckingAuth:true,error:null});
    try {
        const response=await axios.get(`${API_URL}/check-auth`);
        set({user:response.data.user,isAuthenticated:true,isCheckingAuth:false})
    } catch (error) {
        set({error:error.response.data.message,user:null,isCheckingAuth:false})
        console.log("error in check auth")
    }
},
updatedProfile: async(data) => {
    try {
        // Validate that at least one field is provided
        if (!data.profilePic && !data.bio) {
            throw new Error("At least one field (profilePic or bio) is required");
        }

        const res = await axios.put(`${API_URL}/update-profile`, data);
        
        // Update the user state with the returned user data
        set({ user: res.data });
        
        return { success: true, user: res.data };
        
    } catch (error) {
        console.log("error in update profile", error);
        
        // Return error information for better error handling in components
        const errorMessage = error.response?.data?.message || error.message || "Failed to update profile";
        
        return { 
            success: false, 
            error: errorMessage 
        };
    }
},

becomeASeller:async()=>{
    try {
        const res=await axios.post(`${API_URL}/become-seller`);
        set({user:res.data.user});
    } catch (error) {
        console.log("error in become a seller",error);
    }}


}));

