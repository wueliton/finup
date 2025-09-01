import { Button, Chip } from "@components";
import Dialog from "components/Dialog";
import type { DialogComponentProps } from "components/Dialog/hooks/useCreateDialog/types";
import Autocomplete from "components/fields/Autocomplete";
import ButtonToggle from "components/fields/ButtonToggleGroup/components/ButtonToggle";
import Datepicker from "components/fields/Datepicker";
import Toggle from "components/fields/Toggle";
import FormAutomcomplete from "components/form/FormAutocomplete";
import FormButtonToggleGroup from "components/form/FormButtonToggleGroup";
import FormDatepicker from "components/form/FormDatepicker";
import FormInput from "components/form/FormInput";
import Icon from "components/Icon";
import useAddTransaction from "./hooks/useAddTransaction";

function AddTransactionDialog({ onClose }: DialogComponentProps) {
  const { control, categoryList, isExpense, paymentTypeList, onSubmit } =
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
          <FormButtonToggleGroup
            ariaLabel="Tipo de lançamento"
            control={control}
            name="type"
          >
            <ButtonToggle value="expense">Despesa</ButtonToggle>
            <ButtonToggle value="income">Receita</ButtonToggle>
          </FormButtonToggleGroup>
          <FormInput
            control={control}
            name="description"
            label="Descrição"
            prefix={<Icon name="PenNewSquare" />}
          />
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
            prefix={<Icon name="FolderWithFiles" />}
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
            prefix={<Icon name="Wallet" />}
            renderOption={(data, props) => (
              <Autocomplete.Option {...props}>{data.name}</Autocomplete.Option>
            )}
            renderSelectedOption={(option, { onRemove }) => (
              <Chip onRemove={onRemove} size="sm" canRemove>
                {option.name}
              </Chip>
            )}
          />
          <Toggle name="installments">Compra parcelada</Toggle>
          {isExpense ? (
            <div className="gap-sm grid grid-cols-2">
              <FormInput
                name="installments"
                label="Parcelas"
                prefix={<Icon name="Bill" />}
                mask="number"
              />
              <Datepicker name="payment" label="Data Primeiro pagamento" />
            </div>
          ) : null}
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
