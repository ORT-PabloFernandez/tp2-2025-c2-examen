import { getListings, getListingById, getListingsByType, getListingsWithTotalPriceService, getListingByHost, updateListingAvailabilityService, getTopHostsService } from "../services/listingsService.js";

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

export const getListingType = async (req, res) => {
    console.log("entro al controller por tipo");
    try {
        const type = req.params.type;
        const listings = await getListingsByType(type);
        res.json(listings);
    } catch (error) {
        console.log("Error listando por propiedad ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getListingsWithTotalPrice = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
        const listings = await getListingsWithTotalPriceService(page, pageSize);
        res.json(listings);
    } catch (error) {
        console.log("Error listando con precio total ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getListingHost = async (req, res) => {
    try {
        const host_id = req.params.host_id;
        console.log("este es el host _id traido de params");
        console.log(host_id);
        const listing = await getListingByHost(host_id);
        res.json(listing);
    } catch (error) {
        console.log("Error fetching listing: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateListingAvailability = async (req, res) => {
    try {
        const { availability } = req.body;
        const { id } = req.params;
        const listing = await updateListingAvailabilityService(id, availability);
        res.json({ message: "Disponibilidad actualizada!" });
    } catch (error) {
        console.log("Error updating listing availability: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getTopHosts = async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 10; 
        const listing = await getTopHostsService(limit);
        res.json(listing);
    } catch (error) {
        console.log("Error fetching top hosts: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}