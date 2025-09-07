import { forwardRef } from "react";
import { createPortal } from "react-dom";
import useFloatMenu from "./hooks/useFloatMenu";
import { floatMenuStyle } from "./styles";
import type { FloatMenuProps } from "./types";

function FloatMenu(
  {
    isOpen,
    children,
    className,
    containerRef,
    fullContainerWidth,
    ...divProps
  }: FloatMenuProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { floatContainerStyle, menuRef, isClosed } = useFloatMenu({
    isOpen,
    containerRef,
    fullContainerWidth,
  });
  const { container, content } = floatMenuStyle();

  if (isClosed) return null;

  return createPortal(
    <div {...divProps} className={container()} ref={ref}>
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

export default forwardRef(FloatMenu);
