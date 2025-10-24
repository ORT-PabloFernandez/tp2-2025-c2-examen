import { findAllListings, findListingById, listingByPropertyType , listingWithPricesTotal } from "../data/listingsData.js";

export const getListings = async (page, pageSize) => {
    return await findAllListings(page, pageSize);
}

export const getListingById = async (id) => {
    return await findListingById(id);
}

export const getListingsByPropertyType = async (propertyType) => {
    return await listingByPropertyType(propertyType);
}

export const getListingByTotal = async () =>{
     return await listingWithPricesTotal
}