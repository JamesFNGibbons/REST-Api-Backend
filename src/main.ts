import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoClient } from 'mongodb';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable cors connections
  app.enableCors();

  await app.listen(5000);

   // check connection to the db server.
   const connection = new MongoClient('mongodb://localhost:27017/aquarod');
   try {
     await connection.connect();
     console.log('Connected tested to mongodb server.');
   }
   catch(error) {
     throw error;
   } 
   finally {
     connection.close();
   }

}
bootstrap();
