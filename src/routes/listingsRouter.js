import express from "express";
import { getAllListings, getListingId, getTotalPrice, getTopHost, getPropertyType, getPropertysHost, updateProperty} from "../controllers/listingsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", getAllListings);
router.get("/:id", getListingId);

//2
router.get("with-total-price", getTotalPrice);

//5
router.get("/top-hosts", getTopHost);

//1
router.get("/property-type/:type", getPropertyType);

//3
router.get("/host/:host_id", getPropertysHost);

//4
router.put("/:id/availability", updateProperty);

export default router;
