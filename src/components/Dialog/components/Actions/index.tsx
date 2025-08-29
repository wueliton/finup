import type { PropsWithChildren } from "react";

function DialogActions({ children }: PropsWithChildren) {
  return (
    <div className="gap-xs bottom-none sticky flex flex-col-reverse lg:flex-row lg:justify-end">
      {children}
    </div>
  );
}

export default DialogActions;
