import { KeyboardNavigateKeysEnum } from "./constants";
import type { UseKeyboardNavigateProps } from "./types";

function useKeyboardNavigate({
  deltaX,
  deltaY,
  onSelect,
  onFocusChange,
}: UseKeyboardNavigateProps) {
  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const key = event.key as KeyboardNavigateKeysEnum;
    const acceptKeys = Object.values(KeyboardNavigateKeysEnum).includes(key);
    const ignoreEvent = !acceptKeys;
    const selectEvent =
      key === KeyboardNavigateKeysEnum.SPACE ||
      key === KeyboardNavigateKeysEnum.ENTER;

    if (ignoreEvent) return;

    event.preventDefault();
    event.stopPropagation();

    if (selectEvent) {
      onSelect?.();
      return;
    }

    const delta = [
      KeyboardNavigateKeysEnum.ARROW_LEFT,
      KeyboardNavigateKeysEnum.ARROW_RIGHT,
    ].includes(key)
      ? deltaX
      : deltaY;
    const operator = [
      KeyboardNavigateKeysEnum.ARROW_LEFT,
      KeyboardNavigateKeysEnum.ARROW_UP,
    ].includes(key)
      ? -1
      : 1;
    onFocusChange(delta * operator);
  }

  return {
    handleKeyDown,
  };
}

export default useKeyboardNavigate;
