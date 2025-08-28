import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { drawerKeys } from "routes/drawer.routes";
import type { ModalParam } from "./types";

function useCreateDialog() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [openedDialogState, setOpenedDialogState] = useState<ModalParam>();
  const modal = searchParams.get("modal") as ModalParam;
  const isOpen = Boolean(modal);
  const DrawerComponent = openedDialogState
    ? drawerKeys[openedDialogState]
    : null;

  function handleClose() {
    navigate(-1);
  }

  function handleEscKeyPress(event: KeyboardEvent) {
    const ignoreKey = event.key !== "Escape";

    if (ignoreKey) return;

    const currentRoute = new URLSearchParams(window.location.search);
    const isEmptyOpenedModal = !currentRoute.has("modal");

    if (isEmptyOpenedModal) return;

    handleClose();
    event.preventDefault();
  }

  useEffect(() => {
    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, []);

  useEffect(() => {
    if (modal) {
      setOpenedDialogState(modal);
    }
  }, [modal]);

  return {
    isOpen,
    handleClose,
    DrawerComponent,
  };
}

export default useCreateDialog;
