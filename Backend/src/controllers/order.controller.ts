import { Request, Response } from "express";
import { IOrderOperation } from "../services/order";
import {
  IOrderCreateAttributes,
  IOrderFetchAttributes,
  IOrderFetchDetailAttributes,
  IOrderUpdateStateAttributes,
} from "../models/interfaces/order";

export class OrderController {
  private orderService: IOrderOperation;
  constructor(orderService: IOrderOperation) {
    this.orderService = orderService;
  }
  public async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const { stateId } = req.query;
      const order: IOrderFetchAttributes[] = await this.orderService.getAllOrders(Number(stateId));
      res.status(200).json(order);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ msg: `Error fetching orders: ${error.message}` });
    }
  }

  public async getAllOrderByUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.userInfo!.userId;
      const order: IOrderFetchAttributes[] = await this.orderService.getAllOrderByUser(userId);
      res.status(200).json(order);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ msg: `Error fetching orders by user: ${error.message}` });
    }
  }

  public async getOrderDetail(req: Request, res: Response): Promise<void> {
    try {
      const orderId = Number(req.params.id);
      const detail: IOrderFetchDetailAttributes[] = await this.orderService.getOrderDetail(orderId);
      res.status(200).json(detail);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ msg: `Error fetching order detail: ${error.message}` });
    }
  }
  public async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.userInfo?.userId;
      const data = req.body;
      const newOrder: IOrderCreateAttributes = { userId: userId, ...data };
      const order = await this.orderService.createOrder(newOrder);
      res.status(200).json(order);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ msg: `Error creating order: ${error.message}` });
    }
  }
  public async updateOrderState(req: Request, res: Response): Promise<void> {
    try {
      const orderId = Number(req.params.id);
      const data = req.body;
      const newOrder: IOrderUpdateStateAttributes = { orderId: orderId, ...data };
      const order = await this.orderService.updateOrderState(newOrder);
      res.status(200).json(order);
    } catch (error: any) {
      console.error(error);
      throw new Error(`Error updating order state: ${error.message}`);
    }
  }
}
