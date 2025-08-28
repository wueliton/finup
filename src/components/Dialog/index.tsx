import Animated from "components/Animated";
import useFocusTrap from "hooks/useFocusTrap";
import DialogActions from "./components/Actions";
import DialogHeader from "./components/Header";
import { dialogStyles } from "./styles";
import type { DialogProps } from "./types";

function Dialog({ children, isOpen }: DialogProps) {
  const { overlayContainer, content } = dialogStyles();
  const { containerRef } = useFocusTrap<HTMLDivElement>(isOpen);

  return (
    <>
      <Animated
        show={isOpen}
        animation="fade"
        className={overlayContainer()}
      ></Animated>
      <Animated
        role="dialog"
        aria-modal={true}
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        className={content()}
        animation="pop"
        ref={containerRef}
        show={isOpen}
      >
        {children}
      </Animated>
    </>
  );
}

Dialog.Header = DialogHeader;
Dialog.Actions = DialogActions;

export default Dialog;
