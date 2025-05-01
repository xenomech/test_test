"use client";

import { useAuth } from "@/hooks/useAuth";
function Application() {
  const { user, logout } = useAuth();
  return (
    <div>
      <h1>Application</h1>
      <p>{user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Application;
