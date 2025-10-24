import express from "express";
import { getAllListings, getListingId, getListingPropertyType, getListingsWithTotalPrice, getListingHostId, patchAvailability} from "../controllers/listingsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", authMiddleware, getAllListings);
router.get("/with-total-price", authMiddleware, getListingsWithTotalPrice);
router.get("/:id", authMiddleware, getListingId);
router.get("/host/:host_id", authMiddleware, getListingHostId);
router.get("/property-type/:type", authMiddleware, getListingPropertyType);
router.patch("/:id/availability", authMiddleware, patchAvailability);

export default router;
