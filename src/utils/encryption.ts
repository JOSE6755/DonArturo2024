import { genSalt, hash, compare } from "bcrypt";
import { User } from "../models/user";
const saltRounds = 10;
export async function encryptPassword(password: string): Promise<string> {
  try {
    const salt = await genSalt(saltRounds);
    const encriptedPassword: string = await hash(password, salt);
    return encriptedPassword;
  } catch (error: any) {
    throw new Error(`Error encrypting password: ${error.message}`);
  }
}

export async function comparePassword(password: string, user: User): Promise<boolean> {
  try {
    const isEqual: boolean = await compare(password, user.password);
    return isEqual;
  } catch (error) {
    console.error(error);
    throw new Error(`Error verifying password`);
  }
}
