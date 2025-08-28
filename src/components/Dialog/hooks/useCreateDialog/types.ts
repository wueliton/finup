import type { drawerKeys } from "routes/drawer.routes";

interface DialogComponentProps {
  onClose: () => void;
}

type ModalParam = keyof typeof drawerKeys;

export type { DialogComponentProps, ModalParam };
