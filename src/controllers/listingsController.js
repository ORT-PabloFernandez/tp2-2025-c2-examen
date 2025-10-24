import { 
    getListings, 
    getListingById,
    getListingsByPropertyType, 
    getListingsWithPrice,
    getListingsByHostId,
    getTopHostsByProperties,
    patchListingAvailabilityById } from "../services/listingsService.js";

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

export const getListingByPropertyType = async (req,res) => {
    try {
        const type = req.params.type 
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
        const listings = await getListingsByPropertyType(type, page, pageSize);
        res.json(listings)
    } catch (error) {
        console.log("Error fetching listing by property type: ", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export const getListingsWithTotalPrice = async (req, res) => {
      try {
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
        const listings = await getListingsWithPrice(page, pageSize);
        res.json(listings)
    } catch (error) {
        console.log("Error fetching listing by property type: ", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export const getListingsByHost = async (req, res) => {
    try {
        const id = req.params.id 
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
        const listings = await getListingsByHostId(id, page, pageSize);
        res.json(listings)
    } catch (error) {
        console.log("Error fetching listing by property type: ", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export const getTopHosts = async (req,res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const listings = await getTopHostsByProperties(limit);
        res.json(listings)
    } catch (error) {
        console.log("Error fetching listing by property type: ", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export const patchListingAvailability = async (req,res) => {
    try {
        const id = req.params.id 
        const body = {
            "availability_30": req.body?.availability_30,
            "availability_60": req.body?.availability_60,
            "availability_90": req.body?.availability_90,
            "availability_365": req.body?.availability_365
        }
        const availability = {}

        const keys = Object.keys(body)
        for(let i of keys){
            if(body[i] !== undefined){
                availability[`availability.${i}`] =  body[i]
            }
        }

        await patchListingAvailabilityById(id, availability)
        const listing = await getListingById(id)
        return res.json(listing)
    } catch (error) {
        console.log("Error fetching listing by property type: ", error)
        res.status(500).json({message: "Internal server error"})
    }
}