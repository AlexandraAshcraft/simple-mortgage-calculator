class Mortgage {
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

  format() {
    return `${this.price} at ${this.rate} for ${this.term}`;
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

class Buyer {
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

const submit: HTMLButtonElement = document.querySelector('.submit-button')!;

console.log(submit);

//const form: HTMLFormElement = document.querySelector('.calculation-form')!;
//typecasting
const form = document.querySelector('.calculation-form') as HTMLFormElement;

//console.log('form children', form.children);

//inputs
const price = document.querySelector('#price') as HTMLInputElement;
const down = document.querySelector('#down') as HTMLInputElement;
const rate = document.querySelector('#rate') as HTMLInputElement;
const term = document.querySelector('#term') as HTMLInputElement;
const monthlyPayment = document.querySelector(
  '#monthly-payment',
) as HTMLParagraphElement;
const totalPayment: HTMLParagraphElement =
  document.querySelector('#total-payment')!;
const totalInterest = document.querySelector(
  '#total-interest',
) as HTMLParagraphElement;
const save = document.querySelector('#save-button') as HTMLButtonElement;
const savedList = document.querySelector('.savedList') as HTMLUListElement;

form.addEventListener('submit', (e: Event) => {
  //prevents page refresh
  e.preventDefault();
  const currentMortgage = new Mortgage(
    price.valueAsNumber,
    down.valueAsNumber,
    rate.valueAsNumber,
    term.valueAsNumber,
  );
  monthlyPayment.innerHTML = `$${currentMortgage.calculateMonthlyPayment()}`;
  totalPayment.innerHTML = `$${currentMortgage.calculateTotalPayment()}`;
  totalInterest.innerHTML = `$${currentMortgage.calculateTotalInterest()}`;
});

save.addEventListener('click', (e: Event) => {
    e.preventDefault();

    const currentMortgage = new Mortgage(
        price.valueAsNumber,
        down.valueAsNumber,
        rate.valueAsNumber,
        term.valueAsNumber,
      );
  const result = document.createElement('li') as HTMLLIElement;
  const homePrice: string = `Home Price: $${currentMortgage.price} \n`;
  const loanAmount: string = `Loan Amount: $${currentMortgage.loanAmount} \n`
  const interestRate: string = `Interest Rate: ${currentMortgage.rate}% \n`
  const monthlyPayment: string = `Monthly Payment: $${currentMortgage.calculateMonthlyPayment()} \n`
  const totalPayment: string = `Total Payment: $${currentMortgage.calculateTotalPayment()} \n`
  const totalInterest: string = `Total Interest: $${currentMortgage.calculateTotalInterest()} \n`
  result.append(homePrice, loanAmount, interestRate, monthlyPayment, totalPayment, totalInterest);
  savedList.append(result)
});
