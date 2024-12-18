import { Request, Response } from "express";
import { Product } from "../models/products";
import { Brand } from "../models/brand";
import { Category } from "../models/category";
import { State } from "../models/state";
import { db } from "../database/config";
import { Op, QueryTypes } from "sequelize";
import fs from "fs";
import path from "path";

export async function getAllActiveProducts(req: Request, res: Response): Promise<void> {
  const products = await getAllProducts(true);
  res.status(200).json({ products });
}

async function getAllProducts(onlyActive = false): Promise<Product[]> {
  const [products]: [Product[]] = await Promise.all([
    Product.findAll({
      include: [
        {
          model: Brand,
          as: "brand",
          attributes: ["name"],
        },
        {
          model: State,
          as: "state",
          attributes: ["name"],
        },
        {
          model: Category,
          as: "categories",
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
      where: onlyActive ? { stateId: { [Op.eq]: 1 } } : {},
    }),
  ]);

  return products;
}

export async function createProduct(req: Request, res: Response): Promise<void> {
  if (!req.file) {
    res.status(400).json({
      msg: "File not provided",
    });
    return;
  }
  const image = req.file.filename;
  try {
    const productInfo = req.body.productInfo;
    const { name, code, stock, price, stateId, brandId } = productInfo;
    const result = await db.query(
      "EXEC CreateProducts @Name = $1, @Code = $2, @Stock = $3, @Price = $4, @Image = $5, @StateId = $6, @BrandId = $7",
      {
        bind: [name, code, stock, price, image, stateId, brandId],
        type: QueryTypes.SELECT,
      },
    );
    res.status(200).json({
      msg: "Product created successfully!",
      body: result,
    });
  } catch (error: any) {
    await fs.promises.unlink(req.file.path);
    res.status(500).json({ msg: `Error during product creation: ${error.message}` });
    console.log(error);
  }
}

export async function updateProduct(req: Request, res: Response): Promise<void> {
  const productId = Number(req.params.id);
  let product: Product | null;
  try {
    product = await Product.findByPk(productId);
    if (!product) {
      res.status(404).json({ msg: "Product not found" });
      return;
    }
  } catch (error: any) {
    res.status(500).json({ msg: `Error during product search: ${error.message}` });
    return;
  }

  if (req.file) {
    try {
      const imagePath = path.join(__dirname, "../productImage", product.image);
      await fs.promises.unlink(imagePath);
    } catch (error: any) {
      res.status(500).json({
        msg: `It was not possible to delete the image: ${error.message}`,
      });
      return;
    }
  }

  try {
    const productInfo = req.body.productInfo;
    const { name, code, stock, price, stateId, brandId } = productInfo;
    const params = req.file
      ? [productId, name, code, stock, price, stateId, req.file.filename, brandId]
      : [productId, name, code, stock, price, stateId, product.image, brandId];
    const result = await db.query(
      "EXEC UpdateProduct @ProductId = $1, @Name = $2, @Code = $3, @Stock = $4, @Price = $5, @StateId = $6, @Image = $7, @BrandId = $8",
      { bind: params, type: QueryTypes.SELECT },
    );
    res.status(200).json({
      msg: "Product updated successfully",
      result: result,
    });
  } catch (error: any) {
    res.status(500).json({ msg: `Error during product update: ${error.message}` });
  }
}

export async function changeProductState(req: Request, res: Response): Promise<void> {
  const productId = req.params.id;
  const product = await Product.findByPk(productId);
  if (!product) {
    res.status(404).json({ msg: "Product not found" });
    return;
  }
  const { stateId } = req.body;
  try {
    const result = await db.query("EXEC UpdateProductState @ProductId = $1, @StateId = $2;", {
      bind: [productId, stateId],
      type: QueryTypes.UPDATE,
    });

    res.json({
      msg: "Product updated successfully",
      result: result,
    });
  } catch (error: any) {
    res.json({ msg: `Error changing product state: ${error.message}` });
  }
}
