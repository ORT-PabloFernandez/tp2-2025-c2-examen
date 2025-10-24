import { getListings, getListingById } from "../services/listingsService.js";

export const getAllListings = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : undefined;
    const pageSize = req.query.pageSize
      ? parseInt(req.query.pageSize)
      : undefined;
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

export const getListingsByPropertyType = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : undefined;
    const pageSize = req.query.pageSize
      ? parseInt(req.query.pageSize)
      : undefined;
    const { type: propertyType } = req.params;

    if (!propertyType) {
      return res.status(400).json({ message: "Debe especificar propertyType" });
    }

    const listings = await getListings(page, pageSize);
    const filteredListings = listings.filter(
      (listing) =>
        listing.property_type &&
        listing.property_type.toLowerCase() === propertyType.toLowerCase()
    );

    res.json(filteredListings);
  } catch (error) {
    console.log("Error fetching listings: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getListingsWithTotalPrice = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : undefined;
    const pageSize = req.query.pageSize
      ? parseInt(req.query.pageSize)
      : undefined;
    const listings = await getListings(page, pageSize);


    const aNumero = (v) => {
      if (v && typeof v === "object" && "$numberDecimal" in v)
        return parseFloat(v.$numberDecimal) || 0;
      return parseFloat(v || 0) || 0;
    };

    const result = listings.map((l) => ({
      ...l,
      totalPrice:
        aNumero(l.price) +
        aNumero(l.cleaning_fee) +
        aNumero(l.security_deposit) +
        aNumero(l.extra_people),
    }));

    res.json(result);
  } catch (error) {
    console.log("Error fetching listings with total price: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getListingsByHost = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : undefined;
    const pageSize = req.query.pageSize
      ? parseInt(req.query.pageSize)
      : undefined;
    const { host_id } = req.params;

    if (!host_id)
      return res.status(400).json({ message: "Debe especificar host_id" });

    const listings = await getListings(page, pageSize);

    const result = listings.filter(
      (listing) =>
        listing?.host?.host_id &&
        String(listing.host.host_id) === String(host_id)
    );

    res.json(result);
  } catch (error) {
    console.log("Error fetching listings by host: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateListingAvailability = async (req, res) => {
  try {
    const listing = await getListingById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Propiedad no encontrada" });
    }

    const body = req.body || {};
    listing.availability = listing.availability || {};

    if (
      body.availability_30 === undefined &&
      body.availability_60 === undefined &&
      body.availability_90 === undefined &&
      body.availability_365 === undefined
    ) {
      return res
        .status(400)
        .json({ message: "Debe ingresar al menos un campo de disponibilidad" });
    }

    if (body.availability_30 !== undefined) {
      const v = parseInt(body.availability_30);
      if (v != Number(body.availability_30) || v < 0) {
        return res
          .status(400)
          .json({ message: "Valor no válido para availability_30" });
      }
      listing.availability.availability_30 = v;
    }

    if (body.availability_60 !== undefined) {
      const v = parseInt(body.availability_60);
      if (v != Number(body.availability_60) || v < 0) {
        return res
          .status(400)
          .json({ message: "Valor no válido para availability_60" });
      }
      listing.availability.availability_60 = v;
    }

    if (body.availability_90 !== undefined) {
      const v = parseInt(body.availability_90);
      if (v != Number(body.availability_90) || v < 0) {
        return res
          .status(400)
          .json({ message: "Valor no válido para availability_90" });
      }
      listing.availability.availability_90 = v;
    }

    if (body.availability_365 !== undefined) {
      const v = parseInt(body.availability_365);
      if (v != Number(body.availability_365) || v < 0) {
        return res
          .status(400)
          .json({ message: "Valor no válido para availability_365" });
      }
      listing.availability.availability_365 = v;
    }

    res.json(listing);
  } catch (error) {
    console.log("Error actualizando disponibilidad:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getTopHosts = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : undefined;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;

    const limit =
      req.query.limit !== undefined ? parseInt(req.query.limit, 10) : 10;
    if (!Number.isFinite(limit) || limit <= 0) {
      return res.status(400).json({ message: "Parámetro 'limit' inválido" });
    }

    const listings = await getListings(page, pageSize);

    let hosts = [];

    for (let listing of listings) {
      if (!listing?.host?.host_id) continue;

      const hostId = String(listing.host.host_id);
      const hostName = listing.host.host_name || "N/A";

      let found = hosts.find((h) => h.host_id === hostId);
      if (found) {
        found.count += 1;
      } else {
        hosts.push({
          host_id: hostId,
          host_name: hostName,
          count: 1,
        });
      }
    }

    const ordenados = hosts.sort((a, b) => b.count - a.count);
    const top = ordenados.slice(0, limit);

    res.json(top);
  } catch (error) {
    console.log("Error computing top hosts: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
