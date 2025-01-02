interface IShopCartCommonAttributes {
  quantity: number;
  price: number;
  subTotal: number;
}

interface IShopCartCommonKeys {
  shopCartId: number;
  productId: number;
}

export interface IShopCartInsertAttributes extends IShopCartCommonAttributes, IShopCartCommonKeys {}

export interface IShopCartFetchAttributes extends IShopCartCommonAttributes {
  productId: number;
  name: string;
}

export interface IShopCartFetchTotalAttributes {
  products: IShopCartFetchAttributes[];
  total: number;
}

export interface IShopCartUpdateRowAtrributes extends IShopCartCommonAttributes, IShopCartCommonKeys {
  shopCartDetailId: number;
}

export type IShopCartRemoveRecordAttributes = IShopCartCommonKeys;

export interface IShopCartEmptyAtrributes {
  shopCartId: number;
}
