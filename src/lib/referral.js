const REFERRAL_STORAGE_KEY = "dialed_referral_code";
const REFERRAL_SEEN_AT_KEY = "dialed_referral_seen_at";
const REFERRAL_CODE_PATTERN = /^[A-Za-z0-9_-]+$/;

export function isValidReferralCode(code) {
  if (typeof code !== "string") return false;
  const normalized = code.trim();
  if (!normalized) return false;
  return REFERRAL_CODE_PATTERN.test(normalized);
}

export function saveReferralCode(code) {
  if (typeof window === "undefined" || !isValidReferralCode(code)) return false;

  const normalized = code.trim();
  window.localStorage.setItem(REFERRAL_STORAGE_KEY, normalized);
  window.localStorage.setItem(REFERRAL_SEEN_AT_KEY, new Date().toISOString());
  return true;
}

export function getStoredReferralCode() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(REFERRAL_STORAGE_KEY);
}

export function getReferralStorageKeys() {
  return {
    code: REFERRAL_STORAGE_KEY,
    seenAt: REFERRAL_SEEN_AT_KEY,
  };
}
