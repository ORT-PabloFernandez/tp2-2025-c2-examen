import express from "express";
import { getAllListings, getListingId, getListingIdByType, getListingWithTotalPrice, getAllListingsByHost, updateAvailabilityListing, getTopHosts } from "../controllers/listingsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllListings);
router.get("/property-type/:type", authMiddleware, getListingIdByType);
router.get("/with-total-price", authMiddleware, getListingWithTotalPrice);
router.get("/host/:host_id", authMiddleware, getAllListingsByHost);
router.patch("/:id/availability", authMiddleware, updateAvailabilityListing);
router.get("/top-hosts", authMiddleware, getTopHosts)
router.get("/:id", authMiddleware, getListingId);

export default router;
