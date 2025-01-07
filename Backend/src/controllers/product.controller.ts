import { Request, Response } from "express";
import { IProductOperations } from "../services/products";
import {
  CreateProductAttributes,
  UpdateProductAttributes,
  UpdateProductStateAttributes,
} from "../models/interfaces/product";

export class ProductController {
  private productService: IProductOperations;
  constructor(productService: IProductOperations) {
    this.productService = productService;
  }

  public async getAllActiveProducts(req: Request, res: Response): Promise<void> {
    try {
      const {
        price = "DESC",
        name = "%%",
        page = 1,
        size = 10,
        categories = "",
      } = req.query as unknown as { price: string; name: string; page: string; size: string; categories: string };

      const categoryArray = categories ? categories.split(",") : [];
      const options = {
        price: price,
        name: name,
        categories: categoryArray,
        page: Number(page),
        size: Number(size),
        stateId: 1,
      };
      console.log(options);
      const products = await this.productService.getAllActiveProducts(options);
      res.status(200).json(products);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ msg: `Error fetching all active products: ${error.message}` });
    }
  }

  public async getAllProductsActiveInactive(req: Request, res: Response): Promise<void> {
    try {
      const {
        price = "DESC",
        name = "%%",
        page = 1,
        size = 10,
        categories = "",
        stateId = 1,
      } = req.query as unknown as {
        price: string;
        name: string;
        page: string;
        size: string;
        categories: string;
        stateId: number;
      };

      const categoryArray = categories ? categories.split(",") : [];
      const options = {
        price: price,
        name: name,
        categories: categoryArray,
        page: Number(page),
        size: Number(size),
        stateId: stateId,
      };

      const products = await this.productService.getAllProductsActiveInactive(options);
      res.status(200).json(products);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ msg: `Error fetching all products: ${error.message}` });
    }
  }

  public async getSingleProduct(req: Request, res: Response): Promise<void> {
    try {
      const productId = Number(req.params.id);
      const product = await this.productService.getSingleProduct(productId);
      res.status(200).json(product);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ msg: `Error fetching single product: ${error.message}` });
    }
  }
  public async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const image = req.file!.filename;
      const body = req.body as {
        productInfo: {
          name: string;
          code: string;
          stock: number;
          price: number;
          brandId: number;
          categories: number[];
        };
      };

      const newProduct: CreateProductAttributes = { image: image, ...body.productInfo };
      const product = await this.productService.createProduct(newProduct);
      res.status(200).json(product);
    } catch (error: any) {
      res.status(500).json({ msg: `Error during product creation: ${error.message}` });
    }
  }

  public async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const image = req.file?.filename;
      console.log(req.file);
      const body = req.body as {
        productInfo: {
          name: string;
          code: string;
          stock: number;
          price: number;
          stateId: number;
          brandId: number;
          categories: number[];
        };
      };
      const productId = Number(req.params.id);
      const newProduct: UpdateProductAttributes = {
        image: image ? image : null,
        productId: productId,
        ...body.productInfo,
      };
      const product = await this.productService.updateProduct(newProduct);
      res.status(200).json(product);
    } catch (error: any) {
      res.status(500).json({ msg: `Error during product update: ${error.message}` });
    }
  }

  public async changeProductState(req: Request, res: Response): Promise<void> {
    try {
      const productId = Number(req.params.id);
      const body = req.body;
      const newProduct: UpdateProductStateAttributes = { productId: productId, ...body };
      const product = await this.productService.changeProductState(newProduct);
      res.status(200).json(product);
    } catch (error: any) {
      res.status(500).json({ msg: `Error during change product state: ${error.message}` });
    }
  }
}
