import { useCallback, useEffect, useState } from "react";
import { axiosBaseURL } from "../lib/axios";
import { useDispatch } from "react-redux";

export const useHydration = () => {
  const dispatch = useDispatch();
  const [isHydrated, setIsHydrated] = useState(false);

  const hydrateAuth = useCallback(async () => {
    try {
      // Get the user ID from local storage
      const id = JSON.parse(localStorage.getItem("currentUser"));
      if (id) {
        // Fetch the user data from the API
        const currentUser = await axiosBaseURL.get(`/users/${id}`);
        // Dispatch the user/login action to log the user in
        dispatch({ type: "user/login", payload: currentUser.data });
      }
    } catch (error) {
      // Log an error if something went wrong
      console.log("Failed to hydrate user:", error);
    } finally {
      // Set isHydrated to true, so the app can render
      setIsHydrated(true);
    }
  }, [dispatch, setIsHydrated]);

  useEffect(() => {
    hydrateAuth();
  }, [hydrateAuth]);
  return {
    isHydrated,
  };
};
