import DialogLayout from "layout/dialog";
import { memo } from "react";
import { Outlet } from "react-router";
import Aside from "./components/Aside";
import Header from "./components/Header";

function Home() {
  return (
    <div className="flex h-full w-full flex-col-reverse lg:flex-row">
      <Aside />
      <main className="px-sm pb-md lg:pr-md flex h-full w-full flex-auto flex-col">
        <Header />
        <div className="p-sm md:p-md w-full rounded-md bg-white">
          <Outlet context={location} />
        </div>
      </main>
      <DialogLayout />
    </div>
  );
}

export default memo(Home);
