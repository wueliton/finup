import { Outlet } from "react-router";

function Login() {
  return (
    <div className="flex min-h-dvh min-w-dvw items-center justify-center">
      <div className="p-md min-w-5xl rounded-xs shadow-2xl">
        <Outlet />
      </div>
    </div>
  );
}
export default Login;
