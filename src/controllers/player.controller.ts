import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Player } from "../entity/Player";

export const getPlayers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const players = await getRepository(Player).find();
  return res.json(players);
};

export const createPlayer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newPlayer = getRepository(Player).create(req.body);
  const results = await getRepository(Player).save(newPlayer);
  return res.json(results);
};
