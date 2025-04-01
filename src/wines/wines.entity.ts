import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, JoinTable, ManyToMany } from "typeorm";
import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { Grapes } from "../grapes/grapes.entity";
// Extension GraphQL typeDEF
@ObjectType()
// Extension TypeORM
@Entity()
export class Wines extends BaseEntity {
  // PrimaryKEy: extension TypeORM
  @PrimaryGeneratedColumn("increment")
  // Extension Graph
  @Field()
  // Typage fort TS
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  region: string;

  @Column()
  @Field()
  country?: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  tanin?: string;

  @Column()
  @Field()
  fruit?: string;

  @Column()
  @Field()
  shelf_life?: string;

  @Column()
  @Field()
  price_range?: string;

  @Field(() => [Grapes])
  @ManyToMany(() => Grapes, (grape) => grape.wines)
  grapes: Grapes[];
}
