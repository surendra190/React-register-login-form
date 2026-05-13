import React from "react";
import UserList from "./UserList";

const Home = () => {
  return (
    <div style={{ textAlign: "center", marginTop: 24 }}>
      {/* <h1>Welcome</h1> */}
      <p>Register or Login</p>
      <UserList />
    </div>
  );
};
export default Home;
