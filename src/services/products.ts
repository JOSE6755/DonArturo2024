import { Request, Response } from "express";
import { Product } from "../models/products";
import { Brand } from "../models/brand";
import { Category } from "../models/category";
import { State } from "../models/state";

export async function getAllProducts(
  req: Request,
  res: Response,
): Promise<void> {
  const products: Product[] = await Product.findAll({
    include: [
      {
        model: Brand,
        as: "brand",
      },
      {
        model: State,
        as: "state",
      },
      {
        model: Category,
        as: "categories",
      },
    ],
  });
  res.status(200).json({ products });
}

export function createProduct(req: Request, res: Response): void {
  res.status(200).json({
    msg: "Product created successfully!",
    body: req.body,
  });
}

export function updateProduct(req: Request, res: Response): void {
  res.status(200).json({
    msg: "Product updated successfully",
    body: req.body,
    id: req.params.id,
  });
}
