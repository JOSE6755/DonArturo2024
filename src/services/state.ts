import { QueryTypes } from "sequelize";
import { db } from "../database/config";
import { IStateCreationAttributes, IStateUpdateAttributes } from "../models/interfaces/state";
import { State } from "../models/state";

export interface IStateOperations {
  getAllStates(): Promise<State[]>;
  createState(data: IStateCreationAttributes): Promise<State>;
  updateState(data: IStateUpdateAttributes): Promise<State>;
}

export class StateService implements IStateOperations {
  public async getAllStates(): Promise<State[]> {
    try {
      const states: State[] = await State.findAll();
      return states;
    } catch (error: any) {
      console.log(`Error at stateService:`, error);
      throw new Error(`Error at fetching states: ${error.message}`);
    }
  }
  public async createState(data: IStateCreationAttributes): Promise<State> {
    try {
      const state: State[] = await db.query("EXEC CreateStates @Name = $1", {
        bind: [data.name],
        type: QueryTypes.SELECT,
      });
      return state[0];
    } catch (error: any) {
      console.log("Error at stateService: createState: ", error);
      throw new Error(`Error creating state: ${error.message}`);
    }
  }
  public async updateState(data: IStateUpdateAttributes): Promise<State> {
    try {
      const state: State[] = await db.query("EXEC UpdateState @StateId = $1, @Name = $2", {
        bind: [data.stateId, data.name],
        type: QueryTypes.SELECT,
      });
      return state[0];
    } catch (error: any) {
      console.log("Error at stateService: updateState: ", error);
      throw new Error(`Error updating state: ${error.message}`);
    }
  }
}
