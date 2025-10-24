import { findAllListings, findListingById, findListingByPropertyType, findListingByHost } from "../data/listingsData.js";

export const getListings = async (page, pageSize) => {
    return await findAllListings(page, pageSize);
}

export const getListingById = async (id) => {
    return await findListingById(id);
}

export const getListingByPropertyType = async (type) => {
    return await findListingByPropertyType(type);
}

export const getListingByHost = async (host) => {
    return await findListingByHost(host);
}
