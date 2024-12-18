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
exports.CategoryController = void 0;
class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    getCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield this.categoryService.getAllCategories();
                res.status(200).json(categories);
                return;
            }
            catch (error) {
                console.log(error);
                res.status(500).json(`Error fetching categories: ${error.message}`);
            }
        });
    }
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const newCategory = { name: data.name };
                const category = yield this.categoryService.createCategory(newCategory);
                res.status(200).json(category);
            }
            catch (error) {
                console.log(error);
                res.status(500).json(`Error creating category: ${error.message}`);
            }
        });
    }
    updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const updateData = { categoryId: Number(req.params.id), name: data.name };
                const category = yield this.categoryService.updateCategory(updateData);
                res.status(200).json(category);
            }
            catch (error) {
                console.log(error);
                res.status(500).json(`Error updating category: ${error.message}`);
            }
        });
    }
    updateCategoryState(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const updateData = { categoryId: Number(req.params.id), stateId: data.stateId };
                const category = yield this.categoryService.updateCategoryState(updateData);
                res.status(200).json(category);
            }
            catch (error) {
                console.log(error);
                res.status(500).json(`Error updating category: ${error.message}`);
            }
        });
    }
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map