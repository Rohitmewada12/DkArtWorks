// ============================================================
// DK ARTS — ARTWORK BOOKING FORM COMPONENT
// Complete 5-step interactive commission workflow with validation,
// reference photo previews, and multi-channel submission
// ============================================================
import { useState, useRef, useId } from "react";
import {
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  Gift,
  HelpCircle,
  Image as ImageIcon,
  Info,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  Sparkles,
  Trash2,
  Upload,
  User,
} from "lucide-react";
import { useBooking } from "../../context/BookingContext.jsx";
import {
  sendViaWhatsApp,
  sendViaEmail,
  sendViaInstagram,
  getInstagramDmUrl,
  copyTextToClipboard,
  formatBookingSummary,
} from "../../utils/bookingSubmission.js";
import { GIFT_PACKAGES, OCCASIONS } from "../../data/giftPackages.js";

const ARTWORK_TYPES = [
  "Portrait",
  "Couple Portrait",
  "Family Portrait",
  "Pet Portrait",
  "Child Portrait",
  "Anime / Cartoon Art",
  "Religious / Devotional Art",
  "Custom Painting",
  "Landscape",
  "Other",
];

const MEDIUMS = [
  "Graphite / Pencil",
  "Charcoal",
  "Colour Pencil",
  "Watercolour",
  "Acrylic",
  "Ink",
  "Mixed Media",
  "Artist's Recommendation",
];

const SIZES = [
  { id: "A5", name: "A5 (14.8 × 21 cm)", desc: "Ideal for single face portrait or small desk display" },
  { id: "A4", name: "A4 (21 × 29.7 cm)", desc: "Most popular — great balance of detail and framing" },
  { id: "A3", name: "A3 (29.7 × 42 cm)", desc: "Statement size — excellent for couples, pets and paintings" },
  { id: "A2", name: "A2 (42 × 59.4 cm)", desc: "Grand gallery scale for detailed master portraits" },
  { id: "Custom Size", name: "Custom Size", desc: "Specify your dimensions in the additional notes" },
];

const BUDGET_OPTIONS = [
  "Below ₹1,000",
  "₹1,000 – ₹2,500",
  "₹2,500 – ₹5,000",
  "₹5,000+",
  "Need Artist Recommendation",
];

const FRAMING_OPTIONS = [
  { id: "Artwork Only", title: "Artwork Only", desc: "Sent securely rolled in protective PVC/hard tube" },
  { id: "With Frame", title: "With Frame", desc: "Ready-to-hang framed piece with glass / acrylic front" },
  { id: "Need Recommendation", title: "Need Recommendation", desc: "Artist will advise best framing style for your piece" },
];

const DELIVERY_OPTIONS = [
  "Courier Delivery",
  "Self Pickup",
  "Discuss Later",
];

export default function ArtworkBookingForm() {
  const {
    step,
    setStep,
    formData,
    updateField,
    prefillContext,
    resetBooking,
    closeBooking,
  } = useBooking();

  const [errors, setErrors] = useState({});
  const [copiedNotice, setCopiedNotice] = useState(false);
  const [submittingChannel, setSubmittingChannel] = useState(null);
  const [instagramActive, setInstagramActive] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const fileInputRef = useRef(null);

  // Field IDs for accessibility
  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const subjectId = useId();
  const notesId = useId();

  // Validate step before proceeding
  function validateStep(stepNumber) {
    const errs = {};

    if (stepNumber === 1) {
      if (!formData.fullName.trim()) {
        errs.fullName = "Please enter your full name.";
      }
      const cleanPhone = formData.phone.replace(/\D/g, "");
      if (!cleanPhone || cleanPhone.length < 10) {
        errs.phone = "Please enter a valid 10-digit mobile / WhatsApp number.";
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim() || !emailRegex.test(formData.email)) {
        errs.email = "Please enter a valid email address.";
      }
    }

    if (stepNumber === 2) {
      if (!formData.subject.trim()) {
        errs.subject = "Please specify who or what should be drawn (e.g. 'My parents' or 'Pet cat').";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleNext() {
    if (validateStep(step)) {
      setErrors({});
      setStep(Math.min(5, step + 1));
      // Scroll modal body to top
      const bodyEl = document.querySelector(".bk-modal-scrollable");
      if (bodyEl) bodyEl.scrollTop = 0;
    }
  }

  function handleBack() {
    setErrors({});
    setStep(Math.max(1, step - 1));
    const bodyEl = document.querySelector(".bk-modal-scrollable");
    if (bodyEl) bodyEl.scrollTop = 0;
  }

  // Handle local photo attachment & preview
  function handleFileChange(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newAttachments = files.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: (file.size / 1024).toFixed(0) + " KB",
      previewUrl: URL.createObjectURL(file),
      file,
    }));

    updateField("referenceFiles", [...(formData.referenceFiles || []), ...newAttachments]);
  }

  function removeAttachment(idToRemove) {
    const updated = (formData.referenceFiles || []).filter((f) => f.id !== idToRemove);
    updateField("referenceFiles", updated);
  }

  // Submission Handlers
  async function handleWhatsAppSubmit() {
    if (!validateStep(1) || !validateStep(2)) {
      setStep(1);
      return;
    }
    setSubmittingChannel("whatsapp");
    try {
      sendViaWhatsApp(formData, prefillContext);
    } finally {
      setTimeout(() => setSubmittingChannel(null), 1000);
    }
  }

  async function handleEmailSubmit() {
    if (!validateStep(1) || !validateStep(2)) {
      setStep(1);
      return;
    }
    setSubmittingChannel("email");
    try {
      sendViaEmail(formData, prefillContext);
    } finally {
      setTimeout(() => setSubmittingChannel(null), 1000);
    }
  }

  function handleInstagramSubmit() {
    if (!validateStep(1) || !validateStep(2)) {
      setStep(1);
      return;
    }
    setSubmittingChannel("instagram");
    try {
      sendViaInstagram(formData, prefillContext);
      setInstagramActive(true);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 3500);
    } finally {
      setTimeout(() => setSubmittingChannel(null), 800);
    }
  }

  function handleManualCopy() {
    const text = formatBookingSummary(formData, prefillContext);
    const success = copyTextToClipboard(text);
    if (success) {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 3500);
    }
  }

  return (
    <div className="bk-form-container">
      {/* Prefill Origin Banner (if started from specific artwork/pricing card) */}
      {(prefillContext?.sourceTitle || prefillContext?.artworkTitle) && (
        <div className="bk-prefill-badge" role="status">
          <Sparkles size={14} className="bk-sparkle-icon" />
          <span>
            Booking for: <strong>{prefillContext.sourceTitle || prefillContext.artworkTitle}</strong>
            {prefillContext.sourceType ? ` (${prefillContext.sourceType})` : ""}
          </span>
        </div>
      )}

      {/* ============================================================
          STEP 1: CUSTOMER INFORMATION
          ============================================================ */}
      {step === 1 && (
        <div className="bk-step-section bk-fade-in" role="tabpanel" aria-label="Step 1: Contact Information">
          <div className="bk-step-heading-group">
            <h3 className="bk-step-title">Your Contact Details</h3>
            <p className="bk-step-desc">
              Please enter your details so Deepak can reach out to review references and confirm your booking.
            </p>
          </div>

          <div className="bk-fields-grid">
            {/* Full Name */}
            <div className="bk-field-group">
              <label htmlFor={nameId} className="bk-field-label">
                <span>Full Name</span>
                <span className="bk-req">*</span>
              </label>
              <div className="bk-input-wrap">
                <User size={16} className="bk-field-icon" />
                <input
                  id={nameId}
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className={`bk-input with-icon ${errors.fullName ? "has-error" : ""}`}
                  autoFocus
                />
              </div>
              {errors.fullName && <span className="bk-error-text">{errors.fullName}</span>}
            </div>

            {/* Mobile / WhatsApp Number */}
            <div className="bk-field-group">
              <label htmlFor={phoneId} className="bk-field-label">
                <span>WhatsApp / Mobile Number</span>
                <span className="bk-req">*</span>
              </label>
              <div className="bk-input-wrap">
                <Phone size={16} className="bk-field-icon" />
                <input
                  id={phoneId}
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="e.g. 98765 43210"
                  className={`bk-input with-icon ${errors.phone ? "has-error" : ""}`}
                />
              </div>
              {errors.phone && <span className="bk-error-text">{errors.phone}</span>}
            </div>

            {/* Email Address */}
            <div className="bk-field-group bk-col-span-2">
              <label htmlFor={emailId} className="bk-field-label">
                <span>Email Address</span>
                <span className="bk-req">*</span>
              </label>
              <div className="bk-input-wrap">
                <Mail size={16} className="bk-field-icon" />
                <input
                  id={emailId}
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="e.g. rahul@example.com"
                  className={`bk-input with-icon ${errors.email ? "has-error" : ""}`}
                />
              </div>
              {errors.email && <span className="bk-error-text">{errors.email}</span>}
            </div>

            {/* Location (City, State, Country) */}
            <div className="bk-field-group">
              <label className="bk-field-label">City (Optional)</label>
              <div className="bk-input-wrap">
                <MapPin size={16} className="bk-field-icon" />
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  placeholder="e.g. Indore"
                  className="bk-input with-icon"
                />
              </div>
            </div>

            <div className="bk-field-group">
              <label className="bk-field-label">State &amp; Country</label>
              <div className="bk-input-wrap">
                <input
                  type="text"
                  value={formData.state ? `${formData.state}, ${formData.country}` : formData.country}
                  onChange={(e) => updateField("state", e.target.value)}
                  placeholder="e.g. Madhya Pradesh, India"
                  className="bk-input"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          STEP 2: ARTWORK REQUIREMENTS
          ============================================================ */}
      {step === 2 && (
        <div className="bk-step-section bk-fade-in" role="tabpanel" aria-label="Step 2: Artwork Requirements">
          <div className="bk-step-heading-group">
            <h3 className="bk-step-title">Artwork Specifications</h3>
            <p className="bk-step-desc">
              Choose the artwork style, subject, preferred medium and dimensions.
            </p>
          </div>

          <div className="bk-fields-grid">
            {/* Artwork Type */}
            <div className="bk-field-group bk-col-span-2">
              <label className="bk-field-label">
                <span>Artwork Category</span>
                <span className="bk-req">*</span>
              </label>
              <div className="bk-pills-selector">
                {ARTWORK_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => updateField("artworkType", type)}
                    className={`bk-pill-option ${formData.artworkType === type ? "is-selected" : ""}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject / Details */}
            <div className="bk-field-group bk-col-span-2">
              <label htmlFor={subjectId} className="bk-field-label">
                <span>Who or what should be drawn?</span>
                <span className="bk-req">*</span>
              </label>
              <input
                id={subjectId}
                type="text"
                value={formData.subject}
                onChange={(e) => updateField("subject", e.target.value)}
                placeholder="e.g. My parents on their 25th anniversary, or pet Golden Retriever"
                className={`bk-input ${errors.subject ? "has-error" : ""}`}
                autoFocus
              />
              {errors.subject && <span className="bk-error-text">{errors.subject}</span>}
            </div>

            {/* Number of Subjects */}
            <div className="bk-field-group">
              <label className="bk-field-label">Number of People / Pets</label>
              <select
                value={formData.subjectCount}
                onChange={(e) => updateField("subjectCount", e.target.value)}
                className="bk-select"
              >
                <option value="1 Person">1 Person</option>
                <option value="2 People / Couple">2 People / Couple</option>
                <option value="3 People">3 People</option>
                <option value="4+ Family">4+ Family</option>
                <option value="1 Pet">1 Pet</option>
                <option value="2 Pets">2 Pets</option>
                <option value="Object / Landscape / Deity">Object / Landscape / Deity</option>
              </select>
            </div>

            {/* Preferred Medium */}
            <div className="bk-field-group">
              <label className="bk-field-label">Preferred Medium</label>
              <select
                value={formData.medium}
                onChange={(e) => updateField("medium", e.target.value)}
                className="bk-select"
              >
                {MEDIUMS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Artwork Size Cards */}
            <div className="bk-field-group bk-col-span-2">
              <label className="bk-field-label">Artwork Size</label>
              <div className="bk-size-cards-grid">
                {SIZES.map((sz) => (
                  <div
                    key={sz.id}
                    onClick={() => updateField("size", sz.id)}
                    className={`bk-size-card ${formData.size === sz.id ? "is-selected" : ""}`}
                  >
                    <div className="bk-size-card-header">
                      <strong className="bk-size-name">{sz.name}</strong>
                      {formData.size === sz.id && <Check size={14} className="bk-check-mini" />}
                    </div>
                    <span className="bk-size-desc">{sz.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="bk-field-group">
              <label className="bk-field-label">Quantity</label>
              <select
                value={formData.quantity}
                onChange={(e) => updateField("quantity", e.target.value)}
                className="bk-select"
              >
                <option value="1">1 Piece</option>
                <option value="2">2 Pieces</option>
                <option value="3">3 Pieces</option>
                <option value="4">4 Pieces</option>
                <option value="5+ Multiple">5+ Multiple Pieces</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          STEP 3: BUDGET AND OCCASION
          ============================================================ */}
      {step === 3 && (
        <div className="bk-step-section bk-fade-in" role="tabpanel" aria-label="Step 3: Budget and Occasion">
          <div className="bk-step-heading-group">
            <h3 className="bk-step-title">Budget &amp; Target Date</h3>
            <p className="bk-step-desc">
              Share your expected price range and event timeline so Deepak can tailor the scope.
            </p>
          </div>

          <div className="bk-fields-grid">
            {/* Budget Range */}
            <div className="bk-field-group bk-col-span-2">
              <label className="bk-field-label">Estimated Budget</label>
              <div className="bk-budget-chips">
                {BUDGET_OPTIONS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => updateField("budget", b)}
                    className={`bk-budget-chip ${formData.budget === b ? "is-selected" : ""}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion */}
            <div className="bk-field-group bk-col-span-2">
              <label className="bk-field-label">Special Occasion</label>
              <div className="bk-pills-selector">
                {OCCASIONS.map((occ) => (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => updateField("occasion", occ)}
                    className={`bk-pill-option ${formData.occasion === occ ? "is-selected" : ""}`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Completion Date */}
            <div className="bk-field-group bk-col-span-2">
              <label className="bk-field-label">Required Delivery / Completion Date</label>
              <div className="bk-date-control-row">
                <div className="bk-input-wrap bk-date-wrap">
                  <Calendar size={16} className="bk-field-icon" />
                  <input
                    type="date"
                    disabled={formData.isDateFlexible}
                    value={formData.completionDate}
                    min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                    onChange={(e) => updateField("completionDate", e.target.value)}
                    className="bk-input with-icon"
                  />
                </div>

                <label className="bk-checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.isDateFlexible}
                    onChange={(e) => updateField("isDateFlexible", e.target.checked)}
                    className="bk-checkbox"
                  />
                  <span>Flexible / No strict deadline</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          STEP 4: FINISHING, FRAMING & GIFT WRAP
          ============================================================ */}
      {step === 4 && (
        <div className="bk-step-section bk-fade-in" role="tabpanel" aria-label="Step 4: Finishing and Delivery">
          <div className="bk-step-heading-group">
            <h3 className="bk-step-title">Finishing &amp; Presentation</h3>
            <p className="bk-step-desc">
              Choose framing options, gift packaging, and delivery method.
            </p>
          </div>

          <div className="bk-fields-grid">
            {/* Framing Options */}
            <div className="bk-field-group bk-col-span-2">
              <label className="bk-field-label">Framing Preference</label>
              <div className="bk-framing-grid">
                {FRAMING_OPTIONS.map((f) => (
                  <div
                    key={f.id}
                    onClick={() => updateField("framing", f.id)}
                    className={`bk-framing-card ${formData.framing === f.id ? "is-selected" : ""}`}
                  >
                    <div className="bk-framing-header">
                      <strong>{f.title}</strong>
                      {formData.framing === f.id && <Check size={14} className="bk-check-mini" />}
                    </div>
                    <span className="bk-framing-desc">{f.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gift Wrapping Toggle */}
            <div className="bk-field-group bk-col-span-2 bk-gift-wrapper-box">
              <label className="bk-checkbox-label bk-gift-toggle-row">
                <input
                  type="checkbox"
                  checked={formData.giftWrapping}
                  onChange={(e) => updateField("giftWrapping", e.target.checked)}
                  className="bk-checkbox"
                />
                <span className="bk-gift-toggle-text">
                  <Gift size={16} className="bk-gift-icon-accent" />
                  <strong>Include handcrafted gift wrapping &amp; presentation</strong>
                </span>
              </label>

              {formData.giftWrapping && (
                <div className="bk-gift-details-wrap bk-fade-in">
                  <div className="bk-gift-packages-row">
                    {GIFT_PACKAGES.map((pkg) => (
                      <div
                        key={pkg.id}
                        onClick={() => updateField("giftPackage", `${pkg.name} (${pkg.priceDisplay})`)}
                        className={`bk-gift-pkg-chip ${
                          formData.giftPackage?.includes(pkg.name) ? "is-selected" : ""
                        }`}
                      >
                        <span className="bk-pkg-name">{pkg.name}</span>
                        <span className="bk-pkg-price">{pkg.priceDisplay}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bk-fields-grid bk-mt-3">
                    <div className="bk-field-group">
                      <label className="bk-field-label">Recipient's Name</label>
                      <input
                        type="text"
                        value={formData.giftRecipient}
                        onChange={(e) => updateField("giftRecipient", e.target.value)}
                        placeholder="Name to write on the gift tag"
                        className="bk-input"
                      />
                    </div>

                    <div className="bk-field-group">
                      <label className="bk-field-label">Gift Message (Handwritten card)</label>
                      <input
                        type="text"
                        maxLength={150}
                        value={formData.giftMessage}
                        onChange={(e) => updateField("giftMessage", e.target.value)}
                        placeholder="Special message to accompany the artwork"
                        className="bk-input"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Delivery Method */}
            <div className="bk-field-group bk-col-span-2">
              <label className="bk-field-label">Delivery Preference</label>
              <div className="bk-pills-selector">
                {DELIVERY_OPTIONS.map((dm) => (
                  <button
                    key={dm}
                    type="button"
                    onClick={() => updateField("deliveryMethod", dm)}
                    className={`bk-pill-option ${formData.deliveryMethod === dm ? "is-selected" : ""}`}
                  >
                    {dm}
                  </button>
                ))}
              </div>
            </div>

            {/* Courier Address (shown if courier is selected) */}
            {formData.deliveryMethod === "Courier Delivery" && (
              <div className="bk-field-group bk-col-span-2 bk-fade-in">
                <label className="bk-field-label">Delivery Address (Optional for initial enquiry)</label>
                <div className="bk-fields-grid">
                  <div className="bk-field-group bk-col-span-2">
                    <input
                      type="text"
                      value={formData.deliveryAddress}
                      onChange={(e) => updateField("deliveryAddress", e.target.value)}
                      placeholder="Street address / House number"
                      className="bk-input"
                    />
                  </div>
                  <div className="bk-field-group">
                    <input
                      type="text"
                      value={formData.deliveryCity}
                      onChange={(e) => updateField("deliveryCity", e.target.value)}
                      placeholder="City"
                      className="bk-input"
                    />
                  </div>
                  <div className="bk-field-group">
                    <input
                      type="text"
                      value={formData.pinCode}
                      onChange={(e) => updateField("pinCode", e.target.value)}
                      placeholder="PIN Code"
                      className="bk-input"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================
          STEP 5: REFERENCE PHOTOS, INSTRUCTIONS & THREE SUBMISSION CHANNELS
          ============================================================ */}
      {step === 5 && (
        <div className="bk-step-section bk-fade-in" role="tabpanel" aria-label="Step 5: Review and Submit">
          <div className="bk-step-heading-group">
            <h3 className="bk-step-title">Review &amp; Send Booking</h3>
            <p className="bk-step-desc">
              Attach reference photos, add any specific instructions, and choose how to send your booking directly to Deepak Mewada.
            </p>
          </div>

          {/* Reference Photo Attachment Section */}
          <div className="bk-photo-upload-box">
            <div className="bk-photo-upload-header">
              <span className="bk-field-label">
                <ImageIcon size={15} />
                <span>Reference Photos (Optional preview)</span>
              </span>
              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bk-btn-attach"
              >
                <Upload size={14} />
                <span>Select Photos</span>
              </button>
            </div>

            {/* Thumbnail Previews */}
            {formData.referenceFiles && formData.referenceFiles.length > 0 ? (
              <div className="bk-thumbnails-grid">
                {formData.referenceFiles.map((file) => (
                  <div key={file.id} className="bk-thumb-card">
                    <img src={file.previewUrl} alt={file.name} className="bk-thumb-img" />
                    <div className="bk-thumb-info">
                      <span className="bk-thumb-name" title={file.name}>{file.name}</span>
                      <span className="bk-thumb-size">{file.size}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttachment(file.id)}
                      className="bk-thumb-del"
                      title="Remove image"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="bk-upload-dropzone"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={22} className="bk-dropzone-icon" />
                <p className="bk-dropzone-text">
                  Click to select reference photos from your device.
                </p>
                <span className="bk-dropzone-sub">Supports JPG, PNG, WEBP</span>
              </div>
            )}

            <div className="bk-upload-notice">
              <Info size={14} className="bk-notice-icon" />
              <span>
                <strong>Note:</strong> Photos selected above are previewed locally. When you tap <em>Send Booking via WhatsApp</em> or <em>Email</em>, remember to attach/send your reference photo directly in the chat or email.
              </span>
            </div>
          </div>

          {/* Additional Notes Textarea */}
          <div className="bk-field-group bk-mt-4">
            <label htmlFor={notesId} className="bk-field-label">
              <span>Additional Instructions / Notes</span>
            </label>
            <textarea
              id={notesId}
              rows={3}
              value={formData.additionalNotes}
              onChange={(e) => updateField("additionalNotes", e.target.value)}
              placeholder="Any background preferences, specific inscriptions or text to write on the artwork, colour palette notes..."
              className="bk-textarea"
            />
          </div>

          {/* Live Booking Review Summary Box */}
          <div className="bk-summary-card">
            <h4 className="bk-summary-title">Booking Summary</h4>
            <div className="bk-summary-items">
              <div className="bk-summary-row">
                <span className="bk-sum-label">Client:</span>
                <span className="bk-sum-val">{formData.fullName} ({formData.phone})</span>
              </div>
              <div className="bk-summary-row">
                <span className="bk-sum-label">Artwork:</span>
                <span className="bk-sum-val">
                  {formData.artworkType} — {formData.size} ({formData.medium})
                </span>
              </div>
              <div className="bk-summary-row">
                <span className="bk-sum-label">Subject:</span>
                <span className="bk-sum-val">{formData.subject} ({formData.subjectCount})</span>
              </div>
              <div className="bk-summary-row">
                <span className="bk-sum-label">Budget:</span>
                <span className="bk-sum-val">{formData.budget}</span>
              </div>
              <div className="bk-summary-row">
                <span className="bk-sum-label">Finishing:</span>
                <span className="bk-sum-val">
                  {formData.framing}
                  {formData.giftWrapping ? ` + ${formData.giftPackage}` : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Three Ways to Submit Section */}
          <div className="bk-submission-channels">
            <div className="bk-sub-channels-header">
              <h4 className="bk-channels-title">Choose How to Send Your Booking</h4>
              <span className="bk-channels-sub">Instant direct contact with Deepak Mewada</span>
            </div>

            <div className="bk-channels-grid">
              {/* CHANNEL 1: WHATSAPP */}
              <button
                type="button"
                onClick={handleWhatsAppSubmit}
                disabled={submittingChannel !== null}
                className="bk-channel-btn bk-btn-whatsapp"
                data-cursor="hover"
              >
                <div className="bk-btn-channel-icon">
                  <MessageCircle size={22} strokeWidth={2.2} />
                </div>
                <div className="bk-btn-channel-text">
                  <strong>Send Booking via WhatsApp</strong>
                  <span>Opens WhatsApp chat directly with all details pre-filled</span>
                </div>
                <span className="bk-btn-channel-arrow">→</span>
              </button>

              {/* CHANNEL 2: EMAIL */}
              <button
                type="button"
                onClick={handleEmailSubmit}
                disabled={submittingChannel !== null}
                className="bk-channel-btn bk-btn-email"
                data-cursor="hover"
              >
                <div className="bk-btn-channel-icon">
                  <Mail size={22} strokeWidth={2.2} />
                </div>
                <div className="bk-btn-channel-text">
                  <strong>Send Booking via Email</strong>
                  <span>Opens your email app with formatted request</span>
                </div>
                <span className="bk-btn-channel-arrow">→</span>
              </button>

              {/* CHANNEL 3: INSTAGRAM */}
              <button
                type="button"
                onClick={handleInstagramSubmit}
                disabled={submittingChannel !== null}
                className="bk-channel-btn bk-btn-instagram"
                data-cursor="hover"
              >
                <div className="bk-btn-channel-icon">
                  <Instagram size={22} strokeWidth={2.2} />
                </div>
                <div className="bk-btn-channel-text">
                  <strong>Send via Instagram DM</strong>
                  <span>Opens DM chat with @dkarts_718 &amp; copies all details</span>
                </div>
                <span className="bk-btn-channel-arrow">→</span>
              </button>
            </div>

            {/* DIRECT INSTAGRAM DM GUIDANCE PANEL */}
            {instagramActive && (
              <div className="bk-instagram-active-panel bk-fade-in" role="region" aria-label="Instagram Direct Message instructions">
                <div className="bk-ig-header">
                  <div className="bk-ig-icon-badge">
                    <Instagram size={22} strokeWidth={2.2} />
                  </div>
                  <div className="bk-ig-header-text">
                    <h5 className="bk-ig-title">Chat Opened Directly with @dkarts_718</h5>
                    <p className="bk-ig-subtitle">All your booking details are ready on your clipboard</p>
                  </div>
                </div>

                <div className="bk-ig-instruction-box">
                  <div className="bk-ig-step-item">
                    <span className="bk-ig-step-num">1</span>
                    <span>Direct chat opened in Instagram: <code>ig.me/m/dkarts_718</code></span>
                  </div>
                  <div className="bk-ig-step-item">
                    <span className="bk-ig-step-num">2</span>
                    <span>All booking specifications &amp; contact details are copied.</span>
                  </div>
                  <div className="bk-ig-step-item bk-ig-highlight">
                    <span className="bk-ig-step-num">3</span>
                    <span>👉 <strong>Simply paste (Ctrl+V / Long-press &amp; Paste)</strong> into the chat box with Deepak and hit Send!</span>
                  </div>
                </div>

                <div className="bk-ig-actions-row">
                  <button
                    type="button"
                    onClick={handleManualCopy}
                    className="bk-ig-action-btn bk-ig-btn-copy"
                    data-cursor="hover"
                  >
                    {copyFeedback ? <Check size={16} /> : <Copy size={16} />}
                    <span>{copyFeedback ? "✓ Copied to Clipboard!" : "Copy Details Again"}</span>
                  </button>

                  <a
                    href={getInstagramDmUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="bk-ig-action-btn bk-ig-btn-reopen"
                    data-cursor="hover"
                  >
                    <ExternalLink size={16} />
                    <span>Re-Open Instagram DM</span>
                  </a>
                </div>

                {/* Instant WhatsApp Switch */}
                <div className="bk-ig-whatsapp-alt">
                  <span>Prefer 1-click automatic text pre-fill without pasting?</span>
                  <button
                    type="button"
                    onClick={handleWhatsAppSubmit}
                    className="bk-ig-wa-pill-btn"
                    data-cursor="hover"
                  >
                    <MessageCircle size={15} />
                    <span>Send via WhatsApp (+91 87704 14426)</span>
                  </button>
                </div>

                {/* Formatted Text Preview */}
                <details className="bk-ig-details-accordion">
                  <summary>
                    <span>View copied booking text</span>
                  </summary>
                  <pre className="bk-ig-message-preview">{formatBookingSummary(formData, prefillContext)}</pre>
                </details>
              </div>
            )}

            {/* Copied Toast Notice (quick copy feedback) */}
            {copyFeedback && !instagramActive && (
              <div className="bk-copied-toast bk-fade-in" role="alert">
                <Check size={16} />
                <span>
                  <strong>Booking details copied!</strong> Ready to paste into your chat.
                </span>
              </div>
            )}

            {/* Artist Confirmation Notice */}
            <div className="bk-handoff-disclaimer">
              <p>
                <strong>What happens next?</strong> Deepak Mewada will personally review your reference photos, confirm compositional feasibility, turnaround time, and exact pricing within 24 hours. No payment is charged upfront.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          BOTTOM NAVIGATION CONTROLS (PREVIOUS / NEXT)
          ============================================================ */}
      <div className="bk-bottom-actions-row">
        {step > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="bk-nav-btn bk-btn-back"
            data-cursor="hover"
          >
            <ChevronLeft size={17} />
            <span>Previous</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={closeBooking}
            className="bk-nav-btn bk-btn-cancel"
            data-cursor="hover"
          >
            Cancel
          </button>
        )}

        <div className="bk-step-counter-pill">
          <span>Step {step} of 5</span>
        </div>

        {step < 5 ? (
          <button
            type="button"
            onClick={handleNext}
            className="bk-nav-btn bk-btn-next"
            data-cursor="hover"
          >
            <span>Next Step</span>
            <ChevronRight size={17} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleWhatsAppSubmit}
            className="bk-nav-btn bk-btn-primary-finish"
            data-cursor="hover"
          >
            <MessageCircle size={16} />
            <span>Send on WhatsApp</span>
          </button>
        )}
      </div>
    </div>
  );
}
