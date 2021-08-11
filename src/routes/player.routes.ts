import { Router } from "express";
import { createPlayer, getPlayers } from "../controllers/player.controller";

const router = Router();

router.get("/players", getPlayers);
router.post("/player", createPlayer);

export default router;
