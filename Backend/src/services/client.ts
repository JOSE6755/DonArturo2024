import { QueryTypes } from "sequelize";
import { db } from "../database/config";
import { Client } from "../models/client";
import { ICreateClientAttributes, IUpdateClientAttributes } from "../models/interfaces/client";

export interface IClientOperations {
  getAllClients(): Promise<Client[]>;
  createClient(data: ICreateClientAttributes): Promise<Client>;
  updateClient(data: IUpdateClientAttributes): Promise<Client>;
}

export class ClientService implements IClientOperations {
  public async getAllClients(): Promise<Client[]> {
    try {
      const clients: Client[] = await Client.findAll();
      return clients;
    } catch (error: any) {
      console.error("Error at ClientService: ", error);
      throw new Error(`Error fetching clients: ${error.message}`);
    }
  }
  public async createClient(data: ICreateClientAttributes): Promise<Client> {
    try {
      const clients: Client[] = await db.query(
        "EXEC CreateClients @CommercialName = $1, @Adress = $2, @PhoneNumber = $3, @CommercialEmail = $4",
        {
          bind: [data.commercialName, data.address, data.phoneNumber, data.commercialEmail],
          type: QueryTypes.SELECT,
        },
      );
      return clients[0];
    } catch (error: any) {
      console.error("Error creating client: ", error);
      throw new Error(`Error creating client: ${error.message}`);
    }
  }
  public async updateClient(data: IUpdateClientAttributes): Promise<Client> {
    try {
      const clients: Client[] = await db.query(
        "EXEC UpdateClient @ClientId = $1, @CommercialName = $2, @Adress = $3, @PhoneNumber = $4, @CommercialEmail = $5 ",
        {
          bind: [data.clientId, data.commercialName, data.address, data.phoneNumber, data.commercialEmail],
          type: QueryTypes.SELECT,
        },
      );
      return clients[0];
    } catch (error: any) {
      console.error("Error updating client: ", error);
      throw new Error(`Error updating client: ${error.message}`);
    }
  }
}
