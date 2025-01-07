export interface CategoryCreationAttributes {
  name: string;
}

export interface CategoryUpdateAttributes extends CategoryCreationAttributes {
  categoryId: number;
}

export interface CategoryUpdateStateAttributes {
  categoryId: number;
  stateId: number;
}
