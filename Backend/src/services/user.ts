import { Op, QueryTypes } from "sequelize";
import { db } from "../database/config";
import {
  IUserCreateAttributes,
  IUserFetchAttributes,
  IUserUpdateAttributes,
  IUserUpdatePasswordAttributes,
  IUserUpdateStateAttributes,
} from "../models/interfaces/user";
import { User } from "../models/user";
import { encryptPassword } from "../utils/encryption";

export interface IUserOperations {
  getUsers(): Promise<User[]>;
  //userExists(id: number): Promise<boolean>;
  getUser(id?: number, email?: string): Promise<User>;
  createUser(data: IUserCreateAttributes): Promise<IUserFetchAttributes>;
  updateUser(data: IUserUpdateAttributes): Promise<IUserFetchAttributes>;
  updateState(data: IUserUpdateStateAttributes): Promise<IUserFetchAttributes>;
  UpdatePassword(data: IUserUpdatePasswordAttributes): Promise<IUserFetchAttributes>;
}

export class UserService implements IUserOperations {
  public async getUsers(): Promise<User[]> {
    try {
      const users: User[] = await User.findAll({ attributes: { exclude: ["password", "creationDate"] } });
      return users;
    } catch (error: any) {
      console.log(error);
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  public async getUser(id?: number, email?: string): Promise<User> {
    try {
      if (id) {
        const user: User | null = await User.findByPk(id, {
          attributes: { exclude: ["password", "creationDate"] },
        });
        if (!user) {
          throw new Error(`User ${id} not found`);
        }
        return user;
      }
      const user: User | null = await User.findOne({
        where: {
          email: {
            [Op.eq]: email,
          },
        },
        include: [User.associations.state, User.associations.role, User.associations.shopCart],
      });
      if (!user) {
        throw new Error(`User ${email} not found`);
      }
      return user;
    } catch (error: any) {
      console.error(error);
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  public async createUser(data: IUserCreateAttributes): Promise<IUserFetchAttributes> {
    try {
      data.password = await encryptPassword(data.password);
      const user = await db.query(
        "EXEC CreateUser @Names = $1, @LastNames = $2, @Email = $3, @Password = $4, @PhoneNumber = $5, @BirthDate = $6, @Adress = $7, @RoleId = $8, @ClientId = $9",
        {
          bind: [
            data.names,
            data.lastNames,
            data.email,
            data.password,
            data.phoneNumber,
            data.birthDate,
            data.address,
            data.roleId,
            data.clientId ?? null,
          ],
          type: QueryTypes.SELECT,
          plain: true,
          raw: true,
        },
      );
      return user as IUserFetchAttributes;
    } catch (error: any) {
      console.error(error);
      throw new Error(`Error creating user: ${error.message}`);
    }
  }
  public async updateUser(data: IUserUpdateAttributes): Promise<IUserFetchAttributes> {
    try {
      if (!(await this.getUser(data.userId))) {
        throw new Error(`User ${data.userId} does not exist`);
      }
      const user = await db.query(
        "EXEC UpdateUserInfo @UserId = $1, @Names = $2, @LastNames = $3, @Email = $4, @PhoneNumber = $5, @Adress = $6, @RoleId = $7, @ClientId = $8",
        {
          bind: [
            data.userId,
            data.names,
            data.lastNames,
            data.email,
            data.phoneNumber,
            data.address,
            data.roleId,
            data.clientId ?? null,
          ],
          plain: true,
          type: QueryTypes.SELECT,
          raw: true,
        },
      );
      console.log(user);

      return user as IUserFetchAttributes;
    } catch (error: any) {
      console.error(error);
      throw new Error(`Error during updateUser: ${error.message}`);
    }
  }
  public async updateState(data: IUserUpdateStateAttributes): Promise<IUserFetchAttributes> {
    try {
      if (!(await this.getUser(data.userId))) {
        throw new Error(`User ${data.userId} does not exist`);
      }
      const user = await db.query("EXEC UpdateUserState @UserId = $1, @StateId = $2; ", {
        bind: [data.userId, data.stateId],
        plain: true,
        type: QueryTypes.SELECT,
        raw: true,
      });
      return user as IUserFetchAttributes;
    } catch (error: any) {
      console.error(error);
      throw new Error(`Error during user state update: ${error.message}`);
    }
  }
  public async UpdatePassword(data: IUserUpdatePasswordAttributes): Promise<IUserFetchAttributes> {
    try {
      if (!(await this.getUser(data.userId))) {
        throw new Error(`User ${data.userId} does not exist`);
      }
      data.password = await encryptPassword(data.password);
      const user = await db.query("EXEC UpdateUserPassword @UserId = $1, @UserPassword = $2", {
        bind: [data.userId, data.password],
        plain: true,
        type: QueryTypes.SELECT,
        raw: true,
      });
      return user as IUserFetchAttributes;
    } catch (error: any) {
      console.error(error);
      throw new Error(`Error during user password update: ${error.message}`);
    }
  }
}
