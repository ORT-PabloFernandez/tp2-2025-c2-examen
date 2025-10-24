import { 
    findAllListings, 
    findListingById, 
    findAllListingsByPropertyType, 
    getAllListingsWithTotalPrice,
    findAllListingsByHostId,
    findAllTopHostsByProperties,
    patchOneListingAvailabilityById } from "../data/listingsData.js";

export const getListings = async (page, pageSize) => {
    return await findAllListings(page, pageSize);
}

export const getListingById = async (id) => {
    return await findListingById(id);
}

export const getListingsByPropertyType = async (type, page, pageSize) => {
    return await findAllListingsByPropertyType(type, page, pageSize)
}

export const getListingsWithPrice = async(page, pageSize) => {
    return await getAllListingsWithTotalPrice(page, pageSize)
}

export const getListingsByHostId = async(id, page, pageSize) => {
    return await findAllListingsByHostId(id, page, pageSize)
}

export const getTopHostsByProperties = async(limit) => {
    return await findAllTopHostsByProperties(limit)
}

export const patchListingAvailabilityById = async(id, availability) => {
    return await patchOneListingAvailabilityById(id, availability)
}