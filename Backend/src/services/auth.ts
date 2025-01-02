import { User } from "../models/user";
import { comparePassword } from "../utils/encryption";
import { IUserOperations } from "./user";
import jwt from "jsonwebtoken";
export interface IAuthOperations {
  generateJWT(email: string, password: string): Promise<{ token: string; roleId: number; shopCartId: number }>;
}

export class AuthService implements IAuthOperations {
  private userService: IUserOperations;
  constructor(userService: IUserOperations) {
    this.userService = userService;
  }
  public async generateJWT(
    email: string,
    password: string,
  ): Promise<{ token: string; roleId: number; shopCartId: number }> {
    try {
      const user: User = await this.userService.getUser(undefined, email);
      if (!(await comparePassword(password, user))) {
        throw new Error(`Incorrect password`);
      }
      if (user.state?.stateId === 2) {
        throw new Error(`User ${email} is not active`);
      }
      const token = jwt.sign({ userId: user.userId, role: user.roleId }, process.env.SECRET_KEY || "secreto", {
        expiresIn: "1d",
      });
      return { token: token, roleId: user.roleId!, shopCartId: user.shopCart!.idShopCart! };
    } catch (error: any) {
      console.error(error);
      throw new Error(`Error generating JWT: ${error.message}`);
    }
  }
}
