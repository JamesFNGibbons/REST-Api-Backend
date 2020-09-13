import { Injectable } from '@nestjs/common';
import { MongodbService } from './services/db/mongodb/mongodb.service';

@Injectable()
export class AppService {

  constructor(private database: MongodbService) {
 
  }

  getHello(): string {
    return 'Hello World!';
  }
  
}
