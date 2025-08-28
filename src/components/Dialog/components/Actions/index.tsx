import type { PropsWithChildren } from "react";

function DialogActions({ children }: PropsWithChildren) {
  return <div className="gap-xs flex justify-end">{children}</div>;
}

export default DialogActions;
