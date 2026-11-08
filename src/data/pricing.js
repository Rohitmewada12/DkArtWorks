// ============================================================
// PRICING CATALOGUE DATA (DK ARTS — PREMIUM PRICING CATALOGUE)
// Plate 04 — PRICE LIST
// ============================================================

const pricingTiers = [
  {
    id: "pencil-charcoal",
    title: "Pencil & Charcoal",
    description: "Graphite or charcoal, worked from a clear reference photo.",
    image: "/gallery/commission-graphite-portrait-enhanced.jpg",
    hasCornerAccent: true,
    sizes: [
      { label: "A5 — face / bust", price: "₹799" },
      { label: "A4 — half body", price: "₹1,499" },
      { label: "A3 — full detail", price: "₹2,499" },
    ],
  },
  {
    id: "colour-painting",
    title: "Colour Painting",
    description: "Watercolour, acrylic, or coloured pencil & marker.",
    image: "/gallery/painting-radha-krishna-1.jpg",
    featured: true,
    badge: "MOST REQUESTED",
    hasCornerAccent: false,
    sizes: [
      { label: "A5", price: "₹1,299" },
      { label: "A4", price: "₹2,499" },
      { label: "A3", price: "₹3,999" },
    ],
  },
  {
    id: "pet-portrait",
    title: "Pet Portrait",
    description: "Graphite or colour — same sizes and process as above.",
    image: "/gallery/commission-pet-portrait.jpg",
    hasCornerAccent: false,
    sizes: [
      { label: "A5", price: "₹899" },
      { label: "A4", price: "₹1,699" },
    ],
  },
];

const addOns = [
  {
    icon: "users",
    label: "Extra person or pet in one frame",
    price: "+ ₹500",
  },
  {
    icon: "zap",
    label: "Rush delivery (48–72 hrs)",
    price: "+ 25%",
  },
  {
    icon: "image",
    label: "Ready-to-hang framing",
    price: "+ ₹799",
  },
  {
    icon: "download",
    label: "High-resolution digital file",
    price: "+ ₹199",
  },
];

const alsoAvailable = [
  {
    icon: "palette",
    title: "Original Artworks",
    body: "Select finished pieces from the gallery for purchase as-is — ask about a specific piece.",
  },
  {
    icon: "layers",
    title: "Prints",
    body: "High-quality prints of selected paintings, unframed or framed.",
  },
  {
    icon: "gift",
    title: "Gift Vouchers",
    body: "A voucher toward a future commission — a nice gift for someone who loves art.",
  },
];

export { pricingTiers, addOns, alsoAvailable };
