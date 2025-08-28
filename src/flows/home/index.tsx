import { Button } from "@components";
import useDialog from "components/Dialog/hooks/useDialog";
import Icon from "components/Icon";
import Menu from "components/Menu";
import DialogLayout from "layout/dialog";
import { memo } from "react";
import { Outlet } from "react-router";

function Home() {
  const { open } = useDialog();

  function handleAdd() {
    open("add-transaction");
  }

  return (
    <div className="flex h-full w-full">
      <div className="p-md gap-md flex h-full flex-col items-center">
        <p>F</p>

        <Menu key="aside">
          <Menu.Button
            key="dashboard"
            icon="Widget"
            title="Dashboard"
            to={""}
          />
          <Menu.Button
            key="wallet"
            icon="Wallet"
            title="Carteira"
            to={"wallet"}
          />
          <Menu.Button
            key="settings"
            icon="Settings"
            title="Configurações"
            to={"settings"}
          />
        </Menu>
        <div className="mt-auto"></div>
      </div>
      <main className="pr-md flex w-full flex-col">
        <div className="py-md flex justify-end">
          <Button aria-label="Adicionar entrada" onClick={handleAdd}>
            <Icon name="AddCircle" size={16} /> Adicionar
          </Button>
        </div>
        <div className="p-md w-full rounded-md bg-white">
          <Outlet context={location} />
        </div>
      </main>
      <DialogLayout />
    </div>
  );
}

export default memo(Home);
