export class Buyer {
  private income: number;
  private credit: number;
  readonly price: number;

  constructor(income: number, credit: number, price: number) {
    this.income = income;
    this.credit = credit;
    this.price = price;
  }

  approve() {}
}
