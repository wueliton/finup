import useLocalStorage from "hooks/useLocalStorage";
import { redirect } from "react-router";

function useAuthMiddleware() {
  const { get } = useLocalStorage();
  const isUnauthorized = !get("accessToken");

  if (isUnauthorized) throw redirect("/login");
  return null;
}

export default useAuthMiddleware;
