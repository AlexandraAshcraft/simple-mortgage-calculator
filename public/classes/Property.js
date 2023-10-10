export class Property {
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
