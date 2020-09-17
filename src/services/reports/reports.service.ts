import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MongodbService } from '../db/mongodb/mongodb.service';
import { Report } from 'src/interfaces/report.interface';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class ReportsService {

  constructor(
    private readonly db: MongodbService
  ) {}

  /**
   *
   *
   * @param {Report} report
   * @param {User} creatorUser
   * @return {*}  {Promise<void>}
   * @memberof ReportsService
   */
  public async create(report: Report, creatorUsername: String): Promise<void> {
    try {
      if(report && creatorUsername) {
        const query = await (await this.db.getConnection()).collection('users').findOne({username: creatorUsername});
        if(query) {

          if(!query.reports) {
            query.reports = [report];
          }
          else {
            query.reports.push(report);
          }

          // commit changes to the user object
          await (await this.db.getConnection()).collection('users').updateOne({
            username: creatorUsername
          }, query);

          // done.
          return;

        }
        else {
          throw 'Invalid creator user provided.';
        }
      }
      else {
        throw 'Cannot create report from null object.';
      }
    }
    catch(error) {
      throw new InternalServerErrorException(error);
    }
  }


  /**
   *
   *
   * @return {*}  {Promise<boolean>}
   * @memberof ReportsService
   */
  public async delete(): Promise<boolean> {

    return true;
  }


  /**
   *
   *
   * @return {*}  {Promise<Report>}
   * @memberof ReportsService
   */
  public async find(): Promise<Report> {

    return {} as Report;
  }


  /**
   *
   *
   * @return {*}  {Promise<Report>}
   * @memberof ReportsService
   */
  public async findAll(): Promise<Array<Report>> {
    try {
      const getAllUsers = new Promise(async (resolve, reject) => {
        (await this.db.getConnection()).collection('users').find().toArray((err, docs) => {
          
          if(err) {
            throw new InternalServerErrorException(err);
          }
          else {
            if(docs) {
              resolve(docs);
            }
            else {
              resolve([]);
            }
          }

        })
      });

      // loop through every account and load the saved reports
      let reports = [];
      const users: any = await getAllUsers;
      for(let user of users) {
        if(user.reports) {
          for(let report of user.reports as any) {
            reports.push(report as Report);
          }
        }
      }

      // return the found reports.
      return reports;
    
    }
    catch(error) {
      throw new InternalServerErrorException(error);
    }
  }

}
