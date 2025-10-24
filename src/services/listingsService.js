import { findAllListings, findListingById, findListingsByType, findAllListingsWithTotalPrice, findListingByHost, updateListingAvailabilityInDb, findTopHosts} from "../data/listingsData.js";

export const getListings = async (page, pageSize) => {
    return await findAllListings(page, pageSize);
}

export const getListingById = async (id) => {
    return await findListingById(id);
}

export const getListingsByType = async (type) => {
    return await findListingsByType(type);
}

export const getListingsWithTotalPriceService = async (page, pageSize) => {
    return await findAllListingsWithTotalPrice(page, pageSize);
}

export const getListingByHost = async (host_id) => {
    return await findListingByHost(host_id);
}

export const updateListingAvailabilityService = async (id, availability) => {
    return await updateListingAvailabilityInDb(id, availability);
}

export const getTopHostsService = async (limit) => {
    return await findTopHosts(limit);
}