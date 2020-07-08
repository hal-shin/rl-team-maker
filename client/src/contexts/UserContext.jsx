import React, { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    if (user) {
      const resp = await fetch(`/user?userId=${user._id}`);
      const data = await resp.json();
      setUser(data);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        fetchUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
