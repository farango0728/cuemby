import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Player } from "../entity/Player";
import axios from "axios";
import detenv from "dotenv";

export const getPlayers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const page: any = Number(req.query.page) > 0 ? req.query.page : 1;
  const players = await getRepository(Player).findAndCount({
    select: ["name", "position", "nation", "team"],
    skip: (page - 1) * 10,
    take: Number(process.env.pageSize),
  });
  return res.json({
    page,
    totalPages: Math.ceil(players[1] / Number(process.env.pageSize)),
    Items: players[1] < 10 ? players[1] : process.env.pageSize,
    totalItems: players[1],
    players,
  });
};

export const getPlayer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const page: any = Number(req.body.Page) > 0 ? req.body.Page : 1;
  const players = await getRepository(Player).findAndCount({
    select: ["name", "position", "nation", "team"],
    where: { team: req.body.Name },
    skip: (page - 1) * 10,
    take: Number(process.env.pageSize),
  });
  return res.json({
    page,
    totalPages: Math.ceil(players[1] / Number(process.env.pageSize)),
    Items: players[1] < 10 ? players[1] : process.env.pageSize,
    totalItems: players[1],
    players,
  });
};

export const getPlayerSearch = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const order: any = req.query.order;
  const page: any = Number(req.query.page) > 0 ? req.query.page : 1;
  const players = await getRepository(Player).findAndCount({
    select: ["name", "position", "nation", "team"],
    where: `name LIKE '%${req.query.search}%'`,
    order: { name: order.toUpperCase() === "DESC" ? "DESC" : "ASC" },
    cache: true,
    skip: (page - 1) * 10,
    take: Number(process.env.pageSize),
  });
  return res.json({
    page,
    totalPages: Math.ceil(players[1] / Number(process.env.pageSize)),
    Items: players[1] < 10 ? players[1] : process.env.pageSize,
    totalItems: players[1],
    players,
  });
};

export const createPlayer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newPlayer = getRepository(Player).create(req.body);
  const results = await getRepository(Player).save(newPlayer);
  return res.json(results);
};

export const serviceFifa21 = async (req: Request, res: Response) => {
  let i = 1;
  let response1 = await axios.get(`${process.env.url}${i}`);
  let { totalPages } = response1.data;

  while (i < totalPages) {
    let response1 = await axios.get(`${process.env.url}${i}`);
    let { items } = response1.data;

    for (const item in items) {
      const existPlayer = await getRepository(Player).findOne({
        select: ["name"],
        where: { name: `${items[item].firstName} ${items[item].lastName}` },
      });

      const player = new Player();
      player.name = `${items[item].firstName} ${items[item].lastName}`;
      player.position = items[item].position;
      player.nation = items[item].nation.name;
      player.team = items[item].club.name;

      if (!existPlayer) {
        const results = await getRepository(Player).save(player);
      }
    }
    i++;
  }
  return res.json({ message: "process finished" });
};
