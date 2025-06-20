import { useEffect, useState } from "react";
import { RoleContext } from "../hooks/useRole";
import { useAuth } from "./AuthContext";

export const RoleProvider = ({ children }) => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      if (user) {
        try {
          const token = await user.getIdToken();
          const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/users/me`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            },
          );

          if (response.ok) {
            const data = await response.json();
            setRole(data.role);
          } else {
            console.error("Failed to fetch user role:", response.statusText);
            setRole(null);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setRole(null);
        }
      } else {
        setRole(null);
      }
    };
    fetchRole();
  }, [user]);

  return (
    <RoleContext.Provider value={{ role }}>{children}</RoleContext.Provider>
  );
};
