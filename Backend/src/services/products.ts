import { Product } from "../models/products";
import { db } from "../database/config";
import { QueryTypes } from "sequelize";
import fs from "fs";
import path from "path";
import {
  CreateProductAttributes,
  FilterProductAttributes,
  ResponseProductListAttributes,
  ResponseProductsAttributes,
  UpdateProductAttributes,
  UpdateProductStateAttributes,
} from "../models/interfaces/product";

export interface IProductOperations {
  getAllActiveProducts(options: FilterProductAttributes): Promise<ResponseProductListAttributes>;
  getAllProductsActiveInactive(options: FilterProductAttributes): Promise<ResponseProductListAttributes>;
  getSingleProduct(productId: number): Promise<ResponseProductsAttributes>;
  createProduct(data: CreateProductAttributes): Promise<ResponseProductsAttributes>;
  updateProduct(data: UpdateProductAttributes): Promise<ResponseProductsAttributes>;
  changeProductState(data: UpdateProductStateAttributes): Promise<ResponseProductsAttributes>;
}

export class ProductService implements IProductOperations {
  public async getAllActiveProducts({
    price = "DESC",
    name = "%%",
    categories = [],
    page = 1,
    size = 10,
    stateId = 1,
  }: FilterProductAttributes): Promise<ResponseProductListAttributes> {
    const products = await this.getAllProducts(true, { price, name, categories, page, size, stateId });
    return products;
  }

  public async getAllProductsActiveInactive({
    price = "DESC",
    name = "%%",
    categories = [],
    page = 1,
    size = 10,
    stateId = 1,
  }: FilterProductAttributes): Promise<ResponseProductListAttributes> {
    const products = await this.getAllProducts(false, { price, name, categories, page, size, stateId });
    return products;
  }

  private async getAllProducts(
    onlyActive = false,
    options: FilterProductAttributes,
  ): Promise<ResponseProductListAttributes> {
    console.log(options);
    let queryWithoutIn = `SELECT fp.productId,fp.Name,fp.Code,fp.Stock,fp.Price,fp.[Image],fp.StateId,fp.Brand,fp.BrandId,fp.Categories FROM FilterProducts fp WHERE fp.Name LIKE :name GROUP BY fp.ProductId,fp.Name,fp.Code,fp.Stock,fp.Price,fp.[Image],fp.StateId,fp.Brand,fp.BrandId, fp.Categories ORDER BY fp.Price ${options.price} OFFSET :offset ROWS FETCH NEXT :size ROWS ONLY`;
    const bindWithoutIn = { name: options.name, offset: (options.page - 1) * options.size, size: options.size };
    let queryWithIn = `SELECT fp.productId,fp.Name,fp.Code,fp.Stock,fp.Price,fp.[Image],fp.StateId,fp.Brand,fp.BrandId,fp.Categories FROM FilterProducts fp WHERE fp.Name LIKE :name AND ',' + fp.Categories + ',' LIKE '%,'+ :categories +',%' GROUP BY fp.ProductId,fp.Name,fp.Code,fp.Stock,fp.Price,fp.[Image],fp.StateId,fp.Brand,fp.BrandId,fp.Categories ORDER BY fp.Price ${options.price} OFFSET :offset ROWS FETCH NEXT :size ROWS ONLY`;
    const bindWithIn = {
      name: options.name,
      categories: options.categories,
      offset: (options.page - 1) * options.size,
      size: options.size,
    };
    if (onlyActive) {
      queryWithoutIn = `SELECT fp.productId,fp.Name,fp.Code,fp.Stock,fp.Price,fp.[Image],fp.StateId,fp.Brand,fp.BrandId,fp.Categories FROM FilterProducts fp WHERE fp.StateId= 1 AND fp.Name LIKE :name GROUP BY fp.ProductId,fp.Name,fp.Code,fp.Stock,fp.Price,fp.[Image],fp.StateId,fp.Brand,fp.BrandId,fp.Categories ORDER BY fp.Price ${options.price} OFFSET :offset ROWS FETCH NEXT :size ROWS ONLY`;
      queryWithIn = `SELECT fp.productId,fp.Name,fp.Code,fp.Stock,fp.Price,fp.[Image],fp.StateId,fp.Brand,fp.BrandId,fp.Categories FROM FilterProducts fp WHERE fp.stateId = 1 AND fp.Name LIKE :name AND ',' + fp.Categories + ',' LIKE '%,'+ :categories +',%' GROUP BY fp.ProductId,fp.Name,fp.Code,fp.Stock,fp.Price,fp.[Image],fp.StateId,fp.Brand,fp.BrandId,fp.Categories ORDER BY fp.Price ${options.price} OFFSET :offset ROWS FETCH NEXT :size ROWS ONLY`;
    }

    const finalQuery = options.categories.length > 0 ? queryWithIn : queryWithoutIn;
    const finalBind = options.categories.length > 0 ? bindWithIn : bindWithoutIn;
    console.log(finalQuery);
    console.log(finalBind);
    const products: ResponseProductsAttributes[] = await db.query(finalQuery, {
      raw: true,
      type: QueryTypes.SELECT,
      replacements: finalBind,
    });
    const queryCountWithoutIn = onlyActive
      ? "SELECT COUNT(DISTINCT p.ProductId) as total FROM Product p INNER JOIN CategoryProduct cp ON cp.ProductId = p.ProductId WHERE p.StateId = 1 AND p.Name LIKE :name"
      : "SELECT COUNT(DISTINCT p.ProductId) as total FROM Product p INNER JOIN CategoryProduct cp ON cp.ProductId = p.ProductId WHERE p.Name LIKE :name";
    const queryCountWithIn = onlyActive
      ? "SELECT COUNT(DISTINCT p.ProductId) as total FROM Product p INNER JOIN CategoryProduct cp ON cp.ProductId = p.ProductId WHERE p.StateId = 1 AND p.Name LIKE :name AND cp.CategoryId IN (:categories)"
      : "SELECT COUNT(DISTINCT p.ProductId) as total FROM Product p INNER JOIN CategoryProduct cp ON cp.ProductId = p.ProductId WHERE p.Name LIKE :name AND cp.CategoryId IN (:categories)";
    const finalQueryCount = options.categories.length > 0 ? queryCountWithIn : queryCountWithoutIn;
    const finalCountBind =
      options.categories.length > 0 ? { name: options.name, categories: options.categories } : { name: options.name };
    const total: { total: number } | null = await db.query(finalQueryCount, {
      type: QueryTypes.SELECT,
      raw: true,
      plain: true,
      replacements: finalCountBind,
    });
    console.log(total);

    const result: ResponseProductListAttributes = {
      products: products,
      total: total!.total,
      page: options.page,
      size: options.size,
    };
    return result;
  }

  public async getSingleProduct(productId: number): Promise<ResponseProductsAttributes> {
    const product = await this.existProduct(productId);
    if (!product) {
      throw new Error(`Product ${productId} not found`);
    }

    try {
      const product = await db.query("SELECT * FROM SingleProduct sp WHERE sp.ProductId = $1", {
        raw: true,
        type: QueryTypes.SELECT,
        bind: [productId],
        plain: true,
      });
      return product as ResponseProductsAttributes;
    } catch (error) {
      console.error(error);
      throw new Error(`Product fetching ${productId} failed`);
    }
  }

  public async createProduct(data: CreateProductAttributes): Promise<ResponseProductsAttributes> {
    try {
      const stringCategories = data.categories.join(",");
      //const productInfo = req.body.productInfo;
      //const { name, code, stock, price, stateId, brandId } = productInfo;
      const result = await db.query(
        "EXEC CreateProducts @Name = $1, @Code = $2, @Stock = $3, @Price = $4, @Image = $5, @BrandId = $6, @Categories = $7",
        {
          bind: [data.name, data.code, data.stock, data.price, data.image, data.brandId, stringCategories],
          type: QueryTypes.SELECT,
          raw: true,
          plain: true,
        },
      );

      return result as ResponseProductsAttributes;
    } catch (error: any) {
      console.error(error);
      await fs.promises.unlink(path.join(__dirname, "../productImage", data.image));
      throw new Error(`Error during product creation: ${error.message}`);
    }
  }

  public async updateProduct(data: UpdateProductAttributes): Promise<ResponseProductsAttributes> {
    const product = await this.existProduct(data.productId);
    if (!product) {
      throw new Error(`Product ${data.productId} not found`);
    }

    if (data.image && product.image) {
      try {
        const imagePath = path.join(__dirname, "../productImage", product.image);
        await fs.promises.unlink(imagePath);
      } catch (error: any) {
        throw new Error(`It was not possible to delete the image: ${error.message}`);
      }
    }

    try {
      const params = data.image
        ? [
            data.productId,
            data.name,
            data.code,
            data.stock,
            data.price,
            data.image,
            data.brandId,
            data.categories.join(","),
          ]
        : [
            data.productId,
            data.name,
            data.code,
            data.stock,
            data.price,
            product.image,
            data.brandId,
            data.categories.join(","),
          ];
      const result = await db.query(
        "EXEC UpdateProduct @ProductId = $1, @Name = $2, @Code = $3, @Stock = $4, @Price = $5, @Image = $6, @BrandId = $7,@Categories = $8",
        { bind: params, type: QueryTypes.SELECT, raw: true, plain: true },
      );

      return result as ResponseProductsAttributes;
    } catch (error: any) {
      console.error(error);
      if (data.image) {
        await fs.promises.unlink(path.join(__dirname, "../productImage", data.image));
      }

      throw new Error(`Error during product update: ${error.message}`);
      //res.status(500).json({ msg: `Error during product update: ${error.message}` });
    }
  }

  public async changeProductState(data: UpdateProductStateAttributes): Promise<ResponseProductsAttributes> {
    const product = await this.existProduct(data.productId);
    if (!product) {
      throw new Error(`Product ${data.productId} not found`);
    }

    try {
      const inactiveCategory = await db.query(
        "SELECT Name FROM CheckCategoryState WHERE StateId = 2 AND ProductId = $1",
        {
          bind: [data.productId],
          type: QueryTypes.SELECT,
          raw: true,
        },
      );
      if (inactiveCategory.length > 0) {
        throw new Error(`Product ${data.productId} has a inactive category`);
      }
      const result = await db.query("EXEC UpdateProductState @ProductId = $1, @StateId = $2;", {
        bind: [data.productId, data.stateId],
        type: QueryTypes.SELECT,
        raw: true,
        plain: true,
      });

      return result as ResponseProductsAttributes;
    } catch (error: any) {
      throw new Error(`Error changing product state: ${error.message}`);
    }
  }

  private async existProduct(productId: number): Promise<Product | null> {
    try {
      const product = await Product.findByPk(productId);
      return product;
    } catch (error: any) {
      console.error(error);
      throw new Error(`Error fetching product ${productId}: ${error.message}`);
    }
  }
}
