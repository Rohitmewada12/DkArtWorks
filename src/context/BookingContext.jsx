// ============================================================
// DK ARTS — GLOBAL BOOKING CONTEXT
// Allows any component across the website to trigger the booking modal
// with pre-filled context (artwork, medium, size, gift package, etc.)
// ============================================================
import { createContext, useContext, useState, useCallback } from "react";

const BookingContext = createContext(null);

const DEFAULT_FORM_DATA = {
  // Step 1: Customer Information
  fullName: "",
  phone: "",
  email: "",
  city: "",
  state: "",
  country: "India",

  // Step 2: Artwork Requirements
  artworkType: "Portrait",
  subject: "",
  subjectCount: "1 Person",
  medium: "Graphite / Pencil",
  size: "A4",
  quantity: "1",

  // Step 3: Budget and Occasion
  budget: "₹1,000 – ₹2,500",
  occasion: "Personal Gift",
  completionDate: "",
  isDateFlexible: true,

  // Step 4: Finishing and Gift Preferences
  framing: "Artwork Only",
  giftWrapping: false,
  giftPackage: "Premium Wrap",
  giftRecipient: "",
  giftMessage: "",
  deliveryMethod: "Courier Delivery",
  deliveryAddress: "",
  deliveryCity: "",
  deliveryState: "",
  pinCode: "",

  // Step 5: Reference Photos and Notes
  additionalNotes: "",
  referenceFiles: [], // array of { name, size, previewUrl }
};

export function BookingProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [prefillContext, setPrefillContext] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  /**
   * Open the centralized booking modal with optional prefill parameters.
   * Can be invoked from Gallery, Lightbox, Hero, Pricing, Reels, Nav, etc.
   */
  const openBooking = useCallback((prefill = {}) => {
    setFormData((prev) => {
      const updated = { ...prev };

      if (prefill.artworkType) updated.artworkType = prefill.artworkType;
      if (prefill.subject) updated.subject = prefill.subject;
      if (prefill.medium) updated.medium = prefill.medium;
      if (prefill.size) updated.size = prefill.size;
      if (prefill.quantity) updated.quantity = prefill.quantity;
      if (prefill.budget) updated.budget = prefill.budget;
      if (prefill.occasion) updated.occasion = prefill.occasion;

      // Gift wrapping prefill
      if (prefill.giftWrapping !== undefined) {
        updated.giftWrapping = Boolean(prefill.giftWrapping);
      }
      if (prefill.giftPackage) updated.giftPackage = prefill.giftPackage;
      if (prefill.giftRecipient) updated.giftRecipient = prefill.giftRecipient;
      if (prefill.giftMessage) updated.giftMessage = prefill.giftMessage;

      // Finishing & framing
      if (prefill.framing) updated.framing = prefill.framing;

      return updated;
    });

    setPrefillContext({
      sourceTitle: prefill.sourceTitle || prefill.title || null,
      sourceType: prefill.sourceType || prefill.category || null,
      artworkImage: prefill.artworkImage || prefill.image || null,
      originalPrice: prefill.price || null,
      source: prefill.source || "Website Button",
    });

    setStep(prefill.startStep || 1);
    setIsDirty(false);
    setIsOpen(true);
  }, []);

  /**
   * Closes the booking modal.
   */
  const closeBooking = useCallback(() => {
    setIsOpen(false);
  }, []);

  /**
   * Resets form to clean defaults.
   */
  const resetBooking = useCallback(() => {
    setFormData(DEFAULT_FORM_DATA);
    setPrefillContext(null);
    setStep(1);
    setIsDirty(false);
  }, []);

  /**
   * Updates an individual form field.
   */
  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  }, []);

  /**
   * Batch updates multiple form fields.
   */
  const updateFields = useCallback((fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
    setIsDirty(true);
  }, []);

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        step,
        setStep,
        formData,
        prefillContext,
        isDirty,
        openBooking,
        closeBooking,
        resetBooking,
        updateField,
        updateFields,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}

export default BookingContext;
