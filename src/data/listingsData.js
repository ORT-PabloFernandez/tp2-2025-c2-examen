import { getDb } from "./connection.js";

export async function findAllListings(page, pageSize) {
    const db = getDb();
    if (page && pageSize) {
        const skip = (page - 1) * pageSize;
        const listings = await db.collection("listingsAndReviews")
            .find()
            .skip(skip)
            .limit(pageSize)
            .toArray();
        return listings;
    } else {
        // Sin paginación: trae todos los documentos
        const listings = await db.collection("listingsAndReviews").find().toArray();
        return listings;
    }
}

export async function findListingById(id) {
    const db = getDb();
    const listing = await db.collection("listingsAndReviews").findOne({ _id: id });
    console.log(listing);
    return listing;
}

//REVISAR
export async function findListingByPropertyType(type) {
    const db = getDb();
        const listings = await db.collection("listingsAndReviews").find({ property_type:type }).toArray();
        return listings;
}

export async function findListingByHost(host) {
    const db = getDb();
        const listings = await db.collection("listingsAndReviews").find({ "host.host_id":host }).toArray();
        return listings;
}