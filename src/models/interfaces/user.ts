interface IUserCommonAttributes {
  names: string;
  lastNames: string;
  email: string;
  phoneNumber: string;
  address: string;
}

interface IUserCommonForeignKeys {
  roleId: number;
  clientId?: number;
}

export interface IUserCreateAttributes extends IUserCommonAttributes, IUserCommonForeignKeys {
  password: string;
  birthDate: Date;
}

export interface IUserUpdateAttributes extends IUserCommonAttributes, IUserCommonForeignKeys {
  userId: number;
}

export interface IUserUpdateStateAttributes {
  userId: number;
  stateId: number;
}

export interface IUserFetchAttributes extends IUserCommonAttributes {
  role: string;
  state: string;
  company: string | null;
}

export interface IUserUpdatePasswordAttributes {
  userId: number;
  password: string;
}
