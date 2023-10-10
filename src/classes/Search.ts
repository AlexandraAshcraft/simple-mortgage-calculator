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