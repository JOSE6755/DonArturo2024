export interface IStateCreationAttributes {
  name: string;
}

export interface IStateUpdateAttributes extends IStateCreationAttributes {
  stateId: number;
}
