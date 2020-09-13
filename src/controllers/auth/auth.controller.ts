import { Controller, Post, Param, Response, Res, UnauthorizedException, BadRequestException, Body, Req, BadGatewayException} from '@nestjs/common';
import { MongodbService } from 'src/services/db/mongodb/mongodb.service';

import * as md5 from 'md5'; 
import * as jwt from 'jsonwebtoken';
import { ConfigService } from 'src/services/config/config.service';
import { UserService } from 'src/services/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly db: MongodbService,
    private readonly config: ConfigService,
    private readonly userService: UserService

  ){}


  /**
   *
   *
   * @param {*} res
   * @param {*} token
   * @return {*}  {boolean}
   * @memberof AuthController
   */
  @Post('/validateAuthToken')
  validateAuthToken(@Res() res, @Body('token') token): boolean {
    if(token) {
      try {
        const username = jwt.verify(token, this.config.secret);
        if(username) {
          return true;
        }
        else {
          throw new UnauthorizedException('Invalid token.');
        }
      }
      catch(error) {
        throw new UnauthorizedException('Token invalid.');
      }
    }
    else {
      throw new BadRequestException('No token provided.');
    }
  }


  /**
   *
   *
   * @param {*} res
   * @param {string} username
   * @param {String} password
   * @return {*}  {Promise<any>}
   * @memberof AuthController
   */
  @Post('/validateAuthentication')
  async validateAuthentication(@Res() res, @Body('username') username: string, @Body('password') password: String): Promise<any> {
    if(username && password) {
      const securePassword = md5(password);
      console.log(securePassword);
      
      try {
        const user = await this.userService.find(username);

        if(user != null && user.password === securePassword) {
          const authToken = jwt.sign(user.username, this.config.secret);

          // return the auth token.
          res.status(200).send({status: 'ok', token: authToken}).end();
        }
        else {
          throw new BadRequestException('Invalid details.');
        }

      }
      catch(error) {
        throw error;
      }

    }
    else {
      throw new BadRequestException('Invalid params.');
     }
  }

}
