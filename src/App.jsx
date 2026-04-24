import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import AnalyticsPage from "./components/AnalyticsPage.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import BillingSuccess from "./pages/BillingSuccess.jsx";
import BillingCancel from "./pages/BillingCancel.jsx";
import Settings from "./pages/Settings.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import { saveReferralCode } from "./lib/referral.js";

function ReferralLandingPage() {
  const { code } = useParams();

  useEffect(() => {
    if (code) saveReferralCode(code);
  }, [code]);

  return <LandingPage />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/r/:code" element={<ReferralLandingPage />} />
        <Route path="/admin" element={<AnalyticsPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/billing/success" element={<BillingSuccess />} />
        <Route path="/billing/cancel" element={<BillingCancel />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}
