import { Check, X } from "lucide-react"

const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "At least 1 uppercase letter", met: /[A-Z]/.test(password) },
    { label: "At least 1 lowercase letter", met: /[a-z]/.test(password) },
    { label: "At least 1 number", met: /\d/.test(password) },
    { label: "At least 1 special character", met: /[^A-Za-z0-9]/.test(password) },
  ];
  return (
    <div className="mt-2 space-y-1">
      {criteria.map((item) => (
        <div key={item.label} className="flex items-center text-xs font-['Inter']">
          {item.met ? (
            <Check className="text-green-500 mr-2" size={14} />
          ) : (
            <X className="text-[#8A8577] mr-2" size={14} />
          )}
          <span className={item.met ? "text-green-600" : "text-[#8A8577]"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}

const PasswordStrengthMeter = ({ password }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^A-Za-z0-9]/)) strength++;
    return strength;
  };
  const strength = getStrength(password);

  const getColor = (s) => {
    if (s === 0) return "bg-red-500";
    if (s === 1) return "bg-red-400";
    if (s === 2) return "bg-yellow-500";
    if (s === 3) return "bg-yellow-400";
    return "bg-green-500";
  }
  const getStrengthText = (s) => {
    if (s === 0) return "Very Weak";
    if (s === 1) return "Weak";
    if (s === 2) return "Fair";
    if (s === 3) return "Good";
    return "Strong";
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="font-['Inter'] text-xs text-[#8A8577]">Password Strength</span>
        <span className="font-['Inter'] text-xs text-[#8A8577]">{getStrengthText(strength)}</span>
      </div>
      <div className="flex space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${index < strength ? getColor(strength) : "bg-[#1C1B1A]/10"}`}
          />
        ))}
      </div>
      <PasswordCriteria password={password} />
    </div>
  )
}

export default PasswordStrengthMeter