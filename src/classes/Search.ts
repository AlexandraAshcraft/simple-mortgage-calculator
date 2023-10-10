export class Search {
    zipcode: number;
    type: string[];
    minPrice?: number;
    maxPrice?: number;

    constructor(zipcode: number, type: string[], minPrice?: number, maxPrice?: number){
        this.zipcode = zipcode;
        this.type = type;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
    }
}



interface FormResults {
    zipCode: string,
    propertyType?: string,
    minPrice: string,
    maxPrice: string
  }
  
  class SearchParams{
    zipCode: string;
    propertyType?: string;
    minPrice?: number;
    maxPrice?: number;
  
    constructor(zipCode: string, propertyType?: string, minPrice?: number, maxPrice?: number  ){
      this.zipCode = zipCode;
      this.propertyType = propertyType;
      this.minPrice = minPrice;
      this.maxPrice = maxPrice;
    }
  
  }



  class Property {
    type: string;
    price: number;
    constructor(type: string, price: number) {
      this.type = type;
      this.price = price;
    }
  }