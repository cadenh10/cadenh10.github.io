/**
 * UTM + referrer for waitlist rows (browser only).
 */
export function getWaitlistAttribution() {
  if (typeof window === "undefined") {
    return {
      source: "website",
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      referrer: null,
    };
  }

  const params = new URLSearchParams(window.location.search);
  return {
    source: "website",
    utm_source: params.get("utm_source")?.trim() || null,
    utm_medium: params.get("utm_medium")?.trim() || null,
    utm_campaign: params.get("utm_campaign")?.trim() || null,
    referrer: document.referrer || null,
  };
}
