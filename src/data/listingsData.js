import { getDbListenings } from "./connection.js";

//1
export async function findPropertyData (type){
    const db = getDbListenings();
    const listings = await db.collection("listingsAndReviews").find({ "property_type": type}).toArray();
    return listings;
}

//2
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
        const listings = await db.collection("listingsAndReviews").find().toArray();
        return listings;
    }
}

//3
export async function findPropertyHostData (host_id){
    const db = getDbListenings();
    const listings = await db.collection("listingsAndReviews").find({ "properhost.host_id": host_id}).toArray();
    return listings;
}

//4
export async function findListingById (id, availability){
    const db = getDbListenings();
    const listings = await db.collection("listingsAndReviews").findOne({ _id: new ObjectId(id) }, {$set: {"availability": availability}});
    return listings;
}

//5
export async function getTopData(pageSize) {
    const db = getDbListenings();
    console.log("PageSize en data: ", pageSize);
    const listings = await db.collection("listingsAndReviews").aggregate([
    {
      $group: {
        _id: "$host.host_id",
        host_name: { $first: "$host.host_name" }, count: { $sum: 1 } } },
    { $sort: { count: -1 } }, {$limit: limit}, { $project: { _id: 0, host_id: "$id", host_name: 1, totalPropertys: "$count" }}
  ]).toArray();
  return listings;
};
