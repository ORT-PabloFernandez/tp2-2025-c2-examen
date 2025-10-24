import { getListings, getListingById, getListingsByType, getListingsByHost, updateListingAvailability } from "../services/listingsService.js";

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

export const getListingsType = async (req, res) => {
    try {
        const type = req.params.type;
        if (!type) {
            return res.status(400).json({ message: "El tipo de propiedad es obligatorio." });
        }
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
        const listings = await getListingsByType(type, page, pageSize);
        if (listings) {
            res.status(200).json(listings);
        } else {
            res.status(404).json({ error: "No se encontraron propiedades del tipo especificado." });
        }
    } catch (error) {
        console.log("Error al obtener las propiedades por tipo: ", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};

export const getListingsWithTotal = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
        const listings = await getListings(page, pageSize);
        const listingsWithTotal = listings.map(listing => {
            const precioTotal = listing.reduce((sum, item) => sum + (item.price + item.security_deposit + item.cleaning_fee + item.extra_people), 0);
            return { ...listing, precioTotal };
        });
        if (listingsWithTotal) {
            res.status(200).json(listingsWithTotal);
        } else {
            res.status(404).json({ message: "No se encontraron propiedades." });
        }
    } catch (error) {
        console.log("Error al obtener las propiedades con total: ", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

export const getListingsHost = async (req, res) => {
    try {
        const hostId = req.params.host.host_id;
        if (!hostId) {
            return res.status(400).json({ message: "El ID del anfitrión es obligatorio." });
        }
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
        const listings = await getListingsByHost(hostId, page, pageSize);
        if (listings) {
            res.status(200).json(listings);
        } else {
            res.status(404).json({ error: "No se encontraron propiedades del anfitrión especificado." });
        }
    } catch (error) {
        console.log("Error al obtener las propiedades por anfitrión: ", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};

export const rankingHosts = async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const listings = await getListings();
        let listingsByHost = [];

        for (const listing of listings) {
            const hostId = listing.host.host_id;
            const hostName = listing.host.host_name;
            const existingHost = listingsByHost.find(h => h.host_id === hostId);
            if (existingHost) {
                existingHost.listing_count += 1;
            } else {
                listingsByHost.push({ host_id: hostId, host_name: hostName, listing_count: 1 });
            }
        }

        listingsByHost.sort((a, b) => b.listing_count - a.listing_count);
        const topHosts = listingsByHost.slice(0, limit);
        res.status(200).json(topHosts);
    } catch (error) {
        console.log("Error al obtener el ranking de anfitriones: ", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

export const actualizarDisponibilidad = async (req, res) => {
    try {
        const id = req.params.id;
        const { disponibilidad } = req.body;
        if (disponibilidad === undefined) {
            return res.status(400).json({ message: "La disponibilidad es obligatoria." });
        }
        const result = await updateListingAvailability(id, disponibilidad);
        if (result) {
            res.status(200).json({ message: "Disponibilidad actualizada correctamente." });
        } else {
            res.status(404).json({ message: "No se encontró la propiedad." });
        }
    } catch (error) {
        console.log("Error al actualizar la disponibilidad: ", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};
