export class Mortgage {
    constructor(price, down, rate, term) {
        this.price = price;
        this.down = down;
        this.rate = rate;
        this.term = term;
        this.loanAmount = this.price - this.price * (this.down / 100);
        this.numPayments = this.term * 12;
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
