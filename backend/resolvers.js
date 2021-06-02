import { User } from "./models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const resolvers = {
  Query: {
    getAllUsers(_, args, { user }, info) {
      if (user) {
        return User.find();
      } else {
        throw new Error("please login");
      }
    },
  },

  Mutation: {
    async register(parent, args, ctx, info) {
      const { email, password, name } = args;
      if (!email || !password || !name) {
        throw new Error("Fill in all the fields");
      }
      const duplicateUser = await User.findOne({ email });
      if (duplicateUser) {
        throw new Error("User already exists");
      }
      try {
        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password, salt);

        let user = new User({ email, password: hashedPassword, name });
        await user.save();

        const userJwt = { name: name, email: email };
        let token = jwt.sign(userJwt, process.env.TOKEN_SECRET);

        return { token };
      } catch (err) {
        throw new Error(err);
      }
    },
    login: async (parent, args, ctx, info) => {
      let { email, password } = args;
      if ((!email, !password)) throw new Error("Fill in all the details");

      try {
        const user = await User.findOne({ email });
        if (!user) throw new Error("user not found");

        let passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) throw new Error("invalid password");
        const userJwt = { name: user.name, email: user.email };
        const accessToken = jwt.sign(userJwt, process.env.TOKEN_SECRET);

        return { token: accessToken };
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
