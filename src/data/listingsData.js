import { parseProperty } from "../helpers/parseProperty.js";
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

export async function findAllListingsByPropertyType(type, page, pageSize) {
    const db = getDb();
    if (page && pageSize) {
        const skip = (page - 1) * pageSize;
        const listings = await db.collection("listingsAndReviews")
            .find({ type})
            .skip(skip)
            .limit(pageSize)
            .toArray();
        return listings
    } else {
        const listings = await db.collection("listingsAndReviews").find({"property_type": type}).toArray();
        return listings;
    }
}

export async function getAllListingsWithTotalPrice(page, pageSize) {
    const db = getDb();
    var listings = []
    if (page && pageSize) {
        const skip = (page - 1) * pageSize;
        listings = await db.collection("listingsAndReviews")
            .find()
            .skip(skip)
            .limit(pageSize)
            .toArray();
    } else {
        listings = await db.collection("listingsAndReviews").find().toArray();
    }
    return listings.map(k => ({
            ...k, 
            totalPrice: (parseProperty(k.price)) + 
            parseProperty(k.cleaning_fee || 0) + 
            parseProperty(k.security_deposit || 0) + 
            parseProperty(k.extra_people || 0) 
        }))
}

export async function findAllListingsByHostId(id, page, pageSize){
    const db = getDb();
    if (page && pageSize) {
        const skip = (page - 1) * pageSize;
        const listings = await db.collection("listingsAndReviews")
            .find({ "host.host_id": id })
            .skip(skip)
            .limit(pageSize)
            .toArray();
        return listings
    } else {
        const listings = await db.collection("listingsAndReviews").find({ "host.host_id": id }).toArray();
        return listings;
    }
}

export async function findAllTopHostsByProperties(limit){ 
    const db = getDb();
    const listings = await db.collection("listingsAndReviews")
        .find()
        .toArray()
    
    const hostTotalProperties = {}
    const hostData = {}
    for (let listing of listings) {
        const id = listing.host.host_id
        hostTotalProperties[id] === undefined ? hostTotalProperties[id] = 1 : hostTotalProperties[id] ++
        hostData[id] = listing.host
    }

    const results = Object.keys(hostTotalProperties)
        .sort((a,b) => hostTotalProperties[b] - hostTotalProperties[a])
        .slice(0, limit)

    return results.map(k => ({
        ...hostData[k],
        totalProperties: hostTotalProperties[k],
    }))
}

export async function patchOneListingAvailabilityById(id, availability){
    const db = getDb();
    const listing = await db.collection("listingsAndReviews")
        .updateOne({_id: { $lt: id}}, { $set: { availability } })
    return listing
}