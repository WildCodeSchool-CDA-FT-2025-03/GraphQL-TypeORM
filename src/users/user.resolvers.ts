import { Arg, Mutation, Resolver } from "type-graphql";
import { Users } from "./user.entities";

@Resolver()
export class UsersResolver {
  @Mutation(() => Users)
  async signup(@Arg("email") email: string, @Arg("passowrd") password: string) {
    try {
      const user = new Users();
      user.email = email;
      user.hash = password;
      const result = await user.save();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
