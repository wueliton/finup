import type { PropsWithChildren } from "react";

function DialogBody({ children }: PropsWithChildren) {
  return <div className="flex-1">{children}</div>;
}

export default DialogBody;
