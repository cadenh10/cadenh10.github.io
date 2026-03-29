/**
 * UTM + referrer for waitlist rows (browser only).
 * When UTM/referrer are absent, analytics-friendly defaults are used.
 */
const FALLBACK_UTM_SOURCE = "direct";
const FALLBACK_UTM_MEDIUM = "none";
const FALLBACK_UTM_CAMPAIGN = "none";
const FALLBACK_REFERRER = "direct";

export function getWaitlistAttribution() {
  if (typeof window === "undefined") {
    return {
      source: "website",
      utm_source: FALLBACK_UTM_SOURCE,
      utm_medium: FALLBACK_UTM_MEDIUM,
      utm_campaign: FALLBACK_UTM_CAMPAIGN,
      referrer: FALLBACK_REFERRER,
    };
  }

  const params = new URLSearchParams(window.location.search);
  const utm_source = params.get("utm_source")?.trim() || null;
  const utm_medium = params.get("utm_medium")?.trim() || null;
  const utm_campaign = params.get("utm_campaign")?.trim() || null;
  const referrer = document.referrer || null;

  return {
    source: "website",
    utm_source: utm_source ?? FALLBACK_UTM_SOURCE,
    utm_medium: utm_medium ?? FALLBACK_UTM_MEDIUM,
    utm_campaign: utm_campaign ?? FALLBACK_UTM_CAMPAIGN,
    referrer: referrer ?? FALLBACK_REFERRER,
  };
}
