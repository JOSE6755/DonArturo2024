interface IOrderCommonAttributes {
  orderId: number;
}

export interface IOrderCreateAttributes {
  userId: number;
  total: number;
}

export interface IOrderUpdateStateAttributes extends IOrderCommonAttributes {
  stateId: number;
}

// export interface IOrderGetAllByStateAttributes {
//   stateId: number;
// }

export interface IOrderFetchAttributes extends IOrderCommonAttributes {
  total: number;
  creationDate: Date;
  state: string;
}

export interface IOrderFetchDetailAttributes extends IOrderCommonAttributes {
  productId: number;
  quantity: number;
  price: number;
  subTotal: number;
  name: string;
}
