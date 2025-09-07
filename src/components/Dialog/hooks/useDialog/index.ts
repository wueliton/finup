import { useRef } from "react";
import { useNavigate } from "react-router";
import type { drawerKeys } from "routes/drawer.routes";

function useDialog() {
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);

  function open(route: keyof typeof drawerKeys) {
    navigateRef.current(`?modal=${route}`);
  }

  return {
    open,
  };
}

export default useDialog;
