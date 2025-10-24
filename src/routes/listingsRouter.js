import express from "express";
import { getAllListings, topNHosts, getListingId, getListingPropertyType, getListingWithTotalPrice, getListingHost, changeAvailability } from "../controllers/listingsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
// router.get("/", authMiddleware, getAllListings);
// router.get("/:id", authMiddleware, getListingId);
router.get("/top-hosts", authMiddleware, topNHosts);
router.get("/", authMiddleware, getAllListings);
router.get("/with-total-price", authMiddleware, getListingWithTotalPrice);
router.get("/host/:host_id", authMiddleware, getListingHost);
router.get("/property-type/:type", authMiddleware, getListingPropertyType);
router.put("/:id/availability",authMiddleware, changeAvailability);
router.get("/:id", authMiddleware, getListingId);

export default router;
