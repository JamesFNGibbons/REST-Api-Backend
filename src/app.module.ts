import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user/user.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { UserService } from './services/user.service';
import { Mongodb } from './providers/mongodb';
import { MongodbService } from './services/db/mongodb/mongodb.service';
import { ConfigService } from './services/config/config.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, UserService, MongodbService, ConfigService],
})
export class AppModule {}
