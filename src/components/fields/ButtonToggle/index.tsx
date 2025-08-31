import Button from "components/Button";

function ButtonToggle() {
  return (
    <div className="p-xxs flex w-full rounded-sm bg-gray-200">
      <Button variant="secondary" type="button" className="flex-1" size="sm">
        Despesa
      </Button>
      <Button variant="ghost" type="button" className="flex-1" size="sm">
        Entrada
      </Button>
    </div>
  );
}

export default ButtonToggle;
