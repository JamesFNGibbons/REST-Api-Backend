import { Injectable } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

@Injectable()
export class MongodbService {

  private connection: MongoClient;
  public database: Db;

  constructor() {}

  /**
   *
   *
   * @private
   * @memberof MongodbService
   */
  public async ensureConnection() {
    if(!this.database && this.connection && !this.connection.isConnected()) {
      this.connect();
    }
  }

  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof MongodbService
   */
  public async connect(): Promise<void> {
    const connectionString = 'mongodb://localhost/aquarod';
    this.connection = new MongoClient(connectionString);
    
    try {
      await this.connection.connect();
      this.database = this.connection.db('aquarod');
  
    }
    catch(error) {
      throw error; 
    }
  }


  /**
   *
   *
   * @return {*}  {Promise<any>}
   * @memberof MongodbService
   */
  public async getConnection(): Promise<Db> {
    console.log(typeof this.database);

    if(this.connection && this.connection.isConnected() && this.database) {
      return this.database;
    }
    else {
      try {
        await this.connect();
        return this.database;
      }
      catch(error) {
        throw error;
      }
    }
  }


  /**
   *
   *
   * @return {*}  {*}
   * @memberof MongodbService
   */
  public closeConnection(): any {
    this.connection.close();
  }


}
