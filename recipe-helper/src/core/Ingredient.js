class Ingredient {
  constructor(name, amount, unit) {
    this.name = name;
    this.amount = amount;
    this.unit = unit;

    this.multiplyBy = this.multiplyBy.bind(this);
  }

  multiplyBy(scale) {
    var newAmount = this.amount.multiply(scale);
    return new Ingredient(this.name,
                          newAmount,
                          this.unit);
  }
}

export default Ingredient;