import express from "express";
import { 
    getAllListings, 
    getListingId, 
    getListingsByType, 
    getAllListingsWithTotalPrice 
} from "../controllers/listingsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/with-total-price", authMiddleware, getAllListingsWithTotalPrice)
router.get("/property-type/:type", authMiddleware, getListingsByType)
router.get("/", authMiddleware, getAllListings);
router.get("/:id", authMiddleware, getListingId);


export default router;
