import { Button } from "@components";
import { Input } from "components/fields";
import useLogin from "controllers/login";

function LoginUsername() {
  const { handleLogin } = useLogin();

  return (
    <div className="gap-sm flex flex-col">
      <h2 className="text-2xl">Login</h2>
      <Input label="E-mail" />
      <Input label="Senha" type="password" />
      <Button onClick={handleLogin}>Entrar</Button>
    </div>
  );
}
export default LoginUsername;
