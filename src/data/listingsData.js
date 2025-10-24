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

export async function findListingsByPropertyType(type, page, pageSize) {
  const db = getDb();
  const filter = { property_type: type };
  const cursor = db.collection("listingsAndReviews").find(filter);
  if (page && pageSize) {
    const skip = (page - 1) * pageSize;
    cursor.skip(skip).limit(pageSize);
  }
  return await cursor.toArray();
}

export async function findListingsWithTotalPrice(page, pageSize) {
  const db = getDb();
  const cursor = db.collection("listingsAndReviews").find();
  if (page && pageSize) {
    const skip = (page - 1) * pageSize;
    cursor.skip(skip).limit(pageSize);
  }
  const docs = await cursor.toArray();
  return docs.map(d => {
    const price = Number(d.price) || 0;
    const cleaning = Number(d.cleaning_fee) || 0;
    const deposit = Number(d.security_deposit) || 0;
    const extra = Number(d.extra_people) || 0;
    return { ...d, totalPrice: price + cleaning + deposit + extra };
  });
}

export async function findListingsByHost(hostId, page, pageSize) {
  const db = getDb();
  const filter = { "host.host_id": hostId };
  const cursor = db.collection("listingsAndReviews").find(filter);
  if (page && pageSize) {
    const skip = (page - 1) * pageSize;
    cursor.skip(skip).limit(pageSize);
  }
  return await cursor.toArray();
}

export async function updateListingAvailability(id, fields) {
  const db = getDb();
  const allowed = ["availability.available_30","availability.available_60","availability.available_90","availability.available_365"];
  const $set = {};
  for (const key of Object.keys(fields)) {
    if (allowed.includes(key)) {
      $set[key] = fields[key];
    }
  }
  if (Object.keys($set).length === 0) {
    throw new Error("No hay campos válidos para actualizar disponibilidad");
  }
  const result = await db.collection("listingsAndReviews").updateOne(
    { _id: id },
    { $set }
  );
  return result;
}