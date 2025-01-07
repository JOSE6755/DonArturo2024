import { array, mixed, number, object, string } from "yup";

export const CREATE_PRODUCT_SCHEMA = object({
  image: mixed()
    .test("required", "Image is required", (val, context) => {
      const { isEdit } = context.options.context;
      if (isEdit && typeof val === "string") {
        return typeof val === "string";
      }

      return val && val instanceof File;
    })
    .test("fileType", "Incorrect file format", (value) => {
      if (typeof value === "string") return true;
      return value ? ["image/jpeg", "image/png"].includes(value.type) : false;
    })
    .test(
      "fileSize",
      "File size too large, it has to be less than 10MB",
      (value) => {
        if (typeof value === "string") return true;
        return value ? value.size <= 10 * 1024 * 1024 : false;
      }
    ),
  name: string()
    .required("name is required")
    .max(100, "max name characters is 100"),
  code: string()
    .required("code is required")
    .max(50, "code max characters is 50")
    .trim()
    .matches(
      /^[0-9A-Za-z]{4,50}$/,
      "code must be a string with at least 4 numbers and only numbers"
    ),
  stock: number()
    .required("stock is required")
    .integer("stock must be an integer")
    .positive("stock must be a positive number")
    .min(1, "stock must be at least 1"),
  price: number()
    .required("price is required")
    .positive("price must be a positive number")
    .moreThan(0, "price must be greater than 0"),
  brandId: number()
    .required("brandId is required")
    .positive("brandId must be a positive number")
    .integer("brandId must be an integer")
    .min(1, "brandId must be at least 1"),
  categories: array()
    .of(
      number()
        .required("category is required")
        .integer("category must be an integer")
        .positive("category must not be none")
    )
    .min(1, "you have to select at least one category")
    .max(3, "Maximum number of categories is 3"),
});
