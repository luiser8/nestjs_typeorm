import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
  Get,
  Res,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { PreRegistrationService } from './preRegistration.service';
import {
  PreRegistration,
  PreRegistrationCreateResponse,
} from 'src/entities/preRegistration.entity';
import { PreRegistrationCreateDto } from './dto/preRegistrationCreateDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('PreRegistration')
@Controller({
  path: 'preRegistration',
  version: '1',
})
export class PreRegistrationController {
  constructor(private preRegistrationService: PreRegistrationService) {}

  @ApiOperation({ summary: 'Create PreRegistration' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: PreRegistration,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error',
    type: HttpException,
  })
  @Post()
  async createPreRegistration(
    @Body() preRegistration: PreRegistrationCreateDto,
  ): Promise<PreRegistrationCreateResponse | HttpException> {
    return await this.preRegistrationService.createPreRegistration(
      preRegistration,
    );
  }

  @ApiOperation({ summary: 'Get all PreRegistrations in Excel' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Response,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error',
    type: HttpException,
  })
  @ApiOperation({ summary: 'Get all PreRegistrations in Excel with extension' })
  @Get('excel/:extension')
  async getAllPreRegistrationsToExcel(
    @Param('extension') extension: string,
    @Res() res: Response,
  ): Promise<void | HttpException> {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const filename = `Pre-Registro_${extension}_${year}-${month}-${day}.xlsx`;

    const buffer =
      await this.preRegistrationService.getAllPreRegistrationsToExcel(
        extension,
      );
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.type(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.send(buffer);
  }
}
