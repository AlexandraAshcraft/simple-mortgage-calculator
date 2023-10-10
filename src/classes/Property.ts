import { APIData } from "../interfaces/interfaces";

export class Property implements APIData{

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

    constructor(    county: string,
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
        longitude: number,){
            this.county = county;
            this.propertyType = propertyType;
            this.bedrooms = bedrooms;
            this.bathrooms = bathrooms;
            this.squareFootage = squareFootage;
            this.lotSize =lotSize;
            this.yearBuilt = yearBuilt;
            this.price = price;
            this.listedDate = listedDate;
            this.addressLine1 = addressLine1;
            this.city =city;
            this.state= state;
            this.zipCode= zipCode;
            this.formattedAddress= formattedAddress;
            this.lastSeen=lastSeen;
            this.createdDate= createdDate;
            this.status= status;
            this.removedDate= null;
            this.daysOnMarket= daysOnMarket;
            this.id= id;
            this.latitude= latitude;
            this.longitude= longitude;
        }
}