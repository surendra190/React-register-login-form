import React, { useState } from "react";
import { z } from "zod";

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
  });

  const [submitData, setSubmitData] = useState({});
  const [errors, setErrors] = useState({});

  // Zod schema
  const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    city: z.string().optional(),
  });

  function onChange(e) {
    const { name, value } = e.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    // clear field error on change
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function submitChange(e) {
    e.preventDefault(); // Prevent page reload
    setErrors({});

    // validate with zod
    const result = schema.safeParse(formData);
    if (!result.success) {
      // map zod issues to simple field->message object
      const fieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] || "_form";
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      // optional: read response (not required)
      // const created = await res.json();

      setSubmitData(formData);
      setFormData({ name: "", email: "", password: "", city: "" });
      setErrors({});
    } catch (error) {
      console.error("Error submitting form data:", error);
      setErrors({ _form: "Error submitting form data. See console." });
    }
  }

  return (
    <>
      <div className="bg-gray-100 flex-column p-4 w-1/2 mx-auto mt-10 rounded">
        <form onSubmit={submitChange} className="flex flex-col gap-4">
          <label htmlFor="name">
            Name :
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
            />
          </label>
          {errors.name && (
            <div style={{ color: "red", fontSize: 12 }}>{errors.name}</div>
          )}

          <label htmlFor="email">
            Email :
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={onChange}
            />
          </label>
          {errors.email && (
            <div style={{ color: "red", fontSize: 12 }}>{errors.email}</div>
          )}

          <label htmlFor="password">
            Password :
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={onChange}
            />
          </label>
          {errors.password && (
            <div style={{ color: "red", fontSize: 12 }}>{errors.password}</div>
          )}

          <label htmlFor="city">
            City :
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={onChange}
            />
          </label>
          {errors.city && (
            <div style={{ color: "red", fontSize: 12 }}>{errors.city}</div>
          )}

          <div className="flex justify-center">
            <button
              className="bg-blue-600 text-white rounded w-1/4"
              type="submit"
            >
              Register
            </button>
          </div>

          {errors._form && (
            <div style={{ color: "red", textAlign: "center" }}>
              {errors._form}
            </div>
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
          {submitData.name && (
            <label htmlFor="name">
              Name:{submitData.name} <br />
              Email:{submitData.email} <br />
              Password:{submitData.password} <br />
              City:{submitData.city}
            </label>
          )}
        </div>
      </div>
    </>
  );
};
