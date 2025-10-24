import { getDb } from "./connection.js";
import { ObjectId } from "mongodb";

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
    const listing = await db.collection("listingsAndReviews").findOne({ _id: new ObjectId(id) });
    console.log(listing);
    return listing;
}

export async function findListingsByType(type, page, pageSize) {
    const db = getDb();
    const tipo = { property_type: type };
    if (page && pageSize) {
        const skip = (page - 1) * pageSize;
        const listings = await db.collection("listingsAndReviews")
            .find(tipo)
            .skip(skip)
            .limit(pageSize)
            .toArray();
         return listings;
    } else {
        const listings = await db.collection("listingsAndReviews")
            .find(tipo)
            .toArray();
        return listings;
    }
}

export async function findListingsByHost(hostId, page, pageSize) {
    const db = getDb();
    if (page && pageSize) {
        const skip = (page - 1) * pageSize;
        const listings = await db.collection("listingsAndReviews")
            .find({ "host.host_id": hostId })
            .skip(skip)
            .limit(pageSize)
            .toArray();
        return listings;
    } else {
        const listings = await db.collection("listingsAndReviews")
            .find({ "host.host_id": hostId })
            .toArray();
        return listings;
    }
}

export async function actualizarListingAvailability(id, availability) {
    const db = getDb();
    const result = await db.collection("listingsAndReviews").updateOne(
        { _id: new ObjectId(id) },
        { $set: { "availability": availability } }
    );
    return result.modifiedCount > 0;
}
