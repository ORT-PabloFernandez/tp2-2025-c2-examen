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

export async function findListingsByType(type) {
    const db = getDb();
    return await db.collection("listingsAndReviews").find({ property_type: type }).toArray();
}

export async function findAllListingsWithTotalPrice(page, pageSize) {
    const db = getDb();
    if (page && pageSize) {
        const skip = (page - 1) * pageSize;
        const listings = await db.collection("listingsAndReviews")
            .find()
            .skip(skip)
            .limit(pageSize)
            .toArray();

        const listingsWithTotalPrice = listings.map(listing => {
            const total_price = Number(listing.price) + Number(listing.cleaning_fee || 0) + Number(listing.security_deposit || 0) + Number(listing.extra_people || 0);
            return { ...listing, total_price };
        });

        return listingsWithTotalPrice;
    } else {
        // Sin paginación: trae todos los documentos
        const listings = await db.collection("listingsAndReviews").find().toArray();

        const listingsWithTotalPrice = listings.map(listing => {
            const total_price = Number(listing.price) + Number(listing.cleaning_fee || 0) + Number(listing.security_deposit || 0) + Number(listing.extra_people || 0);
            return { ...listing, total_price };
        });

        return listingsWithTotalPrice;
    }
}

export async function findListingByHost(host_id) {
    const db = getDb();
    const listing = await db.collection("listingsAndReviews").find({ "host.host_id": host_id }).toArray();
    console.log(listing);
    return listing;
}

export async function updateListingAvailabilityInDb(id, availability) {
    const db = getDb();
    const result = await db.collection("listingsAndReviews").updateOne(
        { _id: id },
        { $set: { availability: availability } }
    );
    return result;
}

export async function findTopHosts(limit) {
    const db = getDb();
    const topHosts = await db.collection("listingsAndReviews").aggregate([
        {
            $group: {
                _id: "$host.host_id",
                host_name: { $first: "$host.host_name" },
                total_listings: { $sum: 1 }
            }
        },
        { $sort: { total_listings: -1 } },
        { $limit: limit }
    ]).toArray();
    return topHosts;
}
