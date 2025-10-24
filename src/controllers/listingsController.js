import { getListings, getListingById, getPropertyServices, getTotalPriceService, getPropertyHostServices, updatePropertyServices, getTopServices } from "../services/listingsService.js";

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

//1
export const getPropertyType = async (req, res) => {
    try {
        const type = req.params.type;
        const propertyType = await getPropertyServices(type);
        res.status(200).json ({ msg: "Obtenecion exitosa", propertyType }); 
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//2
export const getTotalPrice = async (req, res) => {
    try {
        const total = await getTotalPriceService();
        res.status(200).json ({ msg: "Obtenecion exitosa", total }); 
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//3
export const getPropertysHost = async (req, res) => {
    try {
        const host_id = req.paramas.host_id;
        const propertysHost = await getPropertyHostServices(host_id);
        res.status(200).json ({ msg: "Obtenecion exitosa", propertysHost }); 
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//4
export const updateProperty = async (req, res) => {
    try {
        const id = req.paramas.id;
        const property = await updatePropertyServices(id);
        res.status(200).json ({ msg: "Actualizacion exitosa", property }); 
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//5
export const getTopHost = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const top = await getTopServices(limit);
        res.status(200).json ({ msg: "Obtenecion de top exitosa", top }); 
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
