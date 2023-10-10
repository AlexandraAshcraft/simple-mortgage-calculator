import { Mortgage } from './classes/Mortgage.js';
//downside of importing/exporting, we are not bundling our files here, so the browser makes separate requests to the network for these files. if you use webpack or vite it will bundle the code into a single file so there will only be one network request
const submit = document.querySelector('.submit-button');
//typecasting
const calculatorForm = document.querySelector('.calculation-form');
//
//inputs
// const price = document.querySelector('#price') as HTMLInputElement;
// const down = document.querySelector('#down') as HTMLInputElement;
// const rate = document.querySelector('#rate') as HTMLInputElement;
// const term = document.querySelector('#term') as HTMLInputElement;
//query select output locations
const monthlyPayment = document.querySelector('#monthly-payment');
const totalPayment = document.querySelector('#total-payment');
const totalInterest = document.querySelector('#total-interest');
const save = document.querySelector('#save-button');
const savedList = document.querySelector('.savedList');
const handleFormData = () => {
    const data = new FormData(calculatorForm, submit);
    const entries = [...data.entries()];
    //utility type Record constructs an object type whose property keys are keys and whose property values are values.  this can be used to map the properties of a type to another type
    const submitted = {};
    entries.forEach((entry) => {
        submitted[entry[0]] = Number(entry[1]);
    });
    const currentMortgage = new Mortgage(submitted['price'], submitted['down'], submitted['rate'], submitted['term']);
    return currentMortgage;
};
calculatorForm.addEventListener('submit', (e) => {
    //prevents page refresh
    e.preventDefault();
    const currentMortgage = handleFormData();
    console.log('currentMortgage', currentMortgage);
    monthlyPayment.innerHTML = `$${currentMortgage.calculateMonthlyPayment()}`;
    totalPayment.innerHTML = `$${currentMortgage.calculateTotalPayment()}`;
    totalInterest.innerHTML = `$${currentMortgage.calculateTotalInterest()}`;
});
//saves calculated data into a bullet point
save.addEventListener('click', (e) => {
    e.preventDefault();
    //create new mortgage instance
    const currentMortgage = handleFormData();
    const resultList = document.createElement('ul');
    const result = document.createElement('li');
    const homePrice = document.createElement('li');
    homePrice.innerHTML = `Home Price: $${currentMortgage.price}`;
    const loanAmount = document.createElement('li');
    loanAmount.innerHTML = `Loan Amount: $${currentMortgage.loanAmount}`;
    const interestRate = document.createElement('li');
    interestRate.innerHTML = `Interest Rate: ${currentMortgage.rate}%`;
    const monthlyPayment = document.createElement('li');
    monthlyPayment.innerHTML = `Monthly Payment: $${currentMortgage.calculateMonthlyPayment()}`;
    const totalPayment = document.createElement('li');
    totalPayment.innerHTML = `Total Payment: $${currentMortgage.calculateTotalPayment()}`;
    const totalInterest = document.createElement('li');
    totalInterest.innerHTML = `Total Interest: $${currentMortgage.calculateTotalInterest()} \n`;
    resultList.append(homePrice, loanAmount, interestRate, monthlyPayment, totalPayment, totalInterest);
    result.append(resultList);
    savedList.append(result);
});
class Property {
    constructor(type, price) {
        this.type = type;
        this.price = price;
    }
}
const apiForm = document.querySelector('.listing-search');
const apiButton = document.querySelector('.search-button');
apiForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(apiForm, apiButton);
    const entries = [...data.entries()];
    const options = {};
    console.log(entries);
    entries.forEach((entry) => {
        if (entry[0] === 'zipcode') {
            options['zipcode'];
            entry[1];
        }
        ;
    });
});
// const fetchFromAPI = async (zipCode: number) => {
//   const controller = new AbortController();
//   try {
//     const response = await fetch(
//       'https://realty-mole-property-api.p.rapidapi.com/saleListings',
//       {
//         method: 'GET',
//         headers: {
//           'X-RapidAPI-Key':
//             'b8a7f4d740msh6f868ffc4f45dfdp1e6998jsn60afddc504b4',
//             'X-RapidAPI-Host': 'realty-mole-property-api.p.rapidapi.com'
//         },
//       },
//     );
//   } catch (error) {}
// };
//apiButton.addEventListener('click', fetchFromAPI);
