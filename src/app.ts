import { Mortgage } from './classes/Mortgage.js';
import { APIData } from './interfaces/interfaces.js';
import { Property } from './classes/Property.js';

//downside of importing/exporting, we are not bundling our files here, so the browser makes separate requests to the network for these files. if you use webpack or vite it will bundle the code into a single file so there will only be one network request

const submit: HTMLButtonElement = document.querySelector('.submit-button')!;
//typecasting
const calculatorForm = document.querySelector(
  '.calculation-form',
) as HTMLFormElement;
//
//inputs
// const price = document.querySelector('#price') as HTMLInputElement;
// const down = document.querySelector('#down') as HTMLInputElement;
// const rate = document.querySelector('#rate') as HTMLInputElement;
// const term = document.querySelector('#term') as HTMLInputElement;

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

const apiForm = document.querySelector('.listing-search') as HTMLFormElement;
const apiButton = document.querySelector('.search-button') as HTMLButtonElement;

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

const makeListItem = (obj: Property) => {
  const allProperties = document.querySelector(
    '.apiSearchResults',
  ) as HTMLUListElement;
  const propertyListItem = document.createElement('li') as HTMLLIElement;
  const propertyList = document.createElement('ul') as HTMLUListElement;

  const headingLI: HTMLHeadingElement = document.createElement('h3');
  headingLI.innerHTML = 'Listing:'
  const formattedAddressLI: HTMLLIElement = document.createElement('li');
  formattedAddressLI.innerHTML =
    `Address: ${obj.formattedAddress}` as Property['formattedAddress'];
    
  const priceLI: HTMLLIElement = document.createElement('li');
  priceLI.innerHTML = `Price: ${obj.price}` as unknown as string;
  
  const propertyTypeLI: HTMLLIElement = document.createElement('li');
  propertyTypeLI.innerHTML = `Property Type: ${obj.propertyType}` as Property['propertyType'];
  
  const bedroomsLI: HTMLLIElement = document.createElement('li');
  bedroomsLI.innerHTML = `Bedrooms: ${obj.bedrooms}` as unknown as string;
  
  const bathroomsLI: HTMLLIElement = document.createElement('li');
  bathroomsLI.innerHTML = `Bathrooms: ${obj.bathrooms}` as unknown as string;
  
  const squareFootageLI: HTMLLIElement = document.createElement('li');
  squareFootageLI.innerHTML = `Square Footage: ${obj.squareFootage}sq ft` as unknown as string;
  
  const lotSizeLI: HTMLLIElement = document.createElement('li');
  lotSizeLI.innerHTML = `Lot Size: ${obj.lotSize}sq ft` as unknown as string;
  
  const yearBuiltLI: HTMLLIElement = document.createElement('li');
  yearBuiltLI.innerHTML = `Year Built: ${obj.yearBuilt}` as unknown as string;
  
  const listedDateLI: HTMLLIElement = document.createElement('li');
  listedDateLI.innerHTML = `Date Listed: ${obj.listedDate.slice(0, 10)}` as Property['listedDate'];
  
  const daysOnMarketLI: HTMLLIElement = document.createElement('li');
  daysOnMarketLI.innerHTML = `Days on Market: ${obj.daysOnMarket}` as unknown as string;
  // const addressLine1LI: HTMLLIElement = document.createElement('li');
  // addressLine1LI.innerHTML = obj.addressLine1 as Property['addressLine1'];
  
  // const cityLI: HTMLLIElement = document.createElement('li');
  // cityLI.innerHTML = obj.city as Property['city'];
  
  // const stateLI: HTMLLIElement = document.createElement('li');
  // stateLI.innerHTML = obj.state as Property['state'];
  
  // const zipCodeLI: HTMLLIElement = document.createElement('li');
  // zipCodeLI.innerHTML = obj.zipCode as Property['zipCode'];
  
  // const countyLI: HTMLLIElement = document.createElement('li');
  // countyLI.innerHTML = obj.county as Property['county'];
  // const statusLI: HTMLLIElement = document.createElement('li');
  // statusLI.innerHTML = obj.status as Property['status'];


  propertyListItem.append(
    headingLI,
    //countyLI,
    propertyTypeLI,
    bedroomsLI,
    bathroomsLI,
    squareFootageLI,
    lotSizeLI,
    yearBuiltLI,
    priceLI,
    listedDateLI,
    // addressLine1LI,
    // cityLI,
    // stateLI,
    // zipCodeLI,
    formattedAddressLI,
    //statusLI,
    daysOnMarketLI,
  );
  allProperties.append(propertyListItem);
};

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

//Extra practice with classes

type AddFunction = (num1: number, num2: number) => number;
type SubtractFunction = (num1: number, num2: number) => number;
interface MultiplyFunction {
  (num1: number, num2: number): number;
}

//union type
type MathFunc = '+' | '-';
//conditional type
type handleMath<A extends MathFunc> = A extends '+'
  ? AddFunction
  : A extends '-'
  ? SubtractFunction
  : never;

const mathAdd: handleMath<'+'> = (num1: number, num2: number) => (num1 += num2);
const mathSubtract: handleMath<'-'> = (num1: number, num2: number) =>
  (num1 -= num2);

type Species = 'cat' | 'dog';

type Animal = {
  readonly kind: string;
  mammal: boolean;
};

const giraffe: Animal = {
  kind: 'giraffe',
  mammal: true,
};

interface Pet {
  species: Species;
  //readonly index signature
  readonly name?: string;
}

class Cat implements Pet {
  name?: string;
  public species: Species = 'cat';
  public age: number;
  public meow(): void {
    console.log('hi meow');
  }
  private litter(): string {
    return 'in the garage';
  }
  public claw: () => string;

  constructor(
    name: string,
    age: number,
    myFunc: (name: string, age: number) => string,
  ) {
    this.name = name;
    this.age = age;
    this.claw = () => myFunc(this.name!, this.age);
  }
}

let b: ReadonlyArray<number> = [1, 2, 3];

//pet is cat is boolean
//type guards
function petIsCat(pet: Pet): pet is Cat {
  return pet.species === 'cat';
}

const years = (a: string, b: number): string => {
  return `I have had ${a} for ${b} years`;
};

const p: Pet = new Cat('socks', 2, years);

if (petIsCat(p)) p.meow();

let pussy = new Cat('boots', 7, years);
pussy.claw();
pussy.name;
pussy.meow();
pussy.meow;
pussy.species;
petIsCat(pussy);
//pussy.litter()

interface ICustomImage {
  data: string;
  width: number;
  height: number;
}

type UserImage = string | ICustomImage;

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  image: UserImage;
}

//BAD! because of intersection of userImage, compiler can't know the type
const badUser: IUser = {
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
} satisfies IUser;

//typescript can infer that it is a string now and gives you the methods
goodUser.image;
