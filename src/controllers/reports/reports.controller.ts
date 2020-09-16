import { Controller, Req, Res, Post, InternalServerErrorException } from '@nestjs/common';
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

}
