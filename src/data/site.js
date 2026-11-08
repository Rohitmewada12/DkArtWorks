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
  instagramDmUrl: "https://ig.me/m/dkarts_718",

  // Replace with the real channel URL, e.g. https://youtube.com/@handle
  youtubeUrl: "https://youtube.com/@dkarts718?si=VytPQQ25EaZEXf_K",

  // Replace with a real contact email or leave the Instagram DM as the
  // primary channel and delete the email button in Contact.jsx.
  contactEmail: "dkartist28@gmail.com",

  // WhatsApp number in international format, digits only (no +, spaces or
  // dashes) — e.g. a number like +91 98765 43210 becomes "919876543210".
  // Leave as "" to hide the WhatsApp button everywhere.
  whatsappNumber: "918770414426",
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
      medium: "PENCIL ON PAPER",
      turnaround: "5 – 7 DAYS",
      image: "/gallery/commission-graphite-portrait-enhanced.jpg",
      hasCornerAccent: true,
    },
    {
      title: "Custom Painting",
      medium: "WATERCOLOUR OR ACRYLIC",
      turnaround: "1 – 2 WEEKS",
      image: "/gallery/painting-radha-krishna-1.jpg",
      hasCornerAccent: false,
    },
    {
      title: "Pet Portrait",
      medium: "COLOURED PENCIL OR INK",
      turnaround: "5 – 7 DAYS",
      image: "/gallery/commission-pet-portrait.jpg",
      hasCornerAccent: true,
    },
  ],

  process: [
    {
      num: "01",
      title: "Share Your Idea",
      body: "Send a reference photo, your preferred artwork type and any specific requirements.",
      illustration: "/gallery/commission-step-1-polaroid.png",
      alt: "Reference photo with tape and upload icon",
    },
    {
      num: "02",
      title: "Concept & Quote",
      body: "Discuss the artwork, receive a price and confirm the estimated timeline.",
      illustration: "/gallery/commission-step-2-clipboard.png",
      alt: "Pencil clipboard with checklist",
    },
    {
      num: "03",
      title: "Sketch Approval",
      body: "Review the initial sketch and request any agreed adjustments before the final work.",
      illustration: "/gallery/commission-step-3-sketch.png",
      alt: "Hand-drawn portrait sketch on paper",
    },
    {
      num: "04",
      title: "Final Artwork",
      body: "The completed artwork is photographed and shared, then prepared for delivery or collection.",
      illustration: "/gallery/commission-step-4-gift.png",
      alt: "Hand-drawn gift box with sparkles",
    },
  ],
};

export default site;