import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: "100" })
  name: string;

  @Column()
  position: string;

  @Column()
  nation: string;

  @Column()
  team: string;
}
