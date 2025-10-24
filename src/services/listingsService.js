import { getListingId } from "../controllers/listingsController.js";
import { 
    findAllListings, 
    findListingById, 
    findListingsByPropertyType, 
    findAllListingsForPriceCalculation, 
    findListingsByHostId,
    updateListingAvailability,
    findTopHostsByPropertyCount
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

export const updateAvailability = async (getListingId, availabilitydata) => {
    return await updateListingAvailability(getListingId, availabilitydata);
}

export const getTopHosts = async (limit) => {
    return await findTopHostsByPropertyCount(limit)
}