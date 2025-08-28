import Icon from "components/Icon";
import type { DialogHeaderProps } from "./types";

function DialogHeader({ icon, title, subtitle }: DialogHeaderProps) {
  return (
    <div className="gap-xs flex items-center">
      {icon ? <Icon name={icon} /> : null}
      <div className="gap-xxs flex flex-1 flex-col">
        <h3 className="text-md" id="modal-title">
          {title}
        </h3>
        <p className="text-xs text-black/60">{subtitle}</p>
      </div>
    </div>
  );
}

export default DialogHeader;
