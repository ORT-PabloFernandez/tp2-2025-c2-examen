import { getListings, getListingById, getListingsByPropertyType, getListingByTotal } from "../services/listingsService.js";

export const getAllListings = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
        const listings = await getListings(page, pageSize);
        res.json(listings);
    } catch (error) {
        console.log("Error fetching listings: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getListingId = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const listing = await getListingById(id);
        res.json(listing);
    } catch (error) {
        console.log("Error fetching listing: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getListingsByType = async (req, res) => {
    try {
        const propertyType = req.params.propertyType;
        const listings = await getListingsByPropertyType(propertyType);
        res.json(listings);
    } catch (error) {

        console.log("Error ", error);
        res.status(500).json({ message: "Internal server error" });
    }


}

export const getListingsWithTotalPrice = async (req, res) => {
  try {
    const listings = await getListingByTotal();
    res.json(listings);
  } catch (error) {
    
    res.status(500).json({ message: "Internal server error" });
  }
};
