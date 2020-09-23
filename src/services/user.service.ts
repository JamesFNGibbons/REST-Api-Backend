import { Injectable, BadRequestException, InternalServerErrorException, BadGatewayException } from '@nestjs/common';
import { User } from 'src/interfaces/user.interface';
import { MongodbService } from './db/mongodb/mongodb.service';
import { exception } from 'console';
import { S_IFBLK } from 'constants';

@Injectable()
export class UserService {
  constructor(private readonly database: MongodbService){}

  /** 
   * 
   * @description Used to create a new user object. 
   * @param {User} user new user object to create.
   * @returns {Boolean} status of query.
   */
  async create(user: User): Promise<boolean> {
    try {

      // check if the user already exists with this username.
      const findExistingUserRequest: any = await (await this.database.getConnection()).collection('users').findOne({username: user.username});
      if(findExistingUserRequest) {
        return false;  
      }
      else {
        const insertUserRequest = await (await this.database.getConnection()).collection('users').insertOne(user);
        return true;
      }

    }
    catch(error) {
      throw new InternalServerErrorException(error);
    }
  } 


  /**
   *
   *
   * @param {string} username
   * @return {*}  {Promise<boolean>}
   * @memberof UserService
   */
  async delete(username: string): Promise<boolean> {
    try {

      // attempt to delete the account from the database.
      await (await this.database.getConnection()).collection('users').deleteOne({username: username});
      return true;

    }
    catch(error) {
      throw new InternalServerErrorException(error);
    }
  }


  /**
   *
   *
   * @param {string} username
   * @param {User} user
   * @return {*}  {Promise<boolean>}
   * @memberof UserService
   */
  async update(username: string, user: User): Promise<boolean> {
    return true;
  }


  /**
   *
   *
   * @param {string} username
   * @return {*}  {Promise<User>}
   * @memberof UserService
   */
  async find(username: string): Promise<User> {

    try {
      const request = await (await this.database.getConnection()).collection('users').findOne({username: username});
      if(request) {
        return <User>request;
      }
      else {
        return null;
      }
    }
    catch(error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   *
   *
   * @return {*}  {Promise<User>}
   * @memberof UserService
   */
  async findAll(): Promise<User> {
    let users: User;

    return users;
  }


}
