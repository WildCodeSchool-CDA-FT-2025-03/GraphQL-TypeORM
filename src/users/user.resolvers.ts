import { Arg, Mutation, Resolver } from "type-graphql";
import { Users } from "./user.entities";
import { validate } from "class-validator";
import * as argon2 from "argon2";

const hashOptions = {
  type: argon2.argon2d,
  memoryCost: 2 ** 16,
  hashLength: 50,
};
@Resolver()
export class UsersResolver {
  @Mutation(() => Users)
  async signup(@Arg("email") email: string, @Arg("password") password: string) {
    try {
      // ma validation est ici

      // hash du password

      const hash = await argon2.hash(password, hashOptions);
      const user = new Users();
      user.email = email;
      user.hash = hash;
      const error = await validate(user);
      if (error.length > 0) {
        throw new Error("Informations erronées");
      }
      const result = await user.save();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
