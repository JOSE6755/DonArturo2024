interface CommonPorductAttributes {
  name: string;
  code: string;
  stock: number;
  price: number;
}

export interface ResponseProductsAttributes extends CommonPorductAttributes {
  image: string;
  brand: string;
  stateId: number;
  productId: number;
}

export interface CreateProductAttributes extends CommonPorductAttributes {
  categories: number[];
  brandId: number;
  image: string;
}

export interface UpdateProductAttributes extends CommonPorductAttributes {
  productId: number;
  categories: number[];
  brandId: number;
  image: string | null;
}

export interface UpdateProductStateAttributes {
  productId: number;
  stateId: number;
}

export interface ResponseProductListAttributes {
  products: ResponseProductsAttributes[];
  total: number;
  page: number;
  size: number;
}

export interface FilterProductAttributes {
  price: string;
  name: string;
  categories: string[];
  page: number;
  size: number;
}
