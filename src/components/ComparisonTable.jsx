import React from "react";

export const ComparisonTable = () => {
  const containerStyle = {
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    maxWidth: "900px",
    margin: "20px auto",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    overflowX: "auto",
    backgroundColor: "#fff",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.9rem",
  };

  const thStyle = {
    backgroundColor: "#1e3a8a",
    color: "white",
    fontWeight: "600",
    padding: "12px 16px",
    textAlign: "left",
    borderBottom: "1px solid #334155",
  };

  const tdStyle = {
    padding: "12px 16px",
    borderBottom: "1px solid #e5e7eb",
    verticalAlign: "top",
  };

  const firstColStyle = {
    ...tdStyle,
    fontWeight: "600",
    backgroundColor: "#f9fafb",
    width: "30%",
  };

  const controlledStyle = {
    color: "#065f46",
  };

  const uncontrolledStyle = {
    color: "#92400e",
  };

  const headingStyle = {
    fontSize: "1.25rem",
    fontWeight: "600",
    padding: "16px 20px 0 20px",
    margin: 0,
    color: "#1f2937",
  };

  const data = [
    {
      point: "1. State source",
      controlled: "React state",
      uncontrolled: "DOM itself",
    },
    {
      point: "2. Data access",
      controlled: "from `state`",
      uncontrolled: "from `ref` or DOM query",
    },
    { point: "3. Rerender on change", controlled: "yes", uncontrolled: "no" },
    {
      point: "4. Single source of truth",
      controlled: "React",
      uncontrolled: "DOM",
    },
    {
      point: "5. Input value binding",
      controlled: "`value` + `onChange`",
      uncontrolled: "`defaultValue` + `ref`",
    },
  ];

  return (
    <div style={containerStyle}>
      <h3 style={headingStyle}>
        📊 Controlled vs Uncontrolled Components – 5 Key Differences
      </h3>
      <div style={{ overflowX: "auto" }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Difference</th>
              <th style={thStyle}>Controlled Component</th>
              <th style={thStyle}>Uncontrolled Component</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                <td style={firstColStyle}>{row.point}</td>
                <td style={{ ...tdStyle, ...controlledStyle }}>
                  {row.controlled}
                </td>
                <td style={{ ...tdStyle, ...uncontrolledStyle }}>
                  {row.uncontrolled}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;
