export class Search {
    constructor(zipcode, type, minPrice, maxPrice) {
        this.zipcode = zipcode;
        this.type = type;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
    }
}
class SearchParams {
    constructor(zipCode, propertyType, minPrice, maxPrice) {
        this.zipCode = zipCode;
        this.propertyType = propertyType;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
    }
}
class Property {
    constructor(type, price) {
        this.type = type;
        this.price = price;
    }
}
