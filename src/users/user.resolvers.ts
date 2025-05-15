import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Users, UsersInput } from "./user.entities";
import jwt from "jsonwebtoken";
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

      const result = await user.save();
      if (result.id) {
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => Boolean)
  async login(@Arg("data") data: UsersInput, @Ctx() context) {
    try {
      const { email, password } = data;

      // Step 1, vérification si user avec email
      const user = await Users.findOneByOrFail({ email });

      if (await argon2.verify(user.hash, password)) {
        // Générer une clé jwt
        const token = jwt.sign(
          { email, isConnected: true },
          "ezdzenncrnzecnxzepjkdf5461315crze",
          { expiresIn: "24h" }
        );

        // Envoie de la clé dans l'entete de réponse pour le navigateur
        context.res.setHeader(
          "Set-Cookie",
          `nom_dela_token=${token};httpOnly;secure;`
        );

        // Envoie du succès dans le corps de la réponse
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(error);
    }
  }
}
