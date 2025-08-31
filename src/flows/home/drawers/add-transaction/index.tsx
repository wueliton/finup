import { Button, Chip } from "@components";
import Dialog from "components/Dialog";
import type { DialogComponentProps } from "components/Dialog/hooks/useCreateDialog/types";
import Autocomplete from "components/fields/Autocomplete";
import ButtonToggle from "components/fields/ButtonToggle";
import FormAutomcomplete from "components/form/FormAutocomplete";
import FormDatepicker from "components/form/FormDatepicker";
import FormInput from "components/form/FormInput";
import useAddTransaction from "./hooks/useAddTransaction";

function AddTransactionDialog({ onClose }: DialogComponentProps) {
  const { control, categoryList, paymentTypeList, onSubmit } =
    useAddTransaction();

  return (
    <>
      <Dialog.Header
        icon="GraphNewUp"
        title="Nova Transação"
        subtitle="Adicione um novo lançamento"
      />
      <Dialog.Body>
        <form
          onSubmit={onSubmit}
          id="add-transaction-form"
          className="gap-sm flex flex-col"
        >
          <ButtonToggle />
          <FormInput control={control} name="description" label="Descrição" />
          <div className="gap-sm flex">
            <FormInput
              control={control}
              name="value"
              label="Valor"
              mask="currency"
              textPrefix={<span className="text-black/60">R$</span>}
              maxLength={15}
              className="flex-1"
            />
            <FormDatepicker
              control={control}
              name="transactionAt"
              label="Data"
              className="flex-1"
            />
          </div>
          <FormAutomcomplete
            control={control}
            name="category"
            label="Categoria"
            data={categoryList}
            renderOption={(data, props) => (
              <Autocomplete.Option {...props}>{data.name}</Autocomplete.Option>
            )}
            renderSelectedOption={(option, { onRemove }) => (
              <Chip onRemove={onRemove} size="sm" canRemove>
                {option.name}
              </Chip>
            )}
          />
          <FormAutomcomplete
            control={control}
            name="paymentType"
            label="Meio de pagamento"
            data={paymentTypeList}
            renderOption={(data, props) => (
              <Autocomplete.Option {...props}>{data.name}</Autocomplete.Option>
            )}
            renderSelectedOption={(option, { onRemove }) => (
              <Chip onRemove={onRemove} size="sm" canRemove>
                {option.name}
              </Chip>
            )}
          />
        </form>
      </Dialog.Body>
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
