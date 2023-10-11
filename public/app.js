"use strict";
// import { Mortgage } from './classes/Mortgage.js';
// import { APIData } from './interfaces/interfaces.js';
// import { Property } from './classes/Property.js';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Property {
    constructor(county, propertyType, bedrooms, bathrooms, squareFootage, lotSize, yearBuilt, price, listedDate, addressLine1, city, state, zipCode, formattedAddress, lastSeen, createdDate, status, removedDate, daysOnMarket, id, latitude, longitude) {
        this.county = county;
        this.propertyType = propertyType;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.squareFootage = squareFootage;
        this.lotSize = lotSize;
        this.yearBuilt = yearBuilt;
        this.price = price;
        this.listedDate = listedDate;
        this.addressLine1 = addressLine1;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.formattedAddress = formattedAddress;
        this.lastSeen = lastSeen;
        this.createdDate = createdDate;
        this.status = status;
        this.removedDate = null;
        this.daysOnMarket = daysOnMarket;
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
class Mortgage {
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
const submit = document.querySelector('.submit-button');
//typecasting
const calculatorForm = document.querySelector('.calculation-form');
//
//query select output locations
const monthlyPayment = document.querySelector('#monthly-payment');
const totalPayment = document.querySelector('#total-payment');
const totalInterest = document.querySelector('#total-interest');
const save = document.querySelector('#save-button');
const savedList = document.querySelector('.savedList');
//adding event listener to handle form submission for calculator
calculatorForm.addEventListener('submit', (e) => {
    //prevents page refresh
    e.preventDefault();
    const data = new FormData(calculatorForm, submit);
    const price = data.get('price');
    const down = data.get('down');
    const rate = data.get('rate');
    const term = data.get('term');
    const currentMortgage = new Mortgage(price, down, rate, term);
    console.log(currentMortgage);
    monthlyPayment.innerHTML = `$${currentMortgage.calculateMonthlyPayment()}`;
    totalPayment.innerHTML = `$${currentMortgage.calculateTotalPayment()}`;
    totalInterest.innerHTML = `$${currentMortgage.calculateTotalInterest()}`;
    return false;
});
//saves calculated data into a bullet point
save.addEventListener('click', (e) => {
    e.preventDefault();
    const data = new FormData(calculatorForm, submit);
    const price = data.get('price');
    const down = data.get('down');
    const rate = data.get('rate');
    const term = data.get('term');
    const currentMortgage = new Mortgage(price, down, rate, term);
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
    return false;
});
//query select form and button items
const apiForm = document.querySelector('.listing-search');
const apiButton = document.querySelector('.search-button');
//add event listener to api form
apiForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(apiForm, apiButton);
    const minPrice = data.get('minPrice');
    const maxPrice = data.get('maxPrice');
    const zipCode = data.get('zipCode');
    const propertyTypes = [...data.keys()].filter(el => el !== 'zipCode' && el !== 'minPrice' && el !== 'maxPrice');
    const paramsString = makeParamsString(zipCode, propertyTypes);
    if (Array.isArray(paramsString)) {
        paramsString.forEach(string => {
            const data = fetchData(string, minPrice, maxPrice);
        });
    }
    else {
        const data = fetchData(paramsString, minPrice, maxPrice);
    }
});
//use form data to make query string for API fetch
const makeParamsString = (zipCode, propertyTypes) => {
    if (!propertyTypes) {
        const paramsString = new URLSearchParams({ zipCode: zipCode });
        return paramsString.toString();
    }
    if (propertyTypes && propertyTypes.length === 1) {
        const paramsString = new URLSearchParams({
            zipCode: zipCode,
            propertyType: propertyTypes[0],
        });
        return paramsString.toString();
    }
    else {
        const urls = [];
        propertyTypes.forEach(type => {
            const paramsString = new URLSearchParams({
                zipCode: zipCode,
                propertyType: type,
            }).toString();
            urls.push(paramsString);
        });
        return urls;
    }
};
//parse data into a list item
const makeListItem = (obj) => {
    const allProperties = document.querySelector('.apiSearchResults');
    const propertyListItem = document.createElement('li');
    const propertyList = document.createElement('ul');
    const headingLI = document.createElement('h3');
    headingLI.innerHTML = 'Listing:';
    const formattedAddressLI = document.createElement('li');
    formattedAddressLI.innerHTML =
        `Address: ${obj.formattedAddress}`;
    const priceLI = document.createElement('li');
    priceLI.innerHTML = `Price: ${obj.price}`;
    const propertyTypeLI = document.createElement('li');
    propertyTypeLI.innerHTML =
        `Property Type: ${obj.propertyType}`;
    const bedroomsLI = document.createElement('li');
    bedroomsLI.innerHTML = `Bedrooms: ${obj.bedrooms}`;
    const bathroomsLI = document.createElement('li');
    bathroomsLI.innerHTML = `Bathrooms: ${obj.bathrooms}`;
    const squareFootageLI = document.createElement('li');
    squareFootageLI.innerHTML =
        `Square Footage: ${obj.squareFootage}sq ft`;
    const lotSizeLI = document.createElement('li');
    lotSizeLI.innerHTML = `Lot Size: ${obj.lotSize}sq ft`;
    const yearBuiltLI = document.createElement('li');
    yearBuiltLI.innerHTML = `Year Built: ${obj.yearBuilt}`;
    const listedDateLI = document.createElement('li');
    listedDateLI.innerHTML = `Date Listed: ${obj.listedDate.slice(0, 10)}`;
    const daysOnMarketLI = document.createElement('li');
    daysOnMarketLI.innerHTML =
        `Days on Market: ${obj.daysOnMarket}`;
    propertyListItem.append(headingLI, formattedAddressLI, priceLI, propertyTypeLI, bedroomsLI, bathroomsLI, squareFootageLI, lotSizeLI, yearBuiltLI, listedDateLI, daysOnMarketLI);
    allProperties.append(propertyListItem);
};
//fetch data
function fetchData(query, minPrice, maxPrice) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = 'https://realty-mole-property-api.p.rapidapi.com/saleListings?' + query;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'b8a7f4d740msh6f868ffc4f45dfdp1e6998jsn60afddc504b4',
                    'X-RapidAPI-Host': 'realty-mole-property-api.p.rapidapi.com',
                },
            };
            const res = yield fetch(url, options);
            if (!res.ok)
                throw new Error('Error fetching data');
            const data = yield res.json();
            (yield data).forEach(listing => {
                const price = listing.price;
                if (minPrice <= price && price <= maxPrice) {
                    const newProperty = new Property(listing.county, listing.propertyType, listing.bedrooms, listing.bathrooms, listing.squareFootage, listing.lotSize, listing.yearBuilt, listing.price, listing.listedDate, listing.addressLine1, listing.city, listing.state, listing.zipCode, listing.formattedAddress, listing.lastSeen, listing.createdDate, listing.status, listing.removedDate, listing.daysOnMarket, listing.id, listing.latitude, listing.longitude);
                    makeListItem(newProperty);
                }
            });
        }
        catch (error) {
            console.log('Error!', error);
        }
    });
}
