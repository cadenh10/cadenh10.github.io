const EXTRA_OFFSET = 14;

export function scrollToSectionWithHeaderOffset(sectionId, options = {}) {
  if (typeof window === "undefined") return;

  const target = document.getElementById(sectionId);
  if (!target) return;

  const header = document.querySelector("header");
  const headerHeight = header?.getBoundingClientRect().height ?? 0;
  const additionalOffset = options.additionalOffset ?? EXTRA_OFFSET;
  const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - additionalOffset;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: "smooth",
  });
}

export function scrollToDownload() {
  if (typeof window === "undefined") return;

  const target = document.getElementById("download-scroll-target");
  if (!target) return;

  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}
