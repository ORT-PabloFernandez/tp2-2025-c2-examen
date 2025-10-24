import { getListings, getListingById, getListingByPropertyType, getListingByHost } from "../services/listingsService.js";

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
        if(!listing) {
            return res.status(404).json({ message: "propiedad no encontrada" });
        }
        res.json(listing);
    } catch (error) {
        console.log("Error fetching listing: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getListingPropertyType = async (req, res) => {
    try {
        const type = req.params.type;
        const listing = await getListingByPropertyType(type);
        if(!listing) {
            return res.status(404).json({ message: "tipo de propiedad no encontrada" });
        }
        res.json(listing);
    } catch (error) {
        console.log("Error fetching listing: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getListingWithTotalPrice = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : undefined;
    const pageSize = req.query.pageSize
      ? parseInt(req.query.pageSize)
      : undefined;
    const listings = await getListings(page, pageSize);
    const total = listings.map((list) => ({
      ...list,
      total: parseFloat(list.price || 0) + parseFloat(list.security_deposit || 0) + parseFloat(list.cleaning_fee || 0) + parseFloat(list.extra_people || 0)
    }));
    res.json(total);
  } catch (error) {
    console.log("Error fetching listings: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getListingHost = async (req, res) => {
    try {
        const host = req.params.host_id;
        const listing = await getListingByHost(host);
        if(!listing) {
            return res.status(404).json({ message: "host no encontrado" });
        }
        res.json(listing);
    } catch (error) {
        console.log("Error fetching listing: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//revisar para que impacte en la BD
export const changeAvailability = async (req, res) => {
    try {
    const list = await getListingById(req.params.id);
    if (!list) {
      return res.status(404).json({ message: "propiedad no encontrada" });
    }
    list.availability.availability_30 = req.body.availability_30
    list.availability.availability_60 = req.body.availability_60
    list.availability.availability_90 = req.body.availability_90
    list.availability.availability_365 = req.body.availability_365

    res.json(list);
  } catch (error) {
    console.log("Error fetching listings: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const topNHosts = async (req, res) => {
    try {
        const listings = await getListings();
        const listSorted = listings.sort((a,b)  => b.host.host_listings_count - a.host.host_listings_count)
        const limit = req.query.limit;
        const listSliced = listSorted.slice(0,limit)
        res.json(listSliced);
    } catch (error) {
        console.log("Error fetching listings: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};