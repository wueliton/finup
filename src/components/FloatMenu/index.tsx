import { createPortal } from "react-dom";
import useFloatMenu from "./hooks/useFloatMenu";
import { floatMenuStyle } from "./styles";
import type { FloatMenuProps } from "./types";

function FloatMenu({
  isOpen,
  children,
  className,
  containerRef,
  fullContainerWidth,
}: FloatMenuProps) {
  const { floatContainerStyle, menuRef, isClosed } = useFloatMenu({
    isOpen,
    containerRef,
    fullContainerWidth,
  });
  const { container, content } = floatMenuStyle();

  if (isClosed) return null;

  return createPortal(
    <div className={container()}>
      <div
        ref={menuRef}
        className={content({ zoomIn: isOpen })}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        aria-modal={true}
        role="dialog"
        style={floatContainerStyle}
      >
        <div className={className}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}

export default FloatMenu;
