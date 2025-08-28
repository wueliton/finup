import { forwardRef, useImperativeHandle } from "react";
import useSlideContent from "./hooks/useSlideContent";
import { slideContentStyles } from "./styles";
import type { SlideContentHandles, SlideContentProps } from "./types";

const SlideContent = (
  { onPageChange, render }: SlideContentProps,
  ref: React.Ref<SlideContentHandles>,
) => {
  const {
    isDragging,
    containerRef,
    containerStyle,
    prevPageStyle,
    pageStyle,
    nextPageStyle,
    handleMouseDown,
    imperativeHandle,
  } = useSlideContent({
    onPageChange,
  });
  const { container } = slideContentStyles({ isDragging });

  useImperativeHandle(ref, imperativeHandle);

  return (
    <div
      className={container()}
      onMouseDown={handleMouseDown}
      ref={containerRef}
    >
      <div
        className="relative block w-full transition-none select-none"
        style={containerStyle}
      >
        <div
          className="left-none top-none absolute w-full transition-none"
          style={prevPageStyle}
        >
          {render(-1)}
        </div>
        <div style={pageStyle}>{render(0)}</div>
        <div
          className="left-none top-none absolute w-full transition-none"
          style={nextPageStyle}
        >
          {render(1)}
        </div>
      </div>
    </div>
  );
};

export default forwardRef(SlideContent);
