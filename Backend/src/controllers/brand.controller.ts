import { Request, Response } from "express";
import { IBrandOperations } from "../services/brand";
import { Brand } from "../models/brand";
import { IBrandCreationAttributes, IBrandUpdateAttributes } from "../models/interfaces/brand";

export class BrandController {
  private brandService: IBrandOperations;
  constructor(brandService: IBrandOperations) {
    this.brandService = brandService;
  }

  public async getBrand(req: Request, res: Response): Promise<void> {
    try {
      const brands: Brand[] = await this.brandService.getAllBrands();
      res.status(200).json(brands);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ msg: `Error fetching brands: ${error.message}` });
    }
  }
  public async createBrand(req: Request, res: Response): Promise<void> {
    try {
      const newBrand: IBrandCreationAttributes = req.body;
      const brand: Brand = await this.brandService.createBrand(newBrand);
      res.status(200).json(brand);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ msg: `Error during brand creation: ${error.message}` });
    }
  }

  public async updateBrand(req: Request, res: Response): Promise<void> {
    try {
      const brandId = Number(req.params.id);
      const { name } = req.body;
      const brand: IBrandUpdateAttributes = { brandId: brandId, name: name };
      const updateBrand: Brand = await this.brandService.updateBrand(brand);
      res.status(200).json(updateBrand);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ msg: `Error during brand update: ${error.message}` });
    }
  }
}
