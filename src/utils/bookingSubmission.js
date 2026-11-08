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
 * Option 1: WhatsApp Submission
 */
export function sendViaWhatsApp(formData, prefillContext = {}) {
  const message = formatBookingSummary(formData, prefillContext);
  const number = site.whatsappNumber.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}

/**
 * Option 2: Email Submission
 */
export function sendViaEmail(formData, prefillContext = {}) {
  const subject = `DK Arts Artwork Booking — ${formData.fullName || "Client"} (${formData.artworkType || "Commission"})`;
  const body = formatBookingSummary(formData, prefillContext);
  const mailtoUrl = `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
}

/**
 * Option 3: Instagram DM Submission
 * Copies formatted booking summary to clipboard, and opens Instagram profile
 */
export async function sendViaInstagram(formData, prefillContext = {}) {
  const message = formatBookingSummary(formData, prefillContext);

  let copied = false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(message);
      copied = true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = message;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      copied = document.execCommand("copy");
      textArea.remove();
    }
  } catch (err) {
    console.warn("Could not copy to clipboard:", err);
    copied = false;
  }

  // Open Instagram profile in new tab
  window.open(site.instagramUrl, "_blank", "noopener,noreferrer");

  return { copied, message };
}
