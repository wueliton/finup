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
    <div className="flex h-full w-full flex-col-reverse lg:flex-row">
      <div className="lg:p-md gap-md bottom-none sticky flex h-[5.4rem] shrink-0 items-center max-lg:justify-center max-lg:bg-white max-lg:shadow-sm lg:h-auto lg:flex-col">
        <p className="hidden lg:block">F</p>

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
      <main className="px-sm lg:pr-md flex h-full w-full flex-auto flex-col">
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
