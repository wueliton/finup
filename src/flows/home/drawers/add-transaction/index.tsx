import { Button } from "@components";
import Dialog from "components/Dialog";
import type { DialogComponentProps } from "components/Dialog/hooks/useCreateDialog/types";
import FormInput from "components/form/FormInput";
import useAddTransaction from "./hooks/useAddTransaction";

function AddTransactionDialog({ onClose }: DialogComponentProps) {
  const { control, onSubmit } = useAddTransaction();

  return (
    <>
      <Dialog.Header
        icon="GraphNewUp"
        title="Nova Transação"
        subtitle="Adicione um novo lançamento"
      />
      <form
        onSubmit={onSubmit}
        id="add-transaction-form"
        className="gap-sm flex flex-col"
      >
        <FormInput control={control} name="description" label="Descrição" />
        <FormInput
          control={control}
          name="value"
          label="Valor"
          mask="currency"
          textPrefix={<span className="text-black/60">R$</span>}
          maxLength={15}
        />
      </form>
      <Dialog.Actions>
        <Button onClick={onClose} variant="secondary">
          Cancelar
        </Button>
        <Button form="add-transaction-form" type="submit">
          Salvar
        </Button>
      </Dialog.Actions>
    </>
  );
}

export default AddTransactionDialog;
