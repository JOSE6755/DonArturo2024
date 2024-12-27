import { Request, Response } from "express";
import { IShopCartOperations } from "../services/shopCart";
import {
  IShopCartFetchAttributes,
  IShopCartFetchTotalAttributes,
  IShopCartInsertAttributes,
  IShopCartRemoveRecordAttributes,
  IShopCartUpdateRowAtrributes,
} from "../models/interfaces/shopCart";

export class ShopCartController {
  private shopCartService: IShopCartOperations;
  constructor(shopCartService: IShopCartOperations) {
    this.shopCartService = shopCartService;
  }

  public async getShopCart(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const shopCart: IShopCartFetchTotalAttributes = await this.shopCartService.getShopCart(id);
      res.status(200).json(shopCart);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ msg: `Error fetching shop cart: ${error.message}` });
    }
  }
  public async insertShopCart(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const newProduct: IShopCartInsertAttributes = { shopCartId: id, ...data };
      const inserted = await this.shopCartService.insertShopCart(newProduct);
      res.status(200).json(inserted);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ msg: `Error inserting product: ${error.message}` });
    }
  }

  public async updateShopCart(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const newProduct: IShopCartUpdateRowAtrributes = { shopCartId: id, ...data };
      const updated = await this.shopCartService.updateShopCart(newProduct);
      res.status(200).json(updated);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ msg: `Error updating cart: ${error.message}` });
    }
  }

  public async removeShopCartRecord(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const product: IShopCartRemoveRecordAttributes = { shopCartId: id, ...data };
      const removedProduct: IShopCartFetchAttributes = await this.shopCartService.removeShopCartRecord(product);
      res.status(200).json(removedProduct);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ msg: `Error deleting product from shop cart: ${error.message}` });
    }
  }

  public async emptyShopCart(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const result = await this.shopCartService.emptyShopCart(id);
      res.status(200).send(result);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ msg: `Error emptying cart: ${error.message}` });
    }
  }
}
