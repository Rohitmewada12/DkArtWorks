// ============================================================
// SITE CONFIG — EDIT ME FIRST
// This is the one file you need to touch to personalize the site:
// real name, bio, socials, contact email and commission info.
// ============================================================

const site = {
  brandName: "DK Arts",
  fullName: "DEEPAK MEWADA", // replace with your brother's real name
  tagline: "Sketches, paintings & commissioned art, made by hand.",

  instagramHandle: "dkarts_718",
  instagramUrl: "https://instagram.com/dkarts_718",

  // Replace with the real channel URL, e.g. https://youtube.com/@handle
  youtubeUrl: "https://youtube.com/@dkarts718?si=VytPQQ25EaZEXf_K",

  // Replace with a real contact email or leave the Instagram DM as the
  // primary channel and delete the email button in Contact.jsx.
  contactEmail: "dkartist28@gmail.com",

  // WhatsApp number in international format, digits only (no +, spaces or
  // dashes) — e.g. a number like +91 98765 43210 becomes "919876543210".
  // Leave as "" to hide the WhatsApp button everywhere.
  whatsappNumber: "8770414426",
  // Pre-filled message people will see when they tap the WhatsApp button.
  whatsappMessage: "Hi! I'd like to ask about a commission.",

  location: "India",

  // Shown in the stats strip under the hero. Edit the numbers to match
  // reality — keep them honest, they're a trust signal.
  stats: [
    { value: "150+", labelKey: "stats.commissions" },
    { value: "4.9★", labelKey: "stats.rating" },
    { value: "3", labelKey: "stats.years" },
    { value: "24h", labelKey: "stats.replyTime" },
  ],

  bio: [
    "I draw and paint people, pets, and moments worth keeping — mostly graphite, charcoal, ink and watercolour, worked from photos or from life.",
    "Every commission starts as a rough sketch you approve before I take it to a finished piece, so there are no surprises at the end.",
  ],

  commissionTypes: [
    {
      title: "Graphite Portrait",
      medium: "Pencil on paper",
      turnaround: "5–7 days",
    },
    {
      title: "Custom Painting",
      medium: "Watercolour or acrylic",
      turnaround: "1–2 weeks",
    },
    {
      title: "Pet Portrait",
      medium: "Coloured pencil or ink",
      turnaround: "5–7 days",
    },
  ],

  process: [
    {
      title: "Reach out",
      body: "Message on Instagram or send a note through the contact form with your idea and a reference photo if you have one.",
    },
    {
      title: "Concept & quote",
      body: "You'll get a price and timeline based on size, medium and complexity before anything is booked.",
    },
    {
      title: "Sketch approval",
      body: "A rough sketch is shared first. Nothing moves to final work until you're happy with the composition.",
    },
    {
      title: "Final reveal",
      body: "The finished piece is photographed and sent over — original available to ship on request.",
    },
  ],
};

export default site;