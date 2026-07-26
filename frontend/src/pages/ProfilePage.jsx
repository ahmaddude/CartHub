import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Camera, Mail, User, Edit3, Check, X } from "lucide-react";

const ProfilePage = () => {
  const { user, updatedProfile, becomeASeller } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState(user?.bio || "");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updatedProfile({ profilePic: base64Image });
    };
  };

  const handleBioSave = async () => {
    const result = await updatedProfile({ bio: bioText });
    if (result.success) {
      setIsEditingBio(false);
    }
  };

  const handleBioCancel = () => {
    setBioText(user?.bio || "");
    setIsEditingBio(false);
  };

  return (
      <div className="pb-20 md:max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 ">
        {/* Avatar Section */}
        <div className="flex flex-col items-center space-y-6">
          <div className="relative w-40 h-40">
            <img
              src={selectedImg || user?.profilePic || "/avatar.png"}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            />
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-emerald-500 transition"
            >
              <Camera className="w-5 h-5 text-white" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
          <p className="text-gray-400">{user?.email}</p>
        </div>

        {/* User Info Section */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-4">Account Information</h3>
            <div className="grid grid-cols-2 gap-6 text-gray-300">
              <div className="space-y-1">
                <span className="text-gray-400">Member Since</span>
                <p className="text-white font-semibold">{user.createdAt?.split("T")[0]}</p>
              </div>
              <div className="space-y-1">
                <span className="text-gray-400">Account Status</span>
                <p className="text-blue-400 font-semibold">{user?.role}</p>
              </div>
            </div>

            {user?.role !== "seller" && (
              <div className="mt-6">
                <button
                  onClick={becomeASeller}
                  className="bg-blue-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-full font-semibold transition"
                >
                  Become a Seller
                </button>
              </div>
            )}
          </div>

          {/* Additional Info or Settings */}
          <div className="bg-gray-800 rounded-2xl p-8 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">User Bio</h3>
              {!isEditingBio && (
                <button
                  onClick={() => setIsEditingBio(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {isEditingBio ? (
              <div className="space-y-3">
                <textarea
                  value={bioText}
                  onChange={(e) => setBioText(e.target.value)}
                  className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                  rows="4"
                  placeholder="Tell us about yourself..."
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleBioSave}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                  >
                    <Check className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={handleBioCancel}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-300">{user.bio || "No bio added yet."}</p>
            )}
          </div>
        </div>
      </div>
  );
};

export default ProfilePage;