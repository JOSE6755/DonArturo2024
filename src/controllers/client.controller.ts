import { Request, Response } from "express";
import { IClientOperations } from "../services/client";
import { ICreateClientAttributes, IUpdateClientAttributes } from "../models/interfaces/client";

export class ClientController {
  private clientService: IClientOperations;
  constructor(clientService: IClientOperations) {
    this.clientService = clientService;
  }

  public async getClients(req: Request, res: Response): Promise<void> {
    try {
      const clients = await this.clientService.getAllClients();
      res.status(200).json(clients);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ msg: `Error fetching clients: ${error.message}` });
    }
  }

  public async createClient(req: Request, res: Response): Promise<void> {
    try {
      const data: ICreateClientAttributes = req.body;
      const client = await this.clientService.createClient(data);
      res.status(200).json(client);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ msg: `Error creating client: ${error.message}` });
    }
  }

  public async updateClient(req: Request, res: Response): Promise<void> {
    try {
      const clientId = Number(req.params.id);
      const data = req.body;
      const client: IUpdateClientAttributes = { clientId: clientId, ...data };
      const updatedClient = await this.clientService.updateClient(client);
      res.status(200).json(updatedClient);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ msg: `Error updating client: ${error.message}` });
    }
  }
}
