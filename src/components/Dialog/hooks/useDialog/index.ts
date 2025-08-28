import { useNavigate } from "react-router";
import type { drawerKeys } from "routes/drawer.routes";

function useDialog() {
  const navigate = useNavigate();

  function open(route: keyof typeof drawerKeys) {
    navigate(`?modal=${route}`);
  }

  return {
    open,
  };
}

export default useDialog;
