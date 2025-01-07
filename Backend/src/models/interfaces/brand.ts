export interface IBrandCreationAttributes {
  name: string;
}

export interface IBrandUpdateAttributes extends IBrandCreationAttributes {
  brandId: number;
}
