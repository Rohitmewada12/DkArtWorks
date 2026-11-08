// ============================================================
// DK ARTS — BOOKING SUBMISSION & MESSAGE FORMATTING UTILITIES
// Formats customer booking data for WhatsApp, Email and Instagram DM
// ============================================================
import site from "../data/site.js";

/**
 * Formats the entire booking dataset into a human-readable, professional summary.
 */
export function formatBookingSummary(formData, prefillContext = {}) {
  const lines = [];

  lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  lines.push("🎨 DK ARTS — ARTWORK BOOKING REQUEST");
  lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  lines.push("");

  if (prefillContext?.sourceTitle || prefillContext?.artworkTitle) {
    lines.push(`📌 REFERENCE: ${prefillContext.sourceTitle || prefillContext.artworkTitle}`);
    if (prefillContext?.sourceType) {
      lines.push(`   Source: ${prefillContext.sourceType}`);
    }
    lines.push("");
  }

  // 1. Customer Information
  lines.push("👤 CLIENT DETAILS:");
  lines.push(`• Name: ${formData.fullName || "Not provided"}`);
  lines.push(`• WhatsApp: ${formData.phone || "Not provided"}`);
  lines.push(`• Email: ${formData.email || "Not provided"}`);
  if (formData.city || formData.state || formData.country) {
    const loc = [formData.city, formData.state, formData.country].filter(Boolean).join(", ");
    lines.push(`• Location: ${loc}`);
  }
  lines.push("");

  // 2. Artwork Requirements
  lines.push("🖌️ ARTWORK SPECIFICATIONS:");
  lines.push(`• Type: ${formData.artworkType || "Portrait"}`);
  lines.push(`• Subject / Details: ${formData.subject || "Not specified"}`);
  if (formData.subjectCount) {
    lines.push(`• Number of People / Pets: ${formData.subjectCount}`);
  }
  lines.push(`• Preferred Medium: ${formData.medium || "Artist's Recommendation"}`);
  lines.push(`• Artwork Size: ${formData.size || "A4"}`);
  lines.push(`• Quantity: ${formData.quantity || "1"}`);
  lines.push("");

  // 3. Budget & Timeline
  lines.push("💰 BUDGET & TIMELINE:");
  lines.push(`• Budget Range: ${formData.budget || "Need Artist Recommendation"}`);
  lines.push(`• Occasion: ${formData.occasion || "Personal Gift"}`);
  if (formData.isDateFlexible) {
    lines.push("• Completion Date: Flexible / No strict deadline");
  } else if (formData.completionDate) {
    lines.push(`• Needed By: ${formData.completionDate}`);
  }
  lines.push("");

  // 4. Finishing & Delivery
  lines.push("📦 FINISHING & DELIVERY:");
  lines.push(`• Framing: ${formData.framing || "Artwork Only"}`);
  if (formData.giftWrapping) {
    lines.push(`• Gift Wrapping: Yes (${formData.giftPackage || "Premium Wrap"})`);
    if (formData.giftRecipient) {
      lines.push(`• Gift Recipient: ${formData.giftRecipient}`);
    }
    if (formData.giftMessage) {
      lines.push(`• Handwritten Message: "${formData.giftMessage}"`);
    }
  } else {
    lines.push("• Gift Wrapping: No");
  }
  lines.push(`• Delivery Preference: ${formData.deliveryMethod || "Courier Delivery"}`);
  if (formData.deliveryMethod === "Courier Delivery" && (formData.deliveryAddress || formData.pinCode)) {
    const addr = [formData.deliveryAddress, formData.deliveryCity, formData.deliveryState, formData.pinCode]
      .filter(Boolean)
      .join(", ");
    lines.push(`• Address: ${addr}`);
  }
  lines.push("");

  // 5. Special Notes & Reference Photos
  if (formData.additionalNotes) {
    lines.push("📝 SPECIAL INSTRUCTIONS / NOTES:");
    lines.push(formData.additionalNotes);
    lines.push("");
  }

  if (formData.referenceFiles && formData.referenceFiles.length > 0) {
    lines.push(`📷 REFERENCE PHOTOS: ${formData.referenceFiles.length} photo(s) selected locally.`);
    lines.push("   (I will attach/send the photo directly in this chat/email)");
    lines.push("");
  }

  lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  lines.push("Enquiry sent via DK Arts Portfolio Website");
  lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  return lines.join("\n");
}

/**
 * Returns phone number in E.164 international format for WhatsApp (digits only).
 * If a 10-digit Indian phone number is passed, automatically prepends the "91" country code.
 */
export function getSanitizedWhatsAppNumber(rawNumber = site.whatsappNumber) {
  let clean = (rawNumber || "").toString().replace(/\D/g, "");
  if (!clean) return "";
  // 10-digit Indian mobile number missing country code -> prepend 91
  if (clean.length === 10) {
    clean = `91${clean}`;
  } else if (clean.length === 11 && clean.startsWith("0")) {
    // 0 followed by 10 digits
    clean = `91${clean.slice(1)}`;
  }
  return clean;
}

/**
 * Direct Message link to start a conversation directly with Deepak Mewada on Instagram.
 * Uses Meta's universal ig.me deep link that launches the Instagram app DM directly on mobile.
 */
export function getInstagramDmUrl() {
  const handle = site.instagramHandle ? site.instagramHandle.replace(/^@/, "") : "dkarts_718";
  return site.instagramDmUrl || `https://ig.me/m/${handle}`;
}

/**
 * Universal deep link opener optimized for both mobile and desktop.
 * - On Mobile (iOS Safari & Android Chrome): Uses direct navigation (window.location.href)
 *   so universal links (wa.me, ig.me) trigger native mobile apps (WhatsApp, Instagram)
 *   without being blocked by mobile popup blockers or opening dead blank tabs.
 * - On Desktop: Uses window.open with a new tab to keep the portfolio active.
 */
export function openDeepLink(url) {
  if (typeof window === "undefined" || !url) return;

  const isMobile = typeof navigator !== "undefined" &&
    /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || "");

  if (isMobile) {
    // Direct location assignment cleanly triggers the OS universal link prompt / app intent
    window.location.href = url;
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

/**
 * Reliable clipboard copy function with iOS Safari selection range fallback.
 * Synchronous and instant so the mobile touch gesture context is never lost.
 */
export function copyTextToClipboard(text) {
  if (!text || typeof document === "undefined") return false;
  let copied = false;

  // Modern Async API (fire immediately)
  if (navigator?.clipboard?.writeText && window.isSecureContext) {
    navigator.clipboard.writeText(text).catch(() => {});
    copied = true;
  }

  // Synchronous DOM selection fallback (essential for iOS Safari, WebViews & older Android)
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "-9999px";
    textArea.style.fontSize = "16px"; // Prevents iOS Safari from zooming the viewport
    textArea.setAttribute("readonly", "");
    document.body.appendChild(textArea);

    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
      const range = document.createRange();
      range.selectNodeContents(textArea);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }

    const execResult = document.execCommand("copy");
    if (execResult) copied = true;
    document.body.removeChild(textArea);
  } catch (err) {
    console.warn("DOM copy fallback error:", err);
  }

  return copied;
}

/**
 * Option 1: WhatsApp Submission
 * Opens WhatsApp with full pre-filled booking message directly to Deepak Mewada.
 * Works seamlessly on mobile (native app) and desktop (WhatsApp Web).
 */
export function sendViaWhatsApp(formData, prefillContext = {}) {
  const message = formatBookingSummary(formData, prefillContext);
  const number = getSanitizedWhatsAppNumber(site.whatsappNumber);
  const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  openDeepLink(whatsappUrl);
  return { number, message, whatsappUrl };
}

/**
 * Option 2: Email Submission
 */
export function sendViaEmail(formData, prefillContext = {}) {
  const subject = `DK Arts Artwork Booking — ${formData.fullName || "Client"} (${formData.artworkType || "Commission"})`;
  const body = formatBookingSummary(formData, prefillContext);
  const mailtoUrl = `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
  return { subject, body, mailtoUrl };
}

/**
 * Option 3: Instagram DM Submission
 * Automatically copies formatted booking summary to clipboard, and opens Instagram DM directly.
 * Works seamlessly on mobile (native Instagram app) and desktop.
 */
export function sendViaInstagram(formData, prefillContext = {}) {
  const message = formatBookingSummary(formData, prefillContext);
  const copied = copyTextToClipboard(message);
  const dmUrl = getInstagramDmUrl();

  // Open direct message conversation in Instagram (ig.me/m/dkarts_718)
  openDeepLink(dmUrl);

  return { copied, message, dmUrl };
}
