class Masks {
  static number(value: string) {
    return Number(value.replace(/\D/g, ""));
  }

  static float(value: string) {
    const onlyNumbers = this.number(value);
    return parseInt(String(onlyNumbers), 10) / 100;
  }

  static currency(value: string | number) {
    const numbers = this.float(String(value));
    const formatted = numbers.toLocaleString("pt-BR", {
      style: "decimal",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });

    return formatted;
  }
}

export default Masks;
