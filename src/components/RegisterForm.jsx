import React, { useState } from "react";

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
  });

  const [submitData, setSubmitData] = useState({});

  function onChange(e) {
    const { name, value } = e.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  }

  function submitChange(e) {
    e.preventDefault(); // Prevent page reload
    setSubmitData(formData);
    try {
      const response = fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error("Error submitting form data:", error);
    }

    setFormData({ name: "", email: "", password: "", city: "" });
  }

  return (
    <>
      <div className="bg-gray-100 flex-column p-4 w-1/2 mx-auto mt-10 rounded">
        {/* <h1>Register</h1> */}
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
          <label htmlFor="city">
            City :
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={onChange}
            />
          </label>
          <div className="flex justify-center">
            <button
              className="bg-blue-600 text-white rounded w-1/4"
              type="submit"
            >
              Register
            </button>
          </div>
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
