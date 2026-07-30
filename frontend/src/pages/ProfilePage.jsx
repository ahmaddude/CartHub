import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Camera, Edit3, Check, X } from "lucide-react";

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
    <div className="pb-20 md:max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative w-40 h-40">
          <img
            src={selectedImg || user?.profilePic || "/avatar.png"}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-[#C9A227]/30 shadow-lg"
          />
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-0 right-0 bg-[#C9A227] w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#1C1B1A] transition-colors"
          >
            <Camera className="w-5 h-5 text-[#FAF7F0]" />
            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </div>
        <h2 className="font-['Fraunces'] text-2xl font-medium text-[#1C1B1A]">{user?.name}</h2>
        <p className="font-['Inter'] text-sm text-[#8A8577]">{user?.email}</p>
      </div>

      <div className="md:col-span-2 space-y-6">
        <div className="bg-white rounded-2xl shadow-lg border border-[#1C1B1A]/10 p-8">
          <h3 className="font-['Fraunces'] text-xl font-medium text-[#1C1B1A] mb-4">Account Information</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <span className="font-['Inter'] text-sm text-[#8A8577]">Member Since</span>
              <p className="font-['Inter'] text-[#1C1B1A] font-semibold">{user.createdAt?.split("T")[0]}</p>
            </div>
            <div className="space-y-1">
              <span className="font-['Inter'] text-sm text-[#8A8577]">Account Status</span>
              <p className="font-['Inter'] text-[#C9A227] font-semibold">{user?.role}</p>
            </div>
          </div>

          {user?.role !== "seller" && (
            <div className="mt-6">
              <button
                onClick={becomeASeller}
                className="bg-[#1C1B1A] hover:bg-[#C9A227] text-[#FAF7F0] px-6 py-3 rounded-full font-['Inter'] font-semibold transition-colors duration-300"
              >
                Become a Seller
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-[#1C1B1A]/10 p-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-['Fraunces'] text-xl font-medium text-[#1C1B1A]">User Bio</h3>
            {!isEditingBio && (
              <button
                onClick={() => setIsEditingBio(true)}
                className="bg-[#FAF7F0] hover:bg-[#1C1B1A] text-[#1C1B1A] hover:text-[#FAF7F0] p-2 rounded-lg transition-colors"
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
                className="w-full bg-[#FAF7F0] text-[#1C1B1A] p-3 rounded-lg border border-[#1C1B1A]/20 focus:border-[#C9A227] focus:outline-none resize-none font-['Inter']"
                rows="4"
                placeholder="Tell us about yourself..."
              />
              <div className="flex gap-2">
                <button
                  onClick={handleBioSave}
                  className="bg-[#C9A227] hover:bg-[#1C1B1A] text-[#FAF7F0] px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-['Inter'] text-sm"
                >
                  <Check className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={handleBioCancel}
                  className="bg-[#FAF7F0] border border-[#1C1B1A]/20 text-[#1C1B1A] px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-['Inter'] text-sm"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="font-['Inter'] text-[#8A8577]">{user.bio || "No bio added yet."}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;