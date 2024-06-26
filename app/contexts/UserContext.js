import React, { useState, createContext } from "react";

export const UserContext = createContext(null);

export function UserProvider(props) {
  const [user, setUser] = useState({
    isLoggedIn: false,
    user_id: "test",
    type: "customer",
    name: "test",
    users_shop_id: 9,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
