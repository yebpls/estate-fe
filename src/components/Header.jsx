import React from "react";

function Header() {
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/register">Register</Link>
      </div>
      <div>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
}

export default Header;
