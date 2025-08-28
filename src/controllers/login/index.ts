import useLocalStorage from "hooks/useLocalStorage";
import { useNavigate } from "react-router";

function useLogin() {
  const { set } = useLocalStorage();
  const navigate = useNavigate();

  function handleLogin() {
    set("accessToken", { name: "Example" });
    navigate("/app");
  }

  return {
    handleLogin,
  };
}

export default useLogin;
