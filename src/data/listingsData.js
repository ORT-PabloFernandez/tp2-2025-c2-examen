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

export async function findListingsByPropertyType(propertyType){
    const db = getDb();
    const listings = await db.collection("listingsAndReviews")
        .find({property_type: propertyType})
        .toArray()

    return listings
}

export async function findAllListingsWithTotalPrice(){
    const db = getDb();
    const listings = await db.collection("listingsAndReviews")
        .find()
        .toArray()

        const listingsWithTotalPrice = listings.map(listing => {
            const price = listing.price?.$numberDecimal ? parseFloat(listing.price.$numberDecimal) :(listing.price || 0);
            const cleaningFee = listing.cleaning_fee?.$numberDecimal ? parseFloat(listing.cleaning_fee.$numberDecimal) :(listing.cleaning_fee || 0);
        })
}
