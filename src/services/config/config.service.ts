import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {

  public secret: string;

  constructor() {
    if(process.env.NODE_ENV) {

      

    }
    else {

      /** 
       * Development vartiables.
       */
      this.secret = '12345678910';

    }
  }

}
