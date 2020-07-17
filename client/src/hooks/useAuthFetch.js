import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function useAuthFetch(endpoint, { body, ...customConfig } = {}) {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const accessToken = await getAccessTokenSilently();

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          userid: user.sub.slice(6)
        };

        const config = {
          method: body ? "POST" : "GET",
          ...customConfig,
          headers: {
            ...headers,
            ...customConfig.headers
          }
        };

        if (body) {
          body.user = user;
          config.body = JSON.stringify(body);
        }

        const res = await fetch(endpoint, config);
        const data = await res.json();
        if (res.status >= 200 && res.status < 300) {
          setResponse(data);
        } else {
          setError(data.message);
        }
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, [endpoint, isAuthenticated]);

  return { response, isLoading, error };
}
