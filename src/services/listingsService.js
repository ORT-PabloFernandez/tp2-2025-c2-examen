import { 
    findAllListings, 
    findListingById, 
    findListingsByPropertyType, 
    findAllListingsForPriceCalculation, 
    findListingsByHostId
} from "../data/listingsData.js";

export const getListings = async (page, pageSize) => {
    return await findAllListings(page, pageSize);
}

export const getListingById = async (id) => {
    return await findListingById(id);
}

export const getListingsByPropertyType = async (propertyType) => {
    return await findListingsByPropertyType(propertyType)
}

export const getListingsWithTotalPrice = async () => {
    return await findAllListingsForPriceCalculation();
}

export const getListingsByHostId = async (hostId) => {
    return await findListingsByHostId(hostId);
}