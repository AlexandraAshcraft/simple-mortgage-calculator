export class Mortgage {
  price: number;
  down: number;
  rate: number;
  term: number;
  loanAmount: number;
  numPayments: number;

  constructor(price: number, down: number, rate: number, term: number) {
    this.price = price;
    this.down = down;
    this.rate = rate;
    this.term = term;
    this.loanAmount = this.price - this.price * (this.down / 100);
    this.numPayments = this.term * 12;
  }

  calculateMonthlyPayment(): string {
    const monthlyRate = this.rate / 1200;
    const power = Math.pow(1 + monthlyRate, this.numPayments);
    const payment = this.loanAmount * ((monthlyRate * power) / (power - 1));
    return payment.toFixed(2);
  }
  calculateTotalPayment(): string {
    return (Number(this.calculateMonthlyPayment()) * this.numPayments).toFixed(
      2,
    );
  }
  calculateTotalInterest(): string {
    return (Number(this.calculateTotalPayment()) - this.price).toFixed(2);
  }
}
