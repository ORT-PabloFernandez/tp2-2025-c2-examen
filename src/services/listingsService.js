import { findAllListings, findListingById, 
  findListingsByPropertyType,
  findListingsWithTotalPrice,
  findListingsByHost,
  updateListingAvailability } from "../data/listingsData.js";

export const getListings = async (page, pageSize) => {
    return await findAllListings(page, pageSize);
}

export const getListingById = async (id) => {
    return await findListingById(id);
}

export const getListingsByPropertyType = async (type, page, pageSize) => {
  return await findListingsByPropertyType(type, page, pageSize);
}

export const getListingsWithTotalPrice = async (page, pageSize) => {
  return await findListingsWithTotalPrice(page, pageSize);
}

export const getListingsByHost = async (hostId, page, pageSize) => {
  return await findListingsByHost(hostId, page, pageSize);
}

export const setListingAvailability = async (id, fields) => {
  return await updateListingAvailability(id, fields);
}
