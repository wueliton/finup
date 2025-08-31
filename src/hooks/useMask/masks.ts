class Masks {
  static number(value: string) {
    return Number(value.replace(/\D/g, ""));
  }

  static float(value: string) {
    const number = this.number(value);
    const toFloat = number / 100;

    return toFloat;
  }

  static currency(value: string | number) {
    const valueToString = Number(value).toFixed(2);
    const numbers = this.float(valueToString);
    const formatted = numbers.toLocaleString("pt-BR", {
      style: "decimal",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });

    return formatted;
  }
}

export default Masks;
