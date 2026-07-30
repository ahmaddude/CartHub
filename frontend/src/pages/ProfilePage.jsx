import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Camera, Edit3, Check, X, Mail, Calendar, Shield, Store, Phone, MapPin } from "lucide-react";

const ProfilePage = () => {
  const { user, updatedProfile } = useAuthStore();
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
    <div className="w-full max-w-4xl mx-auto px-4 pb-20 space-y-8">
      <div className="bg-white rounded-3xl shadow-lg border border-[#1C1B1A]/10 p-8 md:p-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="relative w-32 h-32 md:w-36 md:h-36 flex-shrink-0">
            <img
              src={selectedImg || user?.profilePic || "/avatar.png"}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-[#C9A227]/30 shadow-lg"
            />
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-1 right-1 bg-[#C9A227] w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#1C1B1A] transition-colors shadow-md"
            >
              <Camera className="w-4 h-4 text-[#FAF7F0]" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <h1 className="font-['Fraunces'] text-3xl font-medium text-[#1C1B1A]">{user?.name}</h1>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-['Inter'] font-semibold ${
                  user?.role === "seller" ? "bg-[#C9A227]/10 text-[#C9A227]" : "bg-[#1C1B1A]/5 text-[#8A8577]"
                }`}>
                  {user?.role === "seller" ? <Store size={12} /> : <Shield size={12} />}
                  {user?.role}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-['Inter'] text-sm">
              <div className="flex items-center gap-2 text-[#8A8577]">
                <Mail size={14} /> {user?.email}
              </div>
              <div className="flex items-center gap-2 text-[#8A8577]">
                <Calendar size={14} /> Joined {user?.createdAt?.split("T")[0]}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl shadow-lg border border-[#1C1B1A]/10 p-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-['Fraunces'] text-xl font-medium text-[#1C1B1A]">Bio</h3>
            {!isEditingBio && (
              <button
                onClick={() => setIsEditingBio(true)}
                className="text-[#8A8577] hover:text-[#1C1B1A] p-2 rounded-lg transition-colors"
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
                className="w-full bg-[#FAF7F0] text-[#1C1B1A] p-3 rounded-xl border border-[#1C1B1A]/20 focus:border-[#C9A227] focus:outline-none resize-none font-['Inter'] text-sm"
                rows="4"
                placeholder="Tell us about yourself..."
              />
              <div className="flex gap-2">
                <button
                  onClick={handleBioSave}
                  className="bg-[#C9A227] hover:bg-[#1C1B1A] text-[#FAF7F0] px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-['Inter'] text-sm"
                >
                  <Check className="w-4 h-4" /> Save
                </button>
                <button
                  onClick={handleBioCancel}
                  className="bg-[#FAF7F0] border border-[#1C1B1A]/20 text-[#1C1B1A] px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-['Inter'] text-sm"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="font-['Inter'] text-[#8A8577] text-sm leading-relaxed">
              {user?.bio || "No bio added yet."}
            </p>
          )}
        </div>

        {user?.role === "seller" && (
          <div className="bg-white rounded-3xl shadow-lg border border-[#1C1B1A]/10 p-8 space-y-5">
            <h3 className="font-['Fraunces'] text-xl font-medium text-[#1C1B1A] flex items-center gap-2">
              <Store size={18} className="text-[#C9A227]" /> Seller Info
            </h3>
            <div className="space-y-4 font-['Inter'] text-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#FAF7F0] rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone size={15} className="text-[#8A8577]" />
                </div>
                <div>
                  <p className="text-[#8A8577] text-xs">Phone</p>
                  <p className="text-[#1C1B1A]">{user?.phone || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-[#FAF7F0] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={15} className="text-[#8A8577]" />
                </div>
                <div>
                  <p className="text-[#8A8577] text-xs">Address</p>
                  <p className="text-[#1C1B1A]">
                    {user?.address?.street ? (
                      <>
                        {user.address.street}<br />
                        {[user.address.city, user.address.state, user.address.zip].filter(Boolean).join(", ")}
                        {user.address.country ? <><br />{user.address.country}</> : ""}
                      </>
                    ) : "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {user?.role !== "seller" && (
          <div className="bg-white rounded-3xl shadow-lg border border-[#1C1B1A]/10 p-8 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-14 h-14 bg-[#FAF7F0] rounded-full flex items-center justify-center">
              <Store size={24} className="text-[#8A8577]" />
            </div>
            <h3 className="font-['Fraunces'] text-lg font-medium text-[#1C1B1A]">Want to sell?</h3>
            <p className="font-['Inter'] text-sm text-[#8A8577] max-w-xs">
              You chose a buyer account during signup. To become a seller, you'll need to create a new seller account.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
