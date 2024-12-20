import { Request, Response } from "express";
import { IUserOperations } from "../services/user";
import { User } from "../models/user";
import {
  IUserCreateAttributes,
  IUserFetchAttributes,
  IUserUpdateAttributes,
  IUserUpdatePasswordAttributes,
  IUserUpdateStateAttributes,
} from "../models/interfaces/user";

export class UserController {
  private userService: IUserOperations;
  constructor(userService: IUserOperations) {
    this.userService = userService;
  }

  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users: User[] = await this.userService.getUsers();
      res.status(200).json(users);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ msg: `Error fetching users: ${error.message}` });
    }
  }

  public async getUser(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const user: User = await this.userService.getUser(id);
      res.status(200).json(user);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ msg: `Error fetching user: ${error.message}` });
    }
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const data: IUserCreateAttributes = req.body;
      const user: IUserFetchAttributes = await this.userService.createUser(data);
      res.status(200).json(user);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ msg: `Error creating user: ${error.message}` });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = Number(req.params.id);
      const data = req.body;
      const user: IUserUpdateAttributes = { userId: userId, ...data };
      const updatedUser: IUserFetchAttributes = await this.userService.updateUser(user);
      res.status(200).json(updatedUser);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ msg: `Error updating user: ${error.message}` });
    }
  }

  public async updateUserState(req: Request, res: Response): Promise<void> {
    try {
      const userId = Number(req.params.id);
      const data = req.body;
      const user: IUserUpdateStateAttributes = { userId: userId, ...data };
      const updatedUser: IUserFetchAttributes = await this.userService.updateState(user);
      res.status(200).json(updatedUser);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ msg: `Error updating user: ${error.message}` });
    }
  }

  public async updateUserPassword(req: Request, res: Response): Promise<void> {
    try {
      const userId = Number(req.params.id);
      const data = req.body;
      const user: IUserUpdatePasswordAttributes = { userId: userId, ...data };
      const updatedUser = await this.userService.UpdatePassword(user);
      res.status(200).json(updatedUser);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ msg: `Error updating user password: ${error.message}` });
    }
  }
}
