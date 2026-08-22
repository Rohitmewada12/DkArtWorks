// ============================================================
// PRICING — EDIT ME
// ------------------------------------------------------------
// These are STARTER prices — reasonable defaults for a portrait
// artist working in these mediums, so the section looks complete
// from day one. They are NOT based on your actual rates. Go
// through and change every number to what you actually want to
// charge before this goes live for real.
//
// A simple way to price: figure out roughly how many hours each
// size takes you, multiply by what your time is worth, then round
// to a clean number. Cheaper/faster pieces (small pencil sketches)
// bring people in the door; bigger colour pieces are where the
// real margin is.
// ============================================================

const pricingTiers = [
  {
    title: "Pencil & Charcoal",
    description: "Graphite or charcoal, worked from a clear reference photo.",
    sizes: [
      { label: "A5 — face / bust", price: "₹799" },
      { label: "A4 — half body", price: "₹1,499" },
      { label: "A3 — full detail", price: "₹2,499" },
    ],
  },
  {
    title: "Colour Painting",
    description: "Watercolour, acrylic, or coloured pencil & marker.",
    sizes: [
      { label: "A5", price: "₹1,299" },
      { label: "A4", price: "₹2,499" },
      { label: "A3", price: "₹3,999" },
    ],
    featured: true,
  },
  {
    title: "Pet Portrait",
    description: "Graphite or colour — same sizes and process as above.",
    sizes: [
      { label: "A5", price: "₹899" },
      { label: "A4", price: "₹1,699" },
    ],
  },
];

const addOns = [
  { label: "Extra person or pet in one frame", price: "+ ₹500" },
  { label: "Rush delivery (48–72 hrs)", price: "+ 25%" },
  { label: "Ready-to-hang framing", price: "+ ₹799" },
  { label: "High-resolution digital file", price: "+ ₹199" },
];

// Other things worth offering alongside custom commissions — edit,
// remove, or add to this list as your practice grows.
const alsoAvailable = [
  {
    title: "Original artworks",
    body: "Select finished pieces from the gallery are available to purchase as-is — ask about a specific piece.",
  },
  {
    title: "Prints",
    body: "High-quality prints of select paintings, unframed or framed, for anyone who wants the piece but not the original.",
  },
  {
    title: "Gift vouchers",
    body: "A voucher toward a future commission — a nice gift for someone whose portrait you can't take without them noticing.",
  },
];

export { pricingTiers, addOns, alsoAvailable };
