import React, { useState } from "react";

const EventRegistrationForm = () => {
  // State for all form fields
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    eventSession: "morning", // select
    mealPreference: "regular", // radio
    comments: "",
    agreeTerms: false, // checkbox
    eventDate: "", // calendar (date picker)
    excitement: 5, // range slider (extra)
    profilePicture: null, // file upload (extra)
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  // Handle change for text/select/checkbox/radio/range/date
  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // Clear error for this field when user types
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.eventDate)
      newErrors.eventDate = "Please select an event date";
    if (!formData.agreeTerms)
      newErrors.agreeTerms = "You must agree to the terms";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Save submitted data and optionally reset form
    setSubmitted(formData);
    console.log("Form Data:", formData);
    // reset form (optional)
    setFormData({
      fullName: "",
      email: "",
      eventSession: "morning",
      mealPreference: "regular",
      comments: "",
      agreeTerms: false,
      eventDate: "",
      excitement: 5,
      profilePicture: null,
    });
  };

  return (
    <div className="bg-gray-100 flex-column p-4 w-1/2 mx-auto mt-10 rounded">
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "600px", margin: "0 auto", fontFamily: "Arial" }}
      >
        <h2>🎉 Event Registration & Feedback</h2>

        {/* --- Text Input (Full Name) --- */}
        <div style={{ marginBottom: "15px" }}>
          <label>
            Full Name:{" "}
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              style={{ width: "100%", padding: "8px" }}
            />
          </label>
          {errors.fullName && (
            <div style={{ color: "red", fontSize: "14px" }}>
              {errors.fullName}
            </div>
          )}
        </div>

        {/* --- Email Input (another text input) --- */}
        <div style={{ marginBottom: "15px" }}>
          <label>
            Email:{" "}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              style={{ width: "100%", padding: "8px" }}
            />
          </label>
          {errors.email && (
            <div style={{ color: "red", fontSize: "14px" }}>{errors.email}</div>
          )}
        </div>

        {/* --- Select Dropdown --- */}
        <div style={{ marginBottom: "15px" }}>
          <label>
            Event Session:
            <select
              name="eventSession"
              value={formData.eventSession}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px" }}
            >
              <option value="morning">Morning (10 AM)</option>
              <option value="afternoon">Afternoon (2 PM)</option>
              <option value="evening">Evening (6 PM)</option>
            </select>
          </label>
        </div>

        {/* --- Radio Buttons (Meal Preference) --- */}
        <fieldset
          style={{
            marginBottom: "15px",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          <legend>Meal Preference:</legend>
          <label style={{ marginRight: "15px" }}>
            <input
              type="radio"
              name="mealPreference"
              value="regular"
              checked={formData.mealPreference === "regular"}
              onChange={handleChange}
            />{" "}
            Regular
          </label>
          <label style={{ marginRight: "15px" }}>
            <input
              type="radio"
              name="mealPreference"
              value="vegetarian"
              checked={formData.mealPreference === "vegetarian"}
              onChange={handleChange}
            />{" "}
            Vegetarian
          </label>
          <label>
            <input
              type="radio"
              name="mealPreference"
              value="vegan"
              checked={formData.mealPreference === "vegan"}
              onChange={handleChange}
            />{" "}
            Vegan
          </label>
        </fieldset>

        {/* --- Textarea --- */}
        <div style={{ marginBottom: "15px" }}>
          <label>
            Additional Comments / Special Requests:
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows="3"
              style={{ width: "100%", padding: "8px" }}
              placeholder="Anything you'd like us to know..."
            ></textarea>
          </label>
        </div>

        {/* --- Checkbox (Agree to Terms) --- */}
        <div style={{ marginBottom: "15px" }}>
          <label>
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
            I agree to the event terms and conditions
          </label>
          {errors.agreeTerms && (
            <div style={{ color: "red", fontSize: "14px" }}>
              {errors.agreeTerms}
            </div>
          )}
        </div>

        {/* --- Calendar / Date Picker --- */}
        <div style={{ marginBottom: "15px" }}>
          <label>
            Select Event Date:
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px" }}
            />
          </label>
          {errors.eventDate && (
            <div style={{ color: "red", fontSize: "14px" }}>
              {errors.eventDate}
            </div>
          )}
        </div>

        {/* --- Extra: Range Slider (Excitement Level) --- */}
        <div style={{ marginBottom: "15px" }}>
          <label>
            How excited are you? (0 = low, 10 = high)
            <input
              type="range"
              name="excitement"
              min="0"
              max="10"
              value={formData.excitement}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
            <span> {formData.excitement}</span>
          </label>
        </div>

        {/* --- Extra: File Upload (Profile Picture) --- */}
        <div style={{ marginBottom: "15px" }}>
          <label>
            Profile Picture (optional):
            <input
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </label>
          {formData.profilePicture && (
            <span>Selected: {formData.profilePicture.name}</span>
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Register & Submit Feedback
        </button>
      </form>

      {/* Submitted result shown below form (same styled container) */}
      <div
        style={{
          border: "1px solid black",
          padding: "10px",
          marginTop: "10px",
          background: "white",
        }}
      >
        <h5 className="font-bold">Submitted Form Data</h5>
        {submitted ? (
          <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
            {JSON.stringify(
              submitted,
              (key, value) => (key === "profilePicture" ? value?.name : value),
              2,
            )}
          </pre>
        ) : (
          <div>No submission yet.</div>
        )}
      </div>
    </div>
  );
};

export default EventRegistrationForm;
