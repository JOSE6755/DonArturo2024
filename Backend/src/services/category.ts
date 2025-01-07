import { QueryTypes } from "sequelize";
import { db } from "../database/config";
import { Category } from "../models/category";
import {
  CategoryCreationAttributes,
  CategoryUpdateAttributes,
  CategoryUpdateStateAttributes,
} from "../models/interfaces/category";

export interface ICategoryOperations {
  getAllCategories(): Promise<Category[]>;
  createCategory(data: CategoryCreationAttributes): Promise<Category>;
  updateCategory(data: CategoryUpdateAttributes): Promise<Category>;
  updateCategoryState(data: CategoryUpdateStateAttributes): Promise<Category>;
}

export class CategoryService implements ICategoryOperations {
  public async getAllCategories(): Promise<Category[]> {
    try {
      const categories: Category[] = await Category.findAll();
      return categories;
    } catch (error: any) {
      console.log("Error at categoryServce: ", error);
      throw new Error(`Error fetching categories: ${error.message}`);
    }
  }

  public async createCategory(data: CategoryCreationAttributes): Promise<Category> {
    try {
      const category: Category[] = await db.query("EXEC CreateCategories @Name = $1", {
        bind: [data.name],
        type: QueryTypes.SELECT,
      });
      return category[0];
    } catch (error: any) {
      console.log("Error at categoryService: createCategory:", error);
      throw new Error(`Error during category creation: ${error.message}`);
    }
  }

  public async updateCategory(data: CategoryUpdateAttributes) {
    try {
      const category: Category[] = await db.query("EXEC UpdateCategory @CategoryId = $1, @Name = $2", {
        bind: [data.categoryId, data.name],
        type: QueryTypes.SELECT,
      });
      return category[0];
    } catch (error: any) {
      console.log("Error at categoryService: updateCategory: ", error);
      throw new Error(`Error during category updating: ${error.message} `);
    }
  }
  public async updateCategoryState(data: CategoryUpdateStateAttributes) {
    try {
      const category: Category[] = await db.query("EXEC UpdateCategoryState @CategoryId = $1, @StateId = $2", {
        bind: [data.categoryId, data.stateId],
        type: QueryTypes.SELECT,
      });
      return category[0];
    } catch (error: any) {
      console.log("Error at categoryService: updateCategoryState: ", error);
      throw new Error(`Error during categoryState updating: ${error.message} `);
    }
  }
}
