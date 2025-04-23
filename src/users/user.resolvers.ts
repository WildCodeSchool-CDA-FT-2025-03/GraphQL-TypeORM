import { Arg, Mutation, Resolver } from "type-graphql";
import { Users, UsersInput } from "./user.entities";
import { validate } from "class-validator";
import * as argon2 from "argon2";

const hashOptions = {
  type: argon2.argon2d,
  memoryCost: 2 ** 16,
  hashLength: 50,
};
@Resolver()
export class UsersResolver {
  @Mutation(() => Boolean)
  async signup(@Arg("data") data: UsersInput) {
    try {
      // ma validation est ici
      const { email, password } = data;
      // hash du password
      const hash = await argon2.hash(password, hashOptions);

      // Création du User
      const user = new Users();
      user.email = email;
      user.hash = hash;
      // const error = await validate(user);
      // if (error.length > 0) {
      //   throw new Error("Informations erronées");
      // }
      const result = await user.save();
      if (result.id) {
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(error);
    }
  }
}
