import express from "express";
import { getAllListings, getListingId, getListingsType, getListingsWithTotal, getListingsHost, rankingHosts, actualizarDisponibilidad } from "../controllers/listingsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", authMiddleware, getAllListings);
router.get("/property-type/:type", getListingsType);
router.get("/with-total-price", getListingsWithTotal);
router.get("/host/:hostId", getListingsHost);
router.get("/top-hosts", rankingHosts);
router.put("/update-availability/:id", actualizarDisponibilidad);
router.get("/:id", authMiddleware, getListingId);



export default router;
