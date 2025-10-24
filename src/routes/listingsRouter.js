import express from "express";
import { 
    getAllListings, 
    getListingId, 
    getListingsByType, 
    getAllListingsWithTotalPrice, 
    getListingsByHost,
    updateListingAvailability
} from "../controllers/listingsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllListings);
router.get("/with-total-price", authMiddleware, getAllListingsWithTotalPrice)
router.get("/property-type/:type", authMiddleware, getListingsByType)
router.get("/host/:host_id", authMiddleware, getListingsByHost)
router.get("/:id", authMiddleware, getListingId);
router.put("/:id/availability", authMiddleware, updateListingAvailability)


export default router;
