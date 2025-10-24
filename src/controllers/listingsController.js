import { getListings, getListingById, getAllListingsWithTotalPrice, getListingByHostId,getListingByPropertyType, modifyListingAvailability } from "../services/listingsService.js";

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

export const getListingPropertyType = async (req, res) => {
     try {
        const type = req.params.type;
        console.log(type);
        const listing = await getListingByPropertyType(type);
        res.json(listing);
    } catch (error) {
        console.log("Error fetching listing: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getListingsWithTotalPrice = async (req, res) => {
     try {
        const listing = await getAllListingsWithTotalPrice();
        res.json(listing);
    } catch (error) {
        console.log("Error fetching listing: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getListingHostId = async (req, res) => {
     try {
        const host_id = req.params.host_id;
        const listing = await getListingByHostId(host_id);
        res.json(listing);
    } catch (error) {
        console.log("Error fetching listing: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export async function patchAvailability(req, res) {
    try {
        const id  = req.params.id;
        const availabilityData = req.body;

        const result = await modifyListingAvailability(id, availabilityData);
        
        res.status(200).json({
            message: "Disponibilidad actualizada correctamente.",
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        console.error("Error al actualizar disponibilidad:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
}