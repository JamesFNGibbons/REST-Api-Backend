import { Controller, Req, Res, Post, Body, InternalServerErrorException } from '@nestjs/common';
import { Report } from 'src/interfaces/report.interface';
import { ReportsService } from 'src/services/reports/reports.service';

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
  @Post('/createReport')
  async createAndSaveReport(@Req() req, @Res() res, @Body('report') report: Report): Promise<any> {
    try {
      const username = req.username;
      await this.reportsService.create(report, username);

      res.status(200).send({status: 'ok'}).end();
    }
    catch(error) {
      throw new InternalServerErrorException(error);
    }
  }

}
