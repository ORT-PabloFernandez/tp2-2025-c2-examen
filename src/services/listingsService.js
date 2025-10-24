import { findAllListings, findListingById, updateStatusAvailabilityListingById, findListingsByHost, findListingsByType } from "../data/listingsData.js";

export const getListings = async (page, pageSize) => {
    return await findAllListings(page, pageSize);
}

export const getListingById = async (id) => {
    return await findListingById(id);
}

export const updateStatusAvailabilityById = async (id, availability) => {
    return await updateStatusAvailabilityListingById(id, availability);
}

export const getListingsByHost = async (hostId, page, pageSize) => {
    return await findListingsByHost(hostId, page, pageSize);
}

export const getListingsByType = async (type, page, pageSize) => {
    return await findListingsByType(type, page, pageSize);
}