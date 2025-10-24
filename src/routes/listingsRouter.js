import express from "express";
import { 
    getAllListings, 
    getListingByPropertyType, 
    getListingId, 
    getListingsWithTotalPrice, 
    getListingsByHost,
    getTopHosts,
    patchListingAvailability } from "../controllers/listingsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", authMiddleware, getAllListings);
router.patch('/availability/:id', authMiddleware, patchListingAvailability )
router.get("/property-type/:type", authMiddleware, getListingByPropertyType);
router.get("/with-total-price", authMiddleware, getListingsWithTotalPrice)
router.get("/top-hosts", authMiddleware, getTopHosts)
router.get("/host/:id", authMiddleware, getListingsByHost)
router.get("/:id", authMiddleware, getListingId);

export default router;
