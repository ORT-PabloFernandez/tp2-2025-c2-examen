import express from "express";
import {
  getAllListings,
  getListingId,
  getListingsByPropertyType,
  getListingsWithTotalPrice,
  getListingsByHost,
  updateListingAvailability,
  getTopHosts,
} from "../controllers/listingsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", authMiddleware, getAllListings);
router.get("/with-total-price", authMiddleware, getListingsWithTotalPrice);
router.get("/top-hosts", authMiddleware, getTopHosts);
router.get("/property-type/:type", authMiddleware, getListingsByPropertyType);
router.get("/host/:host_id", authMiddleware, getListingsByHost);
router.patch("/:id/availability", authMiddleware, updateListingAvailability);
router.get("/:id", authMiddleware, getListingId);

export default router;
