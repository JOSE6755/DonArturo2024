import { Request, Response } from "express";
import { IStateOperations } from "../services/state";
import { State } from "../models/state";
import { IStateCreationAttributes, IStateUpdateAttributes } from "../models/interfaces/state";

export class StateController {
  private stateService: IStateOperations;
  constructor(stateService: IStateOperations) {
    this.stateService = stateService;
  }

  public async getStates(req: Request, res: Response): Promise<void> {
    try {
      const states: State[] = await this.stateService.getAllStates();
      res.status(200).json(states);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ msg: `Error fetching states: ${error.message}` });
    }
  }
  public async createState(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;
      const newState: IStateCreationAttributes = { name: name };
      const state: State = await this.stateService.createState(newState);
      res.status(200).json(state);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ msg: `Error creating state: ${error.message}` });
    }
  }

  public async updateState(req: Request, res: Response): Promise<void> {
    try {
      const stateId = Number(req.params.id);
      const { name } = req.body;
      const state: IStateUpdateAttributes = { stateId: stateId, name: name };
      const updatedState = await this.stateService.updateState(state);
      res.status(200).json(updatedState);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ msg: `Error updating state: ${error.message}` });
    }
  }
}
