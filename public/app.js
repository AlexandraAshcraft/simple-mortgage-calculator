var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Mortgage } from './classes/Mortgage.js';
import { Property } from './classes/Property.js';
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
// const handleFormData = () => {
//   const data = new FormData(calculatorForm, submit);
//   const price = data.get('price') as unknown as number;
//   const down = data.get('down') as unknown as number;
//   const rate = data.get('rate') as unknown as number;
//   const term = data.get('term') as unknown as number;
//   const entries: [string, FormDataEntryValue][] = [...data.entries()];
//   // utility type Record constructs an object type whose property keys are keys and whose property values are values.  this can be used to map the properties of a type to another type
//   const submitted: Record<string, number> = {};
//   entries.forEach((entry: [string, FormDataEntryValue]) => {
//     submitted[entry[0]] = Number(entry[1]);
//   });
//   const currentMortgage = new Mortgage(price, down, rate, term);
//   return currentMortgage;
// };
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
const apiForm = document.querySelector('.listing-search');
const apiButton = document.querySelector('.search-button');
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
            const data = fetchData(string);
            if (data !== undefined) {
                data.forEach(listing => {
                    if (minPrice <= listing.price && listing.price <= maxPrice) {
                        const newProperty = new Property(listing.county, listing.propertyType, listing.bedrooms, listing.bathrooms, listing.squareFootage, listing.lotSize, listing.yearBuilt, listing.price, listing.listedDate, listing.addressLine1, listing.city, listing.state, listing.zipCode, listing.formattedAddress, listing.lastSeen, listing.createdDate, listing.status, listing.removedDate, listing.daysOnMarket, listing.id, listing.latitude, listing.longitude);
                        makeListItem(newProperty);
                    }
                });
            }
        });
    }
    else {
        const data = fetchData(paramsString);
        if (data !== undefined) {
            data.forEach(listing => {
                if (minPrice <= listing.price && listing.price <= maxPrice) {
                    const newProperty = new Property(listing.county, listing.propertyType, listing.bedrooms, listing.bathrooms, listing.squareFootage, listing.lotSize, listing.yearBuilt, listing.price, listing.listedDate, listing.addressLine1, listing.city, listing.state, listing.zipCode, listing.formattedAddress, listing.lastSeen, listing.createdDate, listing.status, listing.removedDate, listing.daysOnMarket, listing.id, listing.latitude, listing.longitude);
                    makeListItem(newProperty);
                }
            });
        }
    }
});
const parseResults = (arr, minPrice, maxPrice) => {
    arr.forEach(listing => {
        const price = listing.price;
        if (minPrice <= price && price <= maxPrice) {
            const newProperty = new Property(listing.county, listing.propertyType, listing.bedrooms, listing.bathrooms, listing.squareFootage, listing.lotSize, listing.yearBuilt, listing.price, listing.listedDate, listing.addressLine1, listing.city, listing.state, listing.zipCode, listing.formattedAddress, listing.lastSeen, listing.createdDate, listing.status, listing.removedDate, listing.daysOnMarket, listing.id, listing.latitude, listing.longitude);
            makeListItem(newProperty);
        }
    });
};
const makeListItem = (obj) => {
    const allProperties = document.querySelector('.apiSearchResults');
    const propertyListItem = document.createElement('li');
    const propertyList = document.createElement('ul');
    const countyLI = document.createElement('li');
    countyLI.innerHTML = obj.county;
    const propertyTypeLI = document.createElement('li');
    propertyTypeLI.innerHTML = obj.propertyType;
    const bedroomsLI = document.createElement('li');
    countyLI.innerHTML = obj.bedrooms;
    const bathroomsLI = document.createElement('li');
    bathroomsLI.innerHTML = obj.bathrooms;
    const squareFootageLI = document.createElement('li');
    squareFootageLI.innerHTML = obj.squareFootage;
    const lotSizeLI = document.createElement('li');
    lotSizeLI.innerHTML = obj.lotSize;
    const yearBuiltLI = document.createElement('li');
    yearBuiltLI.innerHTML = obj.yearBuilt;
    const priceLI = document.createElement('li');
    priceLI.innerHTML = obj.price;
    const listedDateLI = document.createElement('li');
    listedDateLI.innerHTML = obj.listedDate;
    const addressLine1LI = document.createElement('li');
    addressLine1LI.innerHTML = obj.addressLine1;
    const cityLI = document.createElement('li');
    cityLI.innerHTML = obj.city;
    const stateLI = document.createElement('li');
    stateLI.innerHTML = obj.state;
    const zipCodeLI = document.createElement('li');
    zipCodeLI.innerHTML = obj.zipCode;
    const formattedAddressLI = document.createElement('li');
    formattedAddressLI.innerHTML =
        obj.formattedAddress;
    const statusLI = document.createElement('li');
    statusLI.innerHTML = obj.status;
    const daysOnMarketLI = document.createElement('li');
    daysOnMarketLI.innerHTML = obj.daysOnMarket;
    propertyListItem.append(countyLI, propertyTypeLI, bedroomsLI, bathroomsLI, squareFootageLI, lotSizeLI, yearBuiltLI, priceLI, listedDateLI, addressLine1LI, cityLI, stateLI, zipCodeLI, formattedAddressLI, statusLI, daysOnMarketLI);
    allProperties.append(propertyListItem);
};
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
function fetchData(query) {
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
            return data;
        }
        catch (error) {
            console.log('Error!', error);
            return;
        }
    });
}
const mathAdd = (num1, num2) => (num1 += num2);
const mathSubtract = (num1, num2) => (num1 -= num2);
const giraffe = {
    kind: 'giraffe',
    mammal: true,
};
class Cat {
    meow() {
        console.log('hi meow');
    }
    litter() {
        return 'in the garage';
    }
    constructor(name, age, myFunc) {
        this.species = 'cat';
        this.name = name;
        this.age = age;
        this.claw = () => myFunc(this.name, this.age);
    }
}
let b = [1, 2, 3];
//pet is cat is boolean
//type guards
function petIsCat(pet) {
    return pet.species === 'cat';
}
const years = (a, b) => {
    return `I have had ${a} for ${b} years`;
};
const p = new Cat('socks', 2, years);
if (petIsCat(p))
    p.meow();
let pussy = new Cat('boots', 7, years);
pussy.claw();
pussy.name;
pussy.meow();
pussy.meow;
pussy.species;
petIsCat(pussy);
//BAD! because of intersection of userImage, compiler can't know the type
const badUser = {
    id: 1,
    firstName: 'Alexandra',
    lastName: 'Ashcraft',
    image: 'image-url',
};
//typescript does not infer that it is a string and does not give you access to those methods
badUser.image;
const goodUser = {
    id: 1,
    firstName: 'Alexandra',
    lastName: 'Ashcraft',
    image: 'image-url',
};
//typescript can infer that it is a string now and gives you the methods
goodUser.image;
