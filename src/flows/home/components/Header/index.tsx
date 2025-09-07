import { Button } from "@components";
import useDialog from "components/Dialog/hooks/useDialog";
import Icon from "components/Icon";
import { memo } from "react";

function Header() {
  const { open } = useDialog();

  function handleAdd() {
    open("add-transaction");
  }

  return (
    <div className="my-md flex justify-end">
      <Button aria-label="Adicionar entrada" onClick={handleAdd}>
        <Icon name="AddCircle" size={16} /> Adicionar
      </Button>
    </div>
  );
}

export default memo(Header);
