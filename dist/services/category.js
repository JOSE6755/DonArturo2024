"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../database/config");
const category_1 = require("../models/category");
class CategoryService {
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield category_1.Category.findAll();
                return categories;
            }
            catch (error) {
                console.log("Error at categoryServce: ", error);
                throw new Error(`Error fetching categories: ${error.message}`);
            }
        });
    }
    createCategory(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield config_1.db.query("EXEC CreateCategories @Name = $1", {
                    bind: [data.name],
                    type: sequelize_1.QueryTypes.SELECT,
                });
                return category[0];
            }
            catch (error) {
                console.log("Error at categoryService: createCategory:", error);
                throw new Error(`Error during category creation: ${error.message}`);
            }
        });
    }
    updateCategory(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield config_1.db.query("EXEC UpdateCategory @CategoryId = $1, @Name = $2", {
                    bind: [data.categoryId, data.name],
                    type: sequelize_1.QueryTypes.SELECT,
                });
                return category[0];
            }
            catch (error) {
                console.log("Error at categoryService: updateCategory: ", error);
                throw new Error(`Error during category updating: ${error.message} `);
            }
        });
    }
    updateCategoryState(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield config_1.db.query("EXEC UpdateCategoryState @CategoryId = $1, @StateId = $2", {
                    bind: [data.categoryId, data.stateId],
                    type: sequelize_1.QueryTypes.SELECT,
                });
                return category[0];
            }
            catch (error) {
                console.log("Error at categoryService: updateCategoryState: ", error);
                throw new Error(`Error during categoryState updating: ${error.message} `);
            }
        });
    }
}
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.js.map