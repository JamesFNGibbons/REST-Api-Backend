import { Controller, Get, Post, Res, Body, BadRequestException, BadGatewayException } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { ConfigService } from 'src/services/config/config.service';

import * as jwt from 'jsonwebtoken';

@Controller('user')
export class UserController {

  constructor(
    private userService: UserService,
    private configService: ConfigService

  ){}

  /**
   *
   *
   * @return {*}  {string}
   * @memberof UserController
   */
  @Get('/getAll')
  async getAllUsers(@Res() res, @Body('token') token: string): Promise<any> {
    if(!token) {
      throw new BadRequestException('Auth token not provided.');
    }

    try {
        
    }
    catch(error) {
      throw error;
    }
  }

  /**
   *
   *
   * @param {*} res
   * @param {string} token
   * @return {*}  {Promise<any>}
   * @memberof UserController
   */
  @Post('/findUser')
  async getUser(@Res() res, @Body('token') token: string): Promise<any> {
    if(!token) {
      throw new BadRequestException('Auth token not provided.');
    }

    try {
      const username = jwt.verify(token, this.configService.secret);
      
      if(username){
        const user = await this.userService.find(username);
        if(user != null) {
          res.status(200).send({status: 'ok', user: user}).end();
        }
        else {
          throw new BadRequestException('Token does not compile to valid user.');
        }
      }
      else {
        throw new BadRequestException('Invalid auth token.');
      }
    }
    catch(error) {
      throw error;
    }
  }

}
