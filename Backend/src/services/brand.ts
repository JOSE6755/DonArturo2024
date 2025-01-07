import { QueryTypes } from "sequelize";
import { db } from "../database/config";
import { Brand } from "../models/brand";
import { IBrandCreationAttributes, IBrandUpdateAttributes } from "../models/interfaces/brand";

export interface IBrandOperations {
  getAllBrands(): Promise<Brand[]>;
  createBrand(data: IBrandCreationAttributes): Promise<Brand>;
  updateBrand(data: IBrandUpdateAttributes): Promise<Brand>;
}

export class BrandService implements IBrandOperations {
  async getAllBrands(): Promise<Brand[]> {
    try {
      const brands: Brand[] = await Brand.findAll();
      return brands;
    } catch (error: any) {
      console.log("Errar at brandService: ", error);
      throw new Error(`Error at fetching brands: ${error.message}`);
    }
  }
  async createBrand(data: IBrandCreationAttributes): Promise<Brand> {
    try {
      const brand: Brand[] = await db.query("EXEC CreateBrands @Name = $1", {
        bind: [data.name],
        type: QueryTypes.SELECT,
      });
      return brand[0];
    } catch (error: any) {
      console.log("Error at brandService: createBrand: ", error);
      throw new Error(`Error creating Brand: ${error.message}`);
    }
  }
  async updateBrand(data: IBrandUpdateAttributes): Promise<Brand> {
    try {
      const brand: Brand[] = await db.query("EXEC UpdateBrand @BrandId = $1, @Name = $2", {
        bind: [data.brandId, data.name],
        type: QueryTypes.SELECT,
      });
      return brand[0];
    } catch (error: any) {
      console.log("Error updating Brand: ", error);
      throw new Error(`Error updating Brand: ${error.message}`);
    }
  }
}
