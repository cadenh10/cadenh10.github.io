import FeaturesSection from "./FeaturesSection.jsx";
import FinalSection from "./FinalSection.jsx";
import HeroSection from "./HeroSection.jsx";
import HowItWorksSection from "./HowItWorksSection.jsx";
import PrivacySection from "./PrivacySection.jsx";
import TopNav from "./TopNav.jsx";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-black text-white antialiased">
      <TopNav />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <PrivacySection />
        <FinalSection />
      </main>
    </div>
  );
}
