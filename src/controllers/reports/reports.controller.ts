import { Controller, Req, Res, Post, Body, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { Report } from 'src/interfaces/report.interface';
import { ReportsService } from 'src/services/reports/reports.service';

import { ObjectId } from 'mongodb';


@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService

  ) {}

  
  /**
   *
   *
   * @param {*} req
   * @memberof ReportsController
   */
  @Post('/getReports')
  async getUserSavedReports(@Req() req, @Res() res) {
    try {
      const reports = await this.reportsService.findAll();
      res.status(200).send({status: 'ok', reports: reports}).end();
      
    }
    catch(error) {
      throw new InternalServerErrorException(error);
    }
  }


  /**
   *
   *
   * @param {*} req
   * @param {*} res
   * @param {Report} report
   * @return {*}  {Promise<any>}
   * @memberof ReportsController
   */
  @Post('/updateReport')
  async updateChangesTorReport(@Req() req, @Res() res, @Body('report') report: Report): Promise<any> {
    if(report) {
      const reportObjectId = (report as any)._id;
      console.log(reportObjectId);

    }
    else {
      throw new BadRequestException('Report to update must be provided.');
    }
  }


  /**
   *
   *
   * @param {*} req
   * @param {*} res
   * @param {Report} report
   * @return {*}  {Promise<any>}
   * @memberof ReportsController
   */
  @Post('/createReport')
  async createAndSaveReport(@Req() req, @Res() res, @Body('report') report: Report): Promise<any> {
    try {
      const username = req.username;
      await this.reportsService.create(report, username);

      res.status(200).send({status: 'ok'}).end();
    }
    catch(error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

}
