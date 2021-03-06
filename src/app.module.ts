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
import { ReportsController } from './controllers/reports/reports.controller';
import { ReportsService } from './services/reports/reports.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, AuthController, ReportsController],
  providers: [AppService, UserService, MongodbService, ConfigService, AuthServiceService, ReportsService],
})
export class AppModule implements NestModule {

  // init middleware
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthServiceService).forRoutes({
      path: '*', method: RequestMethod.ALL
    });
  }

} 
