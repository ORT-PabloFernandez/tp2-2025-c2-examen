import express from "express";
import { getAllListings, getListingId, getListingsByType, getAllListingsWithTotalPrice } from "../controllers/listingsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", authMiddleware, getAllListings);
router.get("/:id", authMiddleware, getListingId);

router.get("/property-type/:type", authMiddleware, getListingsByType)
router.get("/with-total-price", authMiddleware, getAllListingsWithTotalPrice)


export default router;
