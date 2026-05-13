import React, { useState } from "react";

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [submitData, setSubmitData] = useState({});
  const [error, setError] = useState("");

  function onChange(e) {
    const { name, value } = e.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  }

  async function submitChange(e) {
    e.preventDefault(); // Prevent page reload
    setError("");

    if (!formData.email) {
      setError("Email is required.");
      return;
    }

    try {
      // Use URL + searchParams (automatically encodes values)
      const url = new URL("http://localhost:3000/users");
      url.searchParams.set("email", formData.email);

      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const users = await res.json();

      // Assuming the endpoint returns an array of users matching the email
      if (!users || users.length === 0) {
        setError("No user found with that email.");
        return;
      }

      const user = users[0];

      if (user.password === formData.password) {
        setSubmitData(formData);
        setFormData({ email: "", password: "" });
        setError("");
      } else {
        setError("Incorrect password.");
      }
    } catch (err) {
      console.error("Error submitting form data:", err);
      setError("Error submitting form data. See console for details.");
    }
  }

  return (
    <>
      <div className="bg-gray-100 flex-column p-4 w-1/2 mx-auto mt-10 rounded">
        <form onSubmit={submitChange} className="flex flex-col gap-4">
          <label htmlFor="email">
            Email :
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={onChange}
            />
          </label>
          <label htmlFor="password">
            Password :
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={onChange}
            />
          </label>

          <div className="flex justify-center">
            <button
              className="bg-blue-600 text-white rounded w-1/4"
              type="submit"
            >
              Login
            </button>
          </div>
          {error && (
            <div style={{ color: "red", textAlign: "center" }}>{error}</div>
          )}
        </form>

        <div
          style={{
            border: "1px solid black",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <h5 className="font-bold">Submitted Form Data</h5>
          {submitData.email && (
            <label htmlFor="email">
              Email:{submitData.email} <br />
              Password:{submitData.password}
            </label>
          )}
        </div>
      </div>
    </>
  );
};
