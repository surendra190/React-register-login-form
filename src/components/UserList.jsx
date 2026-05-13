import React, { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function fetchUsers() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("http://localhost:3000/users");
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        if (mounted) setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        if (mounted) setError(err.message || "Fetch error");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchUsers();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <h1>UserList</h1>

      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: 12,
                }}
              >
                <thead>
                  <tr>
                    <th style={{ border: "1px solid #ddd", padding: 8 }}>ID</th>
                    <th style={{ border: "1px solid #ddd", padding: 8 }}>
                      Name
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: 8 }}>
                      Email
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: 8 }}>
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, idx) => (
                    <tr key={u.id ?? idx}>
                      <td style={{ border: "1px solid #eee", padding: 8 }}>
                        {u.id ?? "-"}
                      </td>
                      <td style={{ border: "1px solid #eee", padding: 8 }}>
                        {u.name ?? "-"}
                      </td>
                      <td style={{ border: "1px solid #eee", padding: 8 }}>
                        {u.email ?? "-"}
                      </td>
                      <td
                        style={{
                          border: "1px solid #eee",
                          padding: 8,
                          fontSize: 12,
                          color: "#333",
                        }}
                      >
                        <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                          {JSON.stringify(u, null, 2)}
                        </pre>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default UserList;
