import { Injectable, BadRequestException, InternalServerErrorException, BadGatewayException } from '@nestjs/common';
import { User } from 'src/interfaces/user.interface';
import { MongodbService } from './db/mongodb/mongodb.service';
import { exception } from 'console';

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
    if(!user.created) {
      user.created = new Date();
    }

    return true;
  } 


  /**
   *
   *
   * @param {string} username
   * @return {*}  {Promise<boolean>}
   * @memberof UserService
   */
  async delete(username: string): Promise<boolean> {
    return true;
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
