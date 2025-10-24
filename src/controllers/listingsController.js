import { getListings, getListingById, 
    getListingsByPropertyType, 
    getListingsWithTotalPrice, 
    getListingsByHost, 
    setListingAvailability } from "../services/listingsService.js";

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
    if(!listing){
      return res.status(404).json({ message: "Listing not found" });
    }
    res.json(listing);
  } catch (error) {
    console.log("Error fetching listing: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getByPropertyType = async (req, res) => {
  try {
    const type = req.params.type;
    if(!type || typeof type !== "string"){
      return res.status(400).json({ message: "Tipo de propiedad inválido" });
    }
    const page = req.query.page ? parseInt(req.query.page) : undefined;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
    const listings = await getListingsByPropertyType(type, page, pageSize);
    res.json(listings);
  } catch (error) {
    console.log("Error fetching by property type: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getWithTotalPrice = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : undefined;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
    const listings = await getListingsWithTotalPrice(page, pageSize);
    res.json(listings);
  } catch (error) {
    console.log("Error fetching with total price: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getByHost = async (req, res) => {
  try {
    const hostId = req.params.host_id;
    if(!hostId){
      return res.status(400).json({ message: "host_id es requerido" });
    }
    const page = req.query.page ? parseInt(req.query.page) : undefined;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
    const listings = await getListingsByHost(hostId, page, pageSize);
    res.json(listings);
  } catch (error) {
    console.log("Error fetching by host: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAvailability = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body || {};
    const allowed = ["availability.available_30","availability.available_60","availability.available_90","availability.available_365"];
    const hasAny = Object.keys(body).some(k => allowed.includes(k));
    if(!hasAny){
      return res.status(400).json({ message: "Body inválido. Campos permitidos: " + allowed.join(", ") });
    }
    const result = await setListingAvailability(id, body);
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Listing no encontrado" });
    }
    res.json({ message: "Disponibilidad actualizada" });
  } catch (error) {
    console.log("Error updating availability: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

