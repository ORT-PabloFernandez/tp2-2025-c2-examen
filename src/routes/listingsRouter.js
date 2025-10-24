import express from "express";
import { getAllListings, getListingId, getListingType, getListingsWithTotalPrice, getListingHost, updateListingAvailability, getTopHosts } from "../controllers/listingsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", authMiddleware, getAllListings);
router.get("/with-total-price", authMiddleware, getListingsWithTotalPrice);
router.get("/top-hosts", authMiddleware, getTopHosts);
router.get("/host/:host_id", authMiddleware, getListingHost);
router.get("/property-type/:type", authMiddleware, getListingType);
router.put("/availability/:id", authMiddleware, updateListingAvailability);
router.get("/:id", authMiddleware, getListingId);

export default router;
