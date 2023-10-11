//Extra practice

//@ts-expect-error
const number: string = 2;

//utility types
interface Checklist {
  id: string;
  title: string;
}

type AddChecklist = Pick<Checklist, 'id'>;
//will expect id in the type
type deleteChecklist = Omit<Checklist, 'id'>;
//will just include title
const submitted: Record<string, number> = {};

//type guard
const isNumber = (value: unknown): value is number => {
  return !isNaN(Number(value)) && value !== null;
};

const someNum = '4'
const checkNum = () => {
  if (isNumber(someNum)){
    const math = someNum + 5;
    console.log(math)
  }
}
console.log(checkNum())

//keyof IS equivalent of object keys
type Destinations = string | number;
type StorageData = {
  destinations?: Destinations;
  activeDestination?: string;
  savedSessions?: Destinations;
  playerX?: string;
  playerY?: string;
};
//type that matches any of the keys in storage type
type StorageKey = keyof StorageData;
//function that passes in the storagekey array and a callback
//the callback accepts a result argument that is an object containing any of the keys in storagekey and the value will be the key associated with storage data
const get = (
  key: StorageKey | StorageKey[],
  callback: (result: { [K in StorageKey]?: [StorageData[K]] }) => void,
) => {
  localStorage.get(key, callback);
};

//T gives access to the properties of the passed in object
const addUID = <T extends { name: string }>(obj: T) => {
  let uid = Math.floor(Math.random() * 100);
  return { ...obj, uid };
};

let docOne = addUID({ name: 'yoshi', age: 40 });
//let docTwo = addUID('shaun');

console.log(docOne.name);

// with interfaces, the T allows for flexibility. the data property must be present, but it allows for multiple types when the interface is applied
interface Resource<T> {
  uid: number;
  resourceName: string;
  data: T;
}

const docThree: Resource<object> = {
  uid: 1,
  resourceName: 'person',
  data: { name: 'shaun' },
};

const docFour: Resource<string[]> = {
  uid: 1,
  resourceName: 'shoppingList',
  data: ['bread', 'milk'],
};

interface hasFunction {
  form(): void;
}

let doc: hasFunction;

class Invoice implements hasFunction {
  readonly client: string;
  private details: string;
  amount: number;
  constructor(client: string, details: string, amount: number) {
    this.client = client;
    this.details = details;
    this.amount = amount;
  }
  form(): void {
    console.log('Learning');
  }
}
/**
 * will throw an error if try to assign to a class that does not extend hasFunction
 * if (type.value === 'invoice'){
 * doc = new Invoice(..., ... ,...)
 * }else{
 * doc = new Payment(..., ..., ...)}
 */
export class ListTemplate {
  //private below means that we dont need to set it above or pass it into the constructor function
  constructor(private container: HTMLUListElement) {}

  render(item: hasFunction, heading: string, pos: 'start' | 'end') {
    const li = document.createElement('li');

    const h4 = document.createElement('h4');
    h4.innerText = heading;
    li.append(h4);

    const p = document.createElement('p');
    //p.innerHTML = item.form();
    li.append(p);

    if (pos === 'start') {
      this.container.prepend(li);
    } else {
      this.container.append(li);
    }
  }
}

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

//Unused Code

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

//inputs
// const price = document.querySelector('#price') as HTMLInputElement;
// const down = document.querySelector('#down') as HTMLInputElement;
// const rate = document.querySelector('#rate') as HTMLInputElement;
// const term = document.querySelector('#term') as HTMLInputElement;
