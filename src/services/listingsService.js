import { findAllListings, findListingById, findPropertyData, findPropertyHostData, getTopData } from "../data/listingsData.js";

//1
export const getPropertyServices = async (type) => {
    return await findPropertyData(type);
}

//2
export const getTotalService = async (page, pageSize) => {
    return await findAllListings(page, pageSize);
}

//3
export const getPropertyHostServices = async (host_id) => {
    return await findPropertyHostData(host_id);
}

//4
export const getListingById = async (id) => {
    return await findListingById(id);
}

//5
export const getTopServices = async (limit) => {
    return await getTopData(limit);
}
