import { 
    getListings, 
    getListingById, 
    getListingsByPropertyType,
    getListingsWithTotalPrice, 
    getListingsByHostId,
    updateAvailability,
    getTopHosts
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
        const listings = await getListingsWithTotalPrice()

        const listingsWithTotalPrice = listings.map(listing => {
            const price = listing.price?.$numberDecimal ? parseFloat(listing.price.$numberDecimal) :(listing.price || 0);
            const cleaningFee = listing.cleaning_fee?.$numberDecimal ? parseFloat(listing.cleaning_fee.$numberDecimal) :(listing.cleaning_fee || 0);
            const securityDeposit = listing.security_deposit?.$numberDecimal ? parseFloat(listing.security_deposit.$numberDecimal) :(listing.security_deposit || 0);
            const extraPeople = listing.extra_people?.$numberDecimal ? parseFloat(listing.extra_people.$numberDecimal) :(listing.extra_people || 0);

            const totalPrice = Number(price) + Number(cleaningFee) + Number(securityDeposit) + Number(extraPeople);

            return {
                ...listing,
                totalPrice: totalPrice.toFixed(2)
            };
        });

        res.json({
            msg: "Propiedades obtenidas exitosamente",
            count: listings.length,
            results: listingsWithTotalPrice
        })
    } catch (error) {
        console.log("Error obteniendo las propiedades con precio total: ", error)
        res.status(500).json({msg: "Internal Server Error"})   
    }
}

export const getListingsByHost = async (req, res) => {
    try {
        console.log("aca")
        const {host_id} = req.params;

        if(!host_id){
            return res.status(400).json({message: "Host Id es requerido"})
        }

        console.log("Obteniendo propiedades del host: ", host_id);
        
        const listings = await getListingsByHostId(host_id);

        if (listings.length === 0) {
            return res.status(404).json({
                msg: `No se encontraron propiedades para el host ${host_id}`,
                count: 0,
                results: []
            })
        }

        res.json({
            msg: "Propiedades obtenidas exitosamente",
            count: listings.length,
            hostId: host_id,
            results: listings
        })
    } catch (error) {
        console.log("Error obteniendo listings por host id: ", error)
        res.status(500).json({msg: "internal server error"})
    }
}

export const updateListingAvailability = async (req,res) => {
    try {
        const {id} = req.params;
        const availabilityData = req.body

        if(!id){
            return res.status(400).json({msg: "el id del listing es requerido"})
        }

        const validFields = [
            "availability_30",
            "availability_60",
            "availability_90",
            "availability_365",
        ];

        const isValidField = validFields.some(field => availabilityData[field] !== undefined);

        if (!isValidField){
            return res.status(400).json({
                msg:"Se requiere algun fiel de availability",
                validFields: validFields
            })
        }

        for (const field of validFields){
            if( availabilityData[field] !== undefined && typeof availabilityData[field] !== 'number'){
                return res.status(400).json({
                    msg: `El field ${field} debe ser un numero`
                })
            }
        }

        console.log("Actualizando disponibilidad del listing: ", id)

        const result = await updateAvailability(id, availabilityData)
        
        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: `El Listing con id ${id} no existe`
            });
        };

        if (result.modifiedCount === 0) {
            return res.status(200).json({
                msg: "No se hicieron modificaciones",
                listingId: id
            });
        };

        res.json({
            message: "availability modificado exitosamente",
            listingId: id,
        })
    } catch (error) {
        console.log("Error modificando listings availability: ", error)
        res.status(500).json({msg: "internal server error"})
    }
}

export const getTopHostsRanking = async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;

        if (isNaN(limit) || limit < 0){
            return res.status(400).json({
                msg: "el limite debe ser un entero positivo"
            })
        }

        if (limit > 100) {
            return res.status(400).json({
                msg:" El limite no puede ser superior a 100"
            })
        }

        console.log("Obteniendo el ranking de los top hosts, limite: ", limit);

        const topHosts = await getTopHosts(limit);


        if (topHosts.length === 0) {
            return res.status(404).json({
                msg: "no se encontraron hosts",
                count: 0,
                results: []
            })
        }

        res.json({
            msg: "Top Hosts obtenidos exitosamente",
            limit: limit,
            results: topHosts
        })
    } catch (error) {
        console.log("Error obteniendo top hosts: ", error)
        res.status(500).json({msg: "internal server error"})
    }
}