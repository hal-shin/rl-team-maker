import React, { createContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext();

export function UserProvider(props) {
  const {
    getAccessTokenSilently,
    user: authUser,
    isAuthenticated
  } = useAuth0();
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const getEvents = () => {
  //     fetch("/user/tournaments");
  //   };
  //
  //   if (user) getEvents();
  // }, [user]);

  const fetchUser = async () => {
    if (user) {
      const resp = await fetch(`/user?userId=${user._id}`);
      const data = await resp.json();
      setUser(data);
    }
  };

  const authFetch = async (url, options = {}) => {
    try {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently();

        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            userid: authUser.sub.slice(6),
            "Content-Type": "application/json"
          },
          ...options
        };

        const response = await fetch(url, config);

        return await response.json();
      }
    } catch (err) {
      console.log("fetch failed:", err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        fetchUser,
        authFetch
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
