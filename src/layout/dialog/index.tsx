import Dialog from "components/Dialog";
import useCreateDialog from "components/Dialog/hooks/useCreateDialog";
import { createElement, memo } from "react";

function DialogLayout() {
  const { isOpen, DrawerComponent, handleClose } = useCreateDialog();

  return (
    <Dialog isOpen={isOpen} onClose={handleClose}>
      {DrawerComponent
        ? createElement(DrawerComponent, { onClose: handleClose })
        : null}
    </Dialog>
  );
}

export default memo(DialogLayout);
