import { Op, QueryTypes } from "sequelize";
import {
  IOrderCreateAttributes,
  IOrderFetchAttributes,
  IOrderFetchDetailAttributes,
  IOrderUpdateStateAttributes,
} from "../models/interfaces/order";
import { Order } from "../models/order";
import { db } from "../database/config";
import { IUserOperations } from "./user";

export interface IOrderOperation {
  getAllOrders(stateId: number): Promise<IOrderFetchAttributes[]>;
  getAllOrderByUser(userId: number): Promise<IOrderFetchAttributes[]>;
  getOrderDetail(orderId: number): Promise<IOrderFetchDetailAttributes[]>;
  createOrder(data: IOrderCreateAttributes): Promise<IOrderFetchAttributes>;
  updateOrderState(data: IOrderUpdateStateAttributes): Promise<IOrderFetchAttributes>;
}

export class OrderService implements IOrderOperation {
  private userService: IUserOperations;
  constructor(userService: IUserOperations) {
    this.userService = userService;
  }
  public async getAllOrders(stateId: number): Promise<IOrderFetchAttributes[]> {
    try {
      const result = await Order.findAll({
        where: {
          stateId: {
            [Op.eq]: stateId,
          },
        },
        attributes: ["orderId", "total", "creationDate", "stateId"],
      });
      return result as unknown as IOrderFetchAttributes[];
    } catch (error: any) {
      console.error(error);
      throw new Error(`Error fetching orders: ${error.message}`);
    }
  }
  public async getAllOrderByUser(userId: number): Promise<IOrderFetchAttributes[]> {
    if (!(await this.userService.getUser(userId))) {
      throw new Error(`User ${userId} does not exist`);
    }
    try {
      const result = await db.query("SELECT OrderId,Total,CreationDate,State FROM OrderByUser WHERE UserId = $1", {
        bind: [userId],
        type: QueryTypes.SELECT,
        raw: true,
      }); //await Order.findAll({
      //   where: {
      //     userId: {
      //       [Op.eq]: userId,
      //     },
      //   },
      //   attributes: ["orderId", "total", "creationDate", "stateId"],
      //   include: {},
      // });
      return result as IOrderFetchAttributes[];
    } catch (error: any) {
      console.error(error);
      throw new Error(`Error fetching orders for user with id: ${userId} : ${error.message}`);
    }
  }
  public async getOrderDetail(orderId: number): Promise<IOrderFetchDetailAttributes[]> {
    if (!(await this.orderExists(orderId))) {
      throw new Error(`Order with id ${orderId} does not exist`);
    }
    try {
      const result = await db.query("SELECT * FROM ShowOrderDetail WHERE OrderId = $1", {
        bind: [orderId],
        raw: true,
        type: QueryTypes.SELECT,
      });
      return result as IOrderFetchDetailAttributes[];
    } catch (error: any) {
      console.error(error);
      throw new Error(`Error fetching detail for order: ${orderId}:${error.message}`);
    }
  }
  public async createOrder(data: IOrderCreateAttributes): Promise<IOrderFetchAttributes> {
    if (!(await this.userService.getUser(data.userId))) {
      throw new Error(`User ${data.userId} does not exist`);
    }
    try {
      const result = await db.query("EXEC CreateOrders @Total = $1, @UserId = $2", {
        bind: [data.total, data.userId],
        raw: true,
        type: QueryTypes.SELECT,
        plain: true,
      });
      return result as IOrderFetchAttributes;
    } catch (error: any) {
      console.error(error);
      throw new Error(`Error creating order: ${error.message}`);
    }
  }
  public async updateOrderState(data: IOrderUpdateStateAttributes): Promise<IOrderFetchAttributes> {
    if (!(await this.orderExists(data.orderId))) {
      throw new Error(`Order with id ${data.orderId} does not exist`);
    }
    try {
      const result = await db.query("EXEC UpdateOrderState @OrderId = $1, @StateId = $2", {
        bind: [data.orderId, data.stateId],
        raw: true,
        type: QueryTypes.SELECT,
        plain: true,
      });
      return result as IOrderFetchAttributes;
    } catch (error: any) {
      console.error(error);
      throw new Error(`Error updating order state: ${error.message}`);
    }
  }

  private async orderExists(orderId: number): Promise<boolean> {
    try {
      const result = await Order.findByPk(orderId);
      return result ? true : false;
    } catch (error: any) {
      console.error(error);
      throw new Error(`Error fetching order: ${orderId}: ${error.message}`);
    }
  }
}
