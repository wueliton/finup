import FloatMenu from "components/FloatMenu";
import Input from "../Input";
import AutocompleteOption from "./components/Option";
import useAutocomplete from "./hooks/useAutocomplete";
import type { AutocompleteProps } from "./types";

function Autocomplete<Data extends object>({
  label,
  value,
  data,
  name,
  prefix,
  renderOption,
  renderSelectedOption,
  onChange,
  groupBy,
  renderGroup,
}: AutocompleteProps<Data>) {
  const {
    containerRef,
    selected,
    isOpen,
    hasSelected,
    groupedData,
    itemsRef,
    autocompleteId,
    handleRemoveSelected,
    handleClick,
    handleKeyDown,
    handleClickOption,
    checkIsActive,
    checkIsFocusedItem,
  } = useAutocomplete<Data>({
    data,
    value,
    onChange,
    groupBy,
  });
  const canRenderGroup = groupBy && renderGroup && groupedData;
  let absoluteIndex = 0;

  return (
    <div ref={containerRef}>
      <Input
        hideInput={hasSelected}
        textPrefix={
          selected ? (
            <div className="pt-xxs">
              {renderSelectedOption(selected, {
                onRemove: handleRemoveSelected,
              })}
            </div>
          ) : null
        }
        prefix={prefix}
        name={name}
        label={label}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      />
      <FloatMenu
        isOpen={isOpen}
        containerRef={containerRef}
        fullContainerWidth
        className="gap-xxs flex flex-col"
      >
        {canRenderGroup ? (
          Object.entries(groupedData).map(([key, value]) =>
            renderGroup?.(
              key,
              value.map((el) => {
                const index = absoluteIndex;
                absoluteIndex++;

                return renderOption(el, {
                  onClick: handleClickOption(el),
                  isActive: checkIsActive(el),
                  isFocused: checkIsFocusedItem(index),
                  key: `${autocompleteId}-option-${index}`,
                  ref: (el) => (itemsRef.current[absoluteIndex] = el),
                });
              }),
            ),
          )
        ) : (
          <>
            {data.map((el, index) =>
              renderOption(el, {
                onClick: handleClickOption(el),
                isActive: checkIsActive(el),
                isFocused: checkIsFocusedItem(index),
                key: `${autocompleteId}-option-${index}`,
                ref: (el) => (itemsRef.current[index] = el),
              }),
            )}
          </>
        )}
      </FloatMenu>
    </div>
  );
}

Autocomplete.Option = AutocompleteOption;

export default Autocomplete;
