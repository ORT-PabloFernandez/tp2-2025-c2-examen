import { 
    getListings, 
    getListingById, 
    getListingsByPropertyType,
    getAllListingsWithTotalPrice 
} from "../services/listingsService.js";

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
        const {type} = req.params

        if (!type) {
            return res.status(400).json({
                msg: "Se requiere el tipo de propiedad en el request"
            })
        }

        const listings = await getListingsByPropertyType(type);

        if (listings.length === 0) {
            return res.status(404).json({
                msg:`No se encontraron propiedades para el tipo ${type}`,
                count: 0,
                results: []
            })
        }

        res.json({
            msg: "Propiedades obtenidas exitosamente",
            count: listings.length,
            propertyType: type,
            results: listings
        })
    } catch (error) {
        console.log("Error en la solicitud de listings", error);
        res.status(500).json({msg: "Internal server error"})
    }
}

export const getAllListingsWithTotalPrice = async (req, res) => {
    try {
        console.log("Obteniendo propiedades con precio total");
        const listings = await getAllListingsWithTotalPrice()

        res.json({
            msg: "Propiedades obtenidas exitosamente",
            count: listings.length,
            results: listings
        })
    } catch (error) {
        console.log("Error obteniendo las propiedades con precio total: ", error)
        res.status(500).json({msg: "Internal Server Error"})   
    }
}