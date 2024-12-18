import { Request, Response } from "express";
import { Category } from "../models/category";
import { ICategoryOperations } from "../services/category";
import {
  CategoryCreationAttributes,
  CategoryUpdateAttributes,
  CategoryUpdateStateAttributes,
} from "../models/interfaces/category";

export class CategoryController {
  private categoryService: ICategoryOperations;
  constructor(categoryService: ICategoryOperations) {
    this.categoryService = categoryService;
  }

  public async getCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories: Category[] = await this.categoryService.getAllCategories();
      res.status(200).json(categories);
      return;
    } catch (error: any) {
      console.log(error);
      res.status(500).json(`Error fetching categories: ${error.message}`);
    }
  }

  public async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const newCategory: CategoryCreationAttributes = { name: data.name };
      const category = await this.categoryService.createCategory(newCategory);
      res.status(200).json(category);
    } catch (error: any) {
      console.log(error);
      res.status(500).json(`Error creating category: ${error.message}`);
    }
  }

  public async updateCategory(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const updateData: CategoryUpdateAttributes = { categoryId: Number(req.params.id), name: data.name };
      const category: Category = await this.categoryService.updateCategory(updateData);
      res.status(200).json(category);
    } catch (error: any) {
      console.log(error);
      res.status(500).json(`Error updating category: ${error.message}`);
    }
  }
  public async updateCategoryState(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const updateData: CategoryUpdateStateAttributes = { categoryId: Number(req.params.id), stateId: data.stateId };
      const category: Category = await this.categoryService.updateCategoryState(updateData);
      res.status(200).json(category);
    } catch (error: any) {
      console.log(error);
      res.status(500).json(`Error updating category: ${error.message}`);
    }
  }
}
