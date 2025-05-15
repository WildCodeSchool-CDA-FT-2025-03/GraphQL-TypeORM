import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, InputType, ObjectType } from "type-graphql";
import { IsEmail, MinLength } from "class-validator";

@ObjectType()
@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  hash: string;
}

@InputType()
export class UsersInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;
}
