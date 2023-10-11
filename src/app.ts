// import { Mortgage } from './classes/Mortgage.js';
// import { APIData } from './interfaces/interfaces.js';
// import { Property } from './classes/Property.js';

//downside of importing/exporting, we are not bundling our files here, so the browser makes separate requests to the network for these files. if you use webpack or vite it will bundle the code into a single file so there will only be one network request
//classes
interface APIData {
  county: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  lotSize: number;
  yearBuilt: number;
  price: number;
  listedDate: string;
  addressLine1: string;
  city: string;
  state: string;
  zipCode: string;
  formattedAddress: string;
  lastSeen: string;
  createdDate: string;
  status: string;
  removedDate: null;
  daysOnMarket: number;
  id: string;
  latitude: number;
  longitude: number;
}

class Property implements APIData {
  county: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  lotSize: number;
  yearBuilt: number;
  price: number;
  listedDate: string;
  addressLine1: string;
  city: string;
  state: string;
  zipCode: string;
  formattedAddress: string;
  lastSeen: string;
  createdDate: string;
  status: string;
  removedDate: null;
  daysOnMarket: number;
  id: string;
  latitude: number;
  longitude: number;

  constructor(
    county: string,
    propertyType: string,
    bedrooms: number,
    bathrooms: number,
    squareFootage: number,
    lotSize: number,
    yearBuilt: number,
    price: number,
    listedDate: string,
    addressLine1: string,
    city: string,
    state: string,
    zipCode: string,
    formattedAddress: string,
    lastSeen: string,
    createdDate: string,
    status: string,
    removedDate: null,
    daysOnMarket: number,
    id: string,
    latitude: number,
    longitude: number,
  ) {
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

const submit: HTMLButtonElement = document.querySelector('.submit-button')!;
//typecasting
const calculatorForm = document.querySelector(
  '.calculation-form',
) as HTMLFormElement;
//

//query select output locations
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

//adding event listener to handle form submission for calculator
calculatorForm.addEventListener('submit', (e: Event) => {
  //prevents page refresh
  e.preventDefault();

  const data = new FormData(calculatorForm, submit);
  const price = data.get('price') as unknown as number;
  const down = data.get('down') as unknown as number;
  const rate = data.get('rate') as unknown as number;
  const term = data.get('term') as unknown as number;

  const currentMortgage = new Mortgage(price, down, rate, term);
  console.log(currentMortgage);

  monthlyPayment.innerHTML = `$${currentMortgage.calculateMonthlyPayment()}`;
  totalPayment.innerHTML = `$${currentMortgage.calculateTotalPayment()}`;
  totalInterest.innerHTML = `$${currentMortgage.calculateTotalInterest()}`;

  return false;
});

//saves calculated data into a bullet point
save.addEventListener('click', (e: Event) => {
  e.preventDefault();

  const data = new FormData(calculatorForm, submit);
  const price = data.get('price') as unknown as number;
  const down = data.get('down') as unknown as number;
  const rate = data.get('rate') as unknown as number;
  const term = data.get('term') as unknown as number;

  const currentMortgage = new Mortgage(price, down, rate, term);

  const resultList = document.createElement('ul') as HTMLUListElement;
  const result = document.createElement('li') as HTMLLIElement;
  const homePrice: HTMLLIElement = document.createElement('li');
  homePrice.innerHTML = `Home Price: $${currentMortgage.price}`;

  const loanAmount: HTMLLIElement = document.createElement('li');
  loanAmount.innerHTML = `Loan Amount: $${currentMortgage.loanAmount}`;

  const interestRate: HTMLLIElement = document.createElement('li');
  interestRate.innerHTML = `Interest Rate: ${currentMortgage.rate}%`;

  const monthlyPayment: HTMLLIElement = document.createElement('li');
  monthlyPayment.innerHTML = `Monthly Payment: $${currentMortgage.calculateMonthlyPayment()}`;

  const totalPayment: HTMLLIElement = document.createElement('li');
  totalPayment.innerHTML = `Total Payment: $${currentMortgage.calculateTotalPayment()}`;

  const totalInterest: HTMLLIElement = document.createElement('li');
  totalInterest.innerHTML = `Total Interest: $${currentMortgage.calculateTotalInterest()} \n`;
  resultList.append(
    homePrice,
    loanAmount,
    interestRate,
    monthlyPayment,
    totalPayment,
    totalInterest,
  );
  result.append(resultList);
  savedList.append(result);

  return false;
});

//query select form and button items
const apiForm = document.querySelector('.listing-search') as HTMLFormElement;
const apiButton = document.querySelector('.search-button') as HTMLButtonElement;

//add event listener to api form
apiForm.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  const data = new FormData(apiForm, apiButton);
  const minPrice = data.get('minPrice') as unknown as number;
  const maxPrice = data.get('maxPrice') as unknown as number;
  const zipCode = data.get('zipCode') as string;
  const propertyTypes = [...data.keys()].filter(
    el => el !== 'zipCode' && el !== 'minPrice' && el !== 'maxPrice',
  ) as unknown as Array<string>;

  const paramsString: string | string[] = makeParamsString(
    zipCode,
    propertyTypes,
  );

  if (Array.isArray(paramsString)) {
    paramsString.forEach(string => {
      const data = fetchData(string, minPrice, maxPrice);
    });
  } else {
    const data = fetchData(paramsString, minPrice, maxPrice);
  }
});

//use form data to make query string for API fetch
const makeParamsString = (
  zipCode: string,
  propertyTypes?: Array<string>,
): string | string[] => {
  if (!propertyTypes) {
    const paramsString = new URLSearchParams({ zipCode: zipCode });
    return paramsString.toString();
  }
  if (propertyTypes && propertyTypes.length === 1) {
    const paramsString = new URLSearchParams({
      zipCode: zipCode,
      propertyType: propertyTypes[0] as string,
    });
    return paramsString.toString();
  } else {
    const urls: string[] = [];
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
const makeListItem = (obj: Property) => {
  const allProperties = document.querySelector(
    '.apiSearchResults',
  ) as HTMLUListElement;
  const propertyListItem = document.createElement('li') as HTMLLIElement;
  const propertyList = document.createElement('ul') as HTMLUListElement;

  const headingLI: HTMLHeadingElement = document.createElement('h3');
  headingLI.innerHTML = 'Listing:';
  const formattedAddressLI: HTMLLIElement = document.createElement('li');
  formattedAddressLI.innerHTML =
    `Address: ${obj.formattedAddress}` as Property['formattedAddress'];

  const priceLI: HTMLLIElement = document.createElement('li');
  priceLI.innerHTML = `Price: ${obj.price}` as unknown as string;

  const propertyTypeLI: HTMLLIElement = document.createElement('li');
  propertyTypeLI.innerHTML =
    `Property Type: ${obj.propertyType}` as Property['propertyType'];

  const bedroomsLI: HTMLLIElement = document.createElement('li');
  bedroomsLI.innerHTML = `Bedrooms: ${obj.bedrooms}` as unknown as string;

  const bathroomsLI: HTMLLIElement = document.createElement('li');
  bathroomsLI.innerHTML = `Bathrooms: ${obj.bathrooms}` as unknown as string;

  const squareFootageLI: HTMLLIElement = document.createElement('li');
  squareFootageLI.innerHTML =
    `Square Footage: ${obj.squareFootage}sq ft` as unknown as string;

  const lotSizeLI: HTMLLIElement = document.createElement('li');
  lotSizeLI.innerHTML = `Lot Size: ${obj.lotSize}sq ft` as unknown as string;

  const yearBuiltLI: HTMLLIElement = document.createElement('li');
  yearBuiltLI.innerHTML = `Year Built: ${obj.yearBuilt}` as unknown as string;

  const listedDateLI: HTMLLIElement = document.createElement('li');
  listedDateLI.innerHTML = `Date Listed: ${obj.listedDate.slice(
    0,
    10,
  )}` as Property['listedDate'];

  const daysOnMarketLI: HTMLLIElement = document.createElement('li');
  daysOnMarketLI.innerHTML =
    `Days on Market: ${obj.daysOnMarket}` as unknown as string;

  propertyListItem.append(
    headingLI,
    formattedAddressLI,
    priceLI,
    propertyTypeLI,
    bedroomsLI,
    bathroomsLI,
    squareFootageLI,
    lotSizeLI,
    yearBuiltLI,
    listedDateLI,
    daysOnMarketLI,
  );
  allProperties.append(propertyListItem);
};

//fetch data
async function fetchData(
  query: string,
  minPrice: number,
  maxPrice: number,
): Promise<void> {
  try {
    const url =
      'https://realty-mole-property-api.p.rapidapi.com/saleListings?' + query;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'b8a7f4d740msh6f868ffc4f45dfdp1e6998jsn60afddc504b4',
        'X-RapidAPI-Host': 'realty-mole-property-api.p.rapidapi.com',
      },
    };

    const res = await fetch(url, options);
    if (!res.ok) throw new Error('Error fetching data');

    const data: Promise<Array<APIData>> = await res.json();

    (await data).forEach(listing => {
      const price = listing.price;
      if (minPrice <= price && price <= maxPrice) {
        const newProperty = new Property(
          listing.county,
          listing.propertyType,
          listing.bedrooms,
          listing.bathrooms,
          listing.squareFootage,
          listing.lotSize,
          listing.yearBuilt,
          listing.price,
          listing.listedDate,
          listing.addressLine1,
          listing.city,
          listing.state,
          listing.zipCode,
          listing.formattedAddress,
          listing.lastSeen,
          listing.createdDate,
          listing.status,
          listing.removedDate,
          listing.daysOnMarket,
          listing.id,
          listing.latitude,
          listing.longitude,
        );
        makeListItem(newProperty);
      }
    });
  } catch (error) {
    console.log('Error!', error);
  }
}

