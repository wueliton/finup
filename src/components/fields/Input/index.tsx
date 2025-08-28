import useMask from "hooks/useMask";
import Masks from "hooks/useMask/masks";
import { forwardRef, useId, useRef } from "react";
import FieldError from "../FieldError";
import FieldHint from "../FieldHint";
import { inputStyles } from "./styles";
import type { InputProps } from "./types";

function Input(
  {
    prefix,
    textPrefix,
    suffix,
    label,
    hint,
    mask,
    hideInput,
    error,
    ...inputProps
  }: InputProps,
  ref: React.Ref<HTMLInputElement>,
) {
  const { container, content, input, labelContainer } = inputStyles();
  const { value, isNumber, inputMode, onChange } = useMask(
    mask,
    inputProps.value,
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const hintId = `${id}-hint`;
  const inputId = `${id}-input`;
  const hasTextPrefix = Boolean(textPrefix);
  const showHint = hint && !error;

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event);

    const value = event.target.value;
    const parsedValue = isNumber && !value ? undefined : value;
    const formattedValue =
      isNumber && parsedValue ? Masks.float(parsedValue) : parsedValue;

    inputProps.onChange?.({
      target: {
        value: formattedValue,
      },
    });
  }

  function addInputRef(node: HTMLInputElement | null) {
    inputRef.current = node;

    if (!ref) return;

    if (typeof ref === "function") {
      ref(node);
      return;
    }

    ref.current = node;
  }

  function handleOnClick() {
    inputRef.current?.focus();
    inputRef.current?.click();
  }

  return (
    <div className="gap-xs flex flex-col" onClick={handleOnClick}>
      <div className={container()}>
        {prefix}
        <div className={content()}>
          {textPrefix}
          <input
            {...inputProps}
            className={input({
              className: inputProps.className,
              hidden: hideInput,
            })}
            placeholder={inputProps.placeholder ?? ""}
            aria-readonly={inputProps.readOnly}
            aria-required={inputProps.required}
            aria-disabled={inputProps.disabled}
            aria-invalid={false}
            aria-describedby={hintId}
            id={inputId}
            data-textprefix={hasTextPrefix}
            onChange={handleOnChange}
            ref={addInputRef}
            value={value}
            inputMode={inputMode}
          />
          <label htmlFor={inputId} className={labelContainer()}>
            {label}
          </label>
        </div>
        {suffix}
      </div>
      {showHint ? <FieldHint id={`${id}-hint`}>{hint}</FieldHint> : null}
      {error ? <FieldError id={`${id}-error`}>{error}</FieldError> : null}
    </div>
  );
}

export default forwardRef(Input);
