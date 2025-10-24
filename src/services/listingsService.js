import { findAllListings, findListingById, findListingByPropertyType, findListingWithTotalPrice, findListingByHostId, updateListingAvailability } from "../data/listingsData.js";

export const getListings = async (page, pageSize) => {
    return await findAllListings(page, pageSize);
}

export const getListingById = async (id) => {
    return await findListingById(id);
}

export const getListingByPropertyType = async (property) => {
    return await findListingByPropertyType(property);
}

export const getAllListingsWithTotalPrice = async () => {
    return await findListingWithTotalPrice();
}

export const getListingByHostId = async (host_id) => {
    return await findListingByHostId(host_id);
}

export async function modifyListingAvailability(id, availabilityData) {
    const result = await updateListingAvailability(id, availabilityData);
    return result;
}