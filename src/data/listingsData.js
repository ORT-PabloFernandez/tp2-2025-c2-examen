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
        .project({
            _id: 1,
            name: 1,
            summary: 1,
            property_type: 1,
            price: 1
        })
        .toArray()

    return listings
}

export async function findAllListingsForPriceCalculation(){
    const db = getDb();
    const listings = await db.collection("listingsAndReviews")
        .find()
        .project({
            _id: 1,
            name: 1,
            summary: 1,
            property_type: 1,
            price: 1,
            security_deposity: 1,
            cleaning_fee: 1,
            extra_people:1
        })
        .toArray()

        return listings;
}

export async function findListingsByHostId(hostId){
    const db = getDb();
    const listings = await db.collection("listingsAndReviews")
        .find()
        .project({
            _id: 1,
            name: 1,
            summary: 1,
            property_type: 1,
            price: 1,
            room_type: 1,
            "host.host_id": 1,
            "host.host_name": 1
        })
        .toArray()

        return listings
}

export async function updateListingAvailability(listingId, availabilityData){
    const db = getDb();

    const updateFields = {};

    if (availabilityData.availability_30 !== undefined){
        updateFields["availability.availability_30"] = availabilityData.availability_30;
    }

    if (availabilityData.availability_60 !== undefined){
        updateFields["availability.availability_60"] = availabilityData.availability_60;
    }

    if (availabilityData.availability_90 !== undefined){
        updateFields["availability.availability_90"] = availabilityData.availability_90;
    }

    if (availabilityData.availability_365 !== undefined){
        updateFields["availability.availability_365"] = availabilityData.availability_365;
    }

    const result = await db.collection("listingsAndReviews").updateOne(
        {_id:listingId},
        {$set: updateFields}
    )

    return result
}
