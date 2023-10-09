"use strict";
class Mortgage {
    price;
    down;
    rate;
    term;
    loanAmount;
    numPayments;
    constructor(price, down, rate, term) {
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
    calculateMonthlyPayment() {
        const monthlyRate = this.rate / 1200;
        const power = Math.pow(1 + monthlyRate, this.numPayments);
        const payment = this.loanAmount * ((monthlyRate * power) / (power - 1));
        return payment.toFixed(2);
    }
    calculateTotalPayment() {
        return (Number(this.calculateMonthlyPayment()) * this.numPayments).toFixed(2);
    }
    calculateTotalInterest() {
        return (Number(this.calculateTotalPayment()) - this.price).toFixed(2);
    }
}
class Buyer {
    income;
    credit;
    price;
    constructor(income, credit, price) {
        this.income = income;
        this.credit = credit;
        this.price = price;
    }
    approve() { }
}
const submit = document.querySelector('.submit-button');
console.log(submit);
//const form: HTMLFormElement = document.querySelector('.calculation-form')!;
//typecasting
const form = document.querySelector('.calculation-form');
//console.log('form children', form.children);
//inputs
const price = document.querySelector('#price');
const down = document.querySelector('#down');
const rate = document.querySelector('#rate');
const term = document.querySelector('#term');
const monthlyPayment = document.querySelector('#monthly-payment');
const totalPayment = document.querySelector('#total-payment');
const totalInterest = document.querySelector('#total-interest');
const save = document.querySelector('#save-button');
const savedList = document.querySelector('.savedList');
form.addEventListener('submit', (e) => {
    //prevents page refresh
    e.preventDefault();
    const currentMortgage = new Mortgage(price.valueAsNumber, down.valueAsNumber, rate.valueAsNumber, term.valueAsNumber);
    monthlyPayment.innerHTML = `$${currentMortgage.calculateMonthlyPayment()}`;
    totalPayment.innerHTML = `$${currentMortgage.calculateTotalPayment()}`;
    totalInterest.innerHTML = `$${currentMortgage.calculateTotalInterest()}`;
});
save.addEventListener('click', (e) => {
    e.preventDefault();
    const currentMortgage = new Mortgage(price.valueAsNumber, down.valueAsNumber, rate.valueAsNumber, term.valueAsNumber);
    const result = document.createElement('li');
    const homePrice = `Home Price: $${currentMortgage.price} \n`;
    const loanAmount = `Loan Amount: $${currentMortgage.loanAmount} \n`;
    const interestRate = `Interest Rate: ${currentMortgage.rate}% \n`;
    const monthlyPayment = `Monthly Payment: $${currentMortgage.calculateMonthlyPayment()} \n`;
    const totalPayment = `Total Payment: $${currentMortgage.calculateTotalPayment()} \n`;
    const totalInterest = `Total Interest: $${currentMortgage.calculateTotalInterest()} \n`;
    result.append(homePrice, loanAmount, interestRate, monthlyPayment, totalPayment, totalInterest);
    savedList.append(result);
});
