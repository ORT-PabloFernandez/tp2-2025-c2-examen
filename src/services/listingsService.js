import { findAllListings, findListingById, findListingsByType, findListingsByHost, actualizarListingAvailability } from "../data/listingsData.js";

export const getListings = async (page, pageSize) => {
    return await findAllListings(page, pageSize);
}

export const getListingById = async (id) => {
    return await findListingById(id);
}

export const getListingsByType = async (type, page, pageSize) => {
    return await findListingsByType(type, page, pageSize);
}

export const getListingsByHost = async (hostId, page, pageSize) => {
     return await findListingsByHost(hostId, page, pageSize);
}

export const updateListingAvailability = async (id, availability) => {
    return await actualizarListingAvailability(id, availability);
}
