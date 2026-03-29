import FeaturesSection from "./FeaturesSection.jsx";
import FocusSignalSection from "./FocusSignalSection.jsx";
import FinalSection from "./FinalSection.jsx";
import HeroSection from "./HeroSection.jsx";
import TopNav from "./TopNav.jsx";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <TopNav />
      <HeroSection />
      <FeaturesSection />
      <FocusSignalSection />
      <FinalSection />
    </div>
  );
}
