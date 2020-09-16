import { Injectable, NestMiddleware, BadRequestException, UnauthorizedException } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthServiceService implements NestMiddleware {
  
  private readonly unprotectedRoutes = [
    '/auth/validateAuthentication',
    '/auth/validateAuthToken'
  ];

  constructor(private configService: ConfigService) {}

  /**
   *
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @memberof AuthServiceService
   */
  use(req, res, next) {
    if(req.body.token) {
      try {
        const username = jwt.verify(req.body.token, this.configService.secret);
        if(username) {
          req.username = username;
          next();

        }
        else {
          throw new UnauthorizedException('Token provided is invalid.');
        }
      }
      catch(error) {
        throw new UnauthorizedException('Token provided is invalid.');
      }
    }
    else {
      if(this.unprotectedRoutes.includes(req.originalUrl)) {
        next();
      }
      else {
        throw new BadRequestException('No auth token provided with request.');
      }
    }
  }

}
