import { useEffect, useState } from "react";
import FeaturesSection from "./FeaturesSection.jsx";
import FocusSignalSection from "./FocusSignalSection.jsx";
import FinalSection from "./FinalSection.jsx";
import HeroSection from "./HeroSection.jsx";
import TopNav from "./TopNav.jsx";
import { getStoredReferralCode } from "../lib/referral.js";

export default function LandingPage() {
  const [hasReferralCode, setHasReferralCode] = useState(false);

  useEffect(() => {
    setHasReferralCode(Boolean(getStoredReferralCode()));
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <TopNav />
      <HeroSection hasReferralCode={hasReferralCode} />
      <FeaturesSection />
      <FocusSignalSection />
      <FinalSection hasReferralCode={hasReferralCode} />
    </div>
  );
}
