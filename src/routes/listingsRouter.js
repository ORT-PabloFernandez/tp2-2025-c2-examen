import express from "express";
import { getAllListings, getListingId, getListingsByType, getListingsWithTotalPrice } from "../controllers/listingsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
//volver a poner el auth despues de verificar que anda todo
router.get("/", authMiddleware, getAllListings);
router.get("/:id", authMiddleware, getListingId);
router.get("/propertyType/:propertyType",authMiddleware, getListingsByType);
router.get("/",authMiddleware, getListingsWithTotalPrice)
export default router;

