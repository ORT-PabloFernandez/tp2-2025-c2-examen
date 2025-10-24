import { getListings, getListingById, updateStatusAvailabilityById, getListingsByHost, getListingsByType } from "../services/listingsService.js";

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
        const listing = await getListingById(id);
        if(!listing){
            return res.status(404).json({message: "Listing no encontrado"});
        }
        res.json(listing);
    } catch (error) {
        console.log("Error fetching listing: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getListingIdByType = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
        const type = req.params.type;
        //const listings = await getListings(page, pageSize);
        //const listingsByType = listings.filter((list, index) => list.property_type == type)
        const listingsByType = await getListingsByType(type, page, pageSize)
        res.json(listingsByType);
    } catch (error) {
        console.log("Error fetching listings: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getListingWithTotalPrice = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
        const listings = await getListings(page, pageSize);
        const listingsWithPrice = listings.map((list, index) => 
            ({
                ...list,
                total_price: (Number(list.price) ? Number(list.price) : 0) +
                             (Number(list.cleaning_fee) ? Number(list.cleaning_fee) : 0) +
                             (Number(list.security_deposit) ? Number(list.security_deposit) : 0) +
                             (Number(list.extra_people) ? Number(list.extra_people) : 0)
            })
        )
        res.json(listingsWithPrice);
    } catch (error) {
        console.log("Error fetching listings: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllListingsByHost = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
        const host = req.params.host_id;
        //const listings = await getListings(page, pageSize);
        //const listingsByHost = listings.filter((list, index) => list.host.host_id == host)
        const listingsByHost = await getListingsByHost(host, page, pageSize)
        res.json(listingsByHost);
    } catch (error) {
        console.log("Error fetching listings: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateAvailabilityListing = async (req, res) => {
    try {
        const id = req.params.id;
        const { availability_30, availability_60, availability_90, availability_365 } = req.body;
        const listing = await getListingById(id);
        if (!listing) {
            return res.status(404).json({message: "Listing no encontrado"});
        }
        if (availability_30 && typeof availability_30 == "number") {
            listing.availability.availability_30 = availability_30
        }
        if (availability_60 && typeof availability_60 == "number") {
            listing.availability.availability_60 = availability_60
        }
        if (availability_90 && typeof availability_90 == "number") {
            listing.availability.availability_90 = availability_90
        }
       if (availability_365 && typeof availability_365 == "number") {
            listing.availability.availability_365 = availability_365
        }
        await updateStatusAvailabilityById(id, listing.availability)
        res.json(listing);
    } catch (error) {
        console.log("Error fetching listing: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getTopHosts = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        if (!limit) {
            return res.status(400).json({message: "Limit es requerido"});
        }
        
        const listings = await getListings(page, pageSize);
        let topHosts = [];
        for (let list of listings) {
            const host = topHosts.find((h, i) => h.host_id == list.host.host_id)
            if (host) {
                host.total++;
            } else {
                topHosts.push({
                    host_id: list.host.host_id,
                    host_name: list.host.host_name,
                    total: 1
                })
            }
        }

        const orderedHosts = topHosts.sort((a, b) => b.total - a.total)
        const limitedHosts = orderedHosts.slice(0, limit);
        res.json(limitedHosts);
    } catch (error) {
        console.log("Error fetching listings: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};