// ============================================================
// DK ARTS — GIFT WRAPPING & PRESENTATION PACKAGES CONFIG
// Configurable packages, prices, and occasion options.
// ============================================================

export const GIFT_PACKAGES = [
  {
    id: "basic",
    name: "Basic Wrap",
    price: 149,
    priceDisplay: "+ ₹149",
    image: "/gallery/gift-pack-basic.jpg",
    isRecommended: false,
    features: [
      "Kraft paper wrapping",
      "Natural jute string",
      "DK Arts gift tag",
    ],
  },
  {
    id: "premium",
    name: "Premium Wrap",
    price: 299,
    priceDisplay: "+ ₹299",
    image: "/gallery/gift-pack-premium.jpg",
    isRecommended: true,
    badgeText: "Recommended",
    features: [
      "Premium gift box",
      "Elegant satin ribbon",
      "Personalized gift tag",
      "Protective artwork packaging",
    ],
  },
  {
    id: "signature",
    name: "Signature Gift",
    price: 499,
    priceDisplay: "+ ₹499",
    image: "/gallery/gift-pack-signature.jpg",
    isRecommended: false,
    features: [
      "Premium presentation box",
      "Artist-signed artwork",
      "Personalized handwritten message card",
      "DK Arts authenticity card",
      "Gift-ready premium packaging",
    ],
  },
];

export const OCCASIONS = [
  "Birthday",
  "Anniversary",
  "Wedding",
  "Engagement",
  "Valentine's Day",
  "Festival",
  "Graduation",
  "Other",
];
