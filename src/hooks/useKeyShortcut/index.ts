import { useEffect, useRef } from "react";
import type { AddKeysProps } from "./types";

function useKeyShortcut<T extends HTMLElement | null>(target?: T) {
  const listenersRef = useRef<AddKeysProps[]>([]);
  const targetEl = target || document;

  function addKey(listener: AddKeysProps) {
    const hasExistingKey = listenersRef.current
      .map(({ key }) => key)
      .includes(listener.key);

    if (hasExistingKey) return;

    listenersRef.current = [...listenersRef.current, listener];
  }

  function removeKey(key: string) {
    listenersRef.current = listenersRef.current.filter(
      (shortcut) => shortcut.key !== key,
    );
  }

  function handleKeyPress(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    const key = keyboardEvent.key;
    const shortcutKey = listenersRef.current.find(
      (shortcut) => shortcut.key === key,
    );
    const emptyShortcut = !shortcutKey;

    if (emptyShortcut) return;

    shortcutKey.callback(keyboardEvent);
  }

  useEffect(() => {
    targetEl.addEventListener("keydown", handleKeyPress);

    return () => targetEl.removeEventListener("keydown", handleKeyPress);
  }, [targetEl]);

  return {
    addKey,
    removeKey,
  };
}

export default useKeyShortcut;
