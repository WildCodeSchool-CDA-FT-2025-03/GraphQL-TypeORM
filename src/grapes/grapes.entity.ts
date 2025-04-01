import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Wines } from "../wines/wines.entity";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Grapes {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @Field(() => [Wines])
  @ManyToMany(() => Wines, (wine) => wine.grapes)
  @JoinTable({ name: "grapes_by_wines" })
  wines: Wines[];
}
