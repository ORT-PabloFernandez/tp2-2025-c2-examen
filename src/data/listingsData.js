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

export async function findListingByPropertyType(property) {
    const db = getDb();
    const listing = await db.collection("listingsAndReviews").find({ property_type : property }).toArray();
    console.log(listing);
    return listing;
}

export async function findListingWithTotalPrice() {
    const db = getDb();
    const listings = await db.collection("listingsAndReviews").find().toArray();
    for (const listing of listings) {
        const price = parseFloat(listing.price);
        const cleaning_fee = parseFloat(listing.cleaning_fee || 0);
        const extra_people = parseFloat(listing.extra_people || 0);
        const security_deposit = parseFloat(listing.security_deposit || 0);
        listing.totalPrice = price + cleaning_fee + extra_people + security_deposit;
    }
    console.log(listings);
    return listings
}

export async function findListingByHostId(host_id) {
    const db = getDb();
    const listings = await db.collection("listingsAndReviews").find({"host.host_id" : host_id}).toArray();
    return listings;
}

export async function updateListingAvailability(id, availabilityData) {
    const db = getDb();

    const actualizarCampos = {};
    if (availabilityData.availability_30 !== undefined)
        actualizarCampos["availability.availability_30"] = availabilityData.availability_30;
    if (availabilityData.availability_60 !== undefined)
        actualizarCampos["availability.availability_60"] = availabilityData.availability_60;
    if (availabilityData.availability_90 !== undefined)
        actualizarCampos["availability.availability_90"] = availabilityData.availability_90;
    if (availabilityData.availability_365 !== undefined)
        actualizarCampos["availability.availability_365"] = availabilityData.availability_365;

    const result = await db.collection("listingsAndReviews").updateOne({ _id: id }, { $set: actualizarCampos });

    return result;
}
