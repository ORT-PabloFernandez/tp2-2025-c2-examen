import express from "express";
import { getAllListings, getListingId, getByPropertyType, getWithTotalPrice, getByHost, updateAvailability } from "../controllers/listingsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", authMiddleware, getAllListings);
router.get("/property-type/:type", authMiddleware, getByPropertyType);
router.get("/with-total-price", authMiddleware, getWithTotalPrice);
router.get("/host/:host_id", authMiddleware, getByHost);
router.get("/:id", authMiddleware, getListingId);
router.patch("/:id/availability", authMiddleware, updateAvailability);
router.put("/:id/availability", authMiddleware, updateAvailability);

export default router;
