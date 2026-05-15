import React, { useRef, useState } from "react";
import ComparisonTable from "./ComparisonTable";

export default function UncontrolledForm() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [submitted, setSubmitted] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name: nameRef.current?.value || "",
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    };
    setSubmitted(data);
    // optionally clear inputs:
    e.target.reset();
  }

  return (
    <>
      <div className="bg-gray-100 flex-column p-4 w-1/2 mx-auto mt-10 rounded">
        <h2>Uncontrolled Form</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="name">
            Name :
            <input type="text" name="name" ref={nameRef} />
          </label>

          <label htmlFor="email">
            Email :
            <input type="email" name="email" ref={emailRef} />
          </label>

          <label htmlFor="password">
            Password :
            <input type="password" name="password" ref={passwordRef} />
          </label>

          <div className="flex justify-center">
            <button
              className="bg-blue-600 text-white rounded w-1/4"
              type="submit"
            >
              Submit
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
          {submitted && (
            <label htmlFor="submitted">
              Name:{submitted.name} <br />
              Email:{submitted.email} <br />
              Password:{submitted.password}
            </label>
          )}
        </div>
      </div>
      `` <ComparisonTable />
    </>
  );
}
