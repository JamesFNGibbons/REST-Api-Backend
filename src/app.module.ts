import { Module, NotImplementedException, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user/user.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { UserService } from './services/user.service';
import { Mongodb } from './providers/mongodb';
import { MongodbService } from './services/db/mongodb/mongodb.service';
import { ConfigService } from './services/config/config.service';
import { AuthServiceService } from './services/auth-service/auth-service.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, UserService, MongodbService, ConfigService, AuthServiceService],
})
export class AppModule implements NestModule {

  // init middleware
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthServiceService).forRoutes({
      path: '*', method: RequestMethod.ALL
    });
  }

} 
