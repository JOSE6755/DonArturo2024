import { genSalt, hash } from "bcrypt";
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
