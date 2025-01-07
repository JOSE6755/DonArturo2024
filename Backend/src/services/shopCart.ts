import { QueryTypes } from "sequelize";
import { db } from "../database/config";
import {
  IShopCartEmptyAtrributes,
  IShopCartFetchAttributes,
  IShopCartFetchTotalAttributes,
  IShopCartInsertAttributes,
  IShopCartRemoveRecordAttributes,
  IShopCartUpdateRowAtrributes,
} from "../models/interfaces/shopCart";
import { ShopCart } from "../models/shopCart";

export interface IShopCartOperations {
  getShopCart(id: number): Promise<IShopCartFetchTotalAttributes>;
  insertShopCart(data: IShopCartInsertAttributes): Promise<IShopCartFetchAttributes>;
  updateShopCart(data: IShopCartUpdateRowAtrributes): Promise<IShopCartFetchAttributes[]>;
  removeShopCartRecord(data: IShopCartRemoveRecordAttributes): Promise<IShopCartFetchAttributes>;
  emptyShopCart(id: number): Promise<IShopCartEmptyAtrributes>;
}

export class ShopCartService implements IShopCartOperations {
  public async getShopCart(id: number): Promise<IShopCartFetchTotalAttributes> {
    if (!(await this.existsShopCart(id))) {
      throw new Error(`ShopCart with id ${id} does not exist`);
    }
    try {
      const result = await db.query("EXEC SpecificShopCartDetails @ShopCartId=$1", {
        bind: [id],

        type: QueryTypes.SELECT,
        raw: true,
      });

      const total = result[result.length - 1] as { Total: number };
      const products = result.slice(0, result.length - 1) as IShopCartFetchAttributes[];
      const cartDetail: IShopCartFetchTotalAttributes = { products: products, total: total.Total };
      return cartDetail;
    } catch (error: any) {
      console.error(error);
      throw new Error(`Error fetching this shop cart: ${id}: ${error.message}`);
    }
  }
  public async insertShopCart(data: IShopCartInsertAttributes): Promise<IShopCartFetchAttributes> {
    if (!(await this.existsShopCart(data.shopCartId))) {
      throw new Error(`ShopCart with id ${data.shopCartId} does not exist`);
    }
    try {
      const result = await db.query(
        "EXEC CreateShopCartDetail @Quantity = $1, @Price = $2, @SubTotal = $3, @ShopCartId = $4, @ProductId = $5;",
        {
          bind: [data.quantity, data.price, data.subTotal, data.shopCartId, data.productId],
          raw: true,
          plain: true,
          type: QueryTypes.SELECT,
        },
      );
      return result as IShopCartFetchAttributes;
    } catch (error: any) {
      console.error(error);
      throw new Error(`Error inserting product: ${error.message}`);
    }
  }
  public async updateShopCart(data: IShopCartUpdateRowAtrributes): Promise<IShopCartFetchAttributes[]> {
    if (!(await this.existsShopCart(data.shopCartId))) {
      throw new Error(`ShopCart with id ${data.shopCartId} does not exist`);
    }
    try {
      const result = await db.query(
        "EXEC UpdateShopCartDetail @Quantity = $1, @Price = $2, @SubTotal = $3, @ShopCartId = $4, @ProductId = $5, @ShopCartDetailId = $6",
        {
          bind: [data.quantity, data.price, data.subTotal, data.shopCartId, data.productId, data.shopCartDetailId],
          type: QueryTypes.SELECT,
          raw: true,
        },
      );
      return result as IShopCartFetchAttributes[];
    } catch (error: any) {
      console.error(error);
      throw new Error(`Error updating cart: ${error.message}`);
    }
  }

  public async removeShopCartRecord(data: IShopCartRemoveRecordAttributes): Promise<IShopCartFetchAttributes> {
    if (!(await this.existsShopCart(data.shopCartId))) {
      throw new Error(`ShopCart with id ${data.shopCartId} does not exist`);
    }
    try {
      const result = await db.query("EXEC DeleteProductFromShopCartDetail @ProductId = $1, @ShopCartId = $2", {
        bind: [data.productId, data.shopCartId],
        type: QueryTypes.SELECT,
        raw: true,
        plain: true,
      });
      return result as IShopCartFetchAttributes;
    } catch (error: any) {
      console.error(error);
      throw new Error(`Error deleting product from shop cart: ${error.message}`);
    }
  }
  public async emptyShopCart(id: number): Promise<IShopCartEmptyAtrributes> {
    if (!(await this.existsShopCart(id))) {
      throw new Error(`ShopCart with id ${id} does not exist`);
    }
    try {
      await db.query("EXEC DeleteShopCartDetail @ShopCartId = $1", {
        bind: [id],
        type: QueryTypes.SELECT,
      });
      const result: IShopCartEmptyAtrributes = { shopCartId: id };
      return result;
    } catch (error: any) {
      console.error(error);
      throw new Error(`Error emptying shopCart: ${error.message}`);
    }
  }

  private async existsShopCart(id: number): Promise<boolean> {
    try {
      const result: ShopCart | null = await ShopCart.findByPk(id);
      return result ? true : false;
    } catch (error: any) {
      throw new Error(`Error fetching shopCart: ${error.message}`);
    }
  }
}
