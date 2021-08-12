import { Router } from "express";
import {
  createPlayer,
  serviceFifa21,
  getPlayer,
  getPlayers,
  getPlayerSearch,
} from "../controllers/player.controller";
import { Autorization, AutorizationAdmin } from "../middlewares/authorization";

const router = Router();

router.get("/?:page", Autorization, getPlayers);
router.post("/player", Autorization, createPlayer);
router.get("/fifa", AutorizationAdmin, serviceFifa21);
router.post("/api/v1/team", Autorization, getPlayer);
router.get(
  "/api/v1/players?:search?:order?:page",
  Autorization,
  getPlayerSearch
);

export default router;
