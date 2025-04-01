import { Field, ObjectType } from "type-graphql";
import { Column } from "typeorm";
import { Entity, PrimaryGeneratedColumn } from "typeorm";
// Extension GraphQL typeDEF
@ObjectType()
// Extension TypeORM
@Entity()
export class Wines {
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
}
