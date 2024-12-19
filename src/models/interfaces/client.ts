export interface ICreateClientAttributes {
  commercialName: string;
  address: string;
  phoneNumber: string;
  commercialEmail: string;
}

export interface IUpdateClientAttributes extends ICreateClientAttributes {
  clientId: number;
}
