import Menu from "components/Menu";

function Aside() {
  return (
    <div className="lg:p-md gap-md bottom-none sticky z-10 flex h-[5.4rem] shrink-0 items-center max-lg:justify-center max-lg:bg-white max-lg:shadow-sm lg:h-auto lg:flex-col">
      <p className="hidden lg:block">F</p>

      <Menu key="aside">
        <Menu.Button key="dashboard" icon="Widget" title="Dashboard" to={""} />
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
  );
}

export default Aside;
