import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  PreRegistration,
  PreRegistrationCreateResponse,
} from 'src/entities/preRegistration.entity';
import { PreRegistrationCreateDto } from './dto/preRegistrationCreateDto';
import * as ExcelJS from 'exceljs';
import { handleError } from 'src/utils/errors.transport';

@Injectable()
export class PreRegistrationService {
  constructor(
    @InjectRepository(PreRegistration)
    private preRegistrationRepository: Repository<PreRegistration>,
  ) {}

  public async createPreRegistration(
    payload: PreRegistrationCreateDto,
  ): Promise<PreRegistrationCreateResponse | HttpException> {
    try {
      const preRegistration = new PreRegistration();
      preRegistration.firstName = payload.firstName;
      preRegistration.lastName = payload.lastName;
      preRegistration.email = payload.email;
      preRegistration.phone = payload.phone;
      preRegistration.career = payload.career;
      preRegistration.extension = payload.extension;

      const newPreRegistration =
        this.preRegistrationRepository.create(preRegistration);
      const request =
        await this.preRegistrationRepository.save(newPreRegistration);
      return {
        data: request,
        success: true,
        message: 'Pre-registration created successfully',
        status: 201,
      };
    } catch (err) {
      throw new HttpException(
        {
          success: false,
          message: "Pre-registration couldn't be created",
          status: HttpStatus.BAD_REQUEST,
          data: { error: await handleError(err.message) },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async getAllPreRegistrationsToExcel(
    extension: string,
  ): Promise<ExcelJS.Buffer | HttpException> {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Pre-registrados');
      worksheet.columns = [
        { header: 'Nombres', key: 'firstName', width: 30 },
        { header: 'Apellidos', key: 'lastName', width: 30 },
        { header: 'Correo', key: 'email', width: 40 },
        { header: 'Teléfono', key: 'phone', width: 20 },
        { header: 'Carrera', key: 'career', width: 30 },
        { header: 'Extension', key: 'extension', width: 30 },
      ];
      const whereCondition =
        extension && extension !== 'ALL' ? { extension } : {};
      const preRegistration = await this.preRegistrationRepository.find({
        where: whereCondition,
      });
      preRegistration.forEach((preRegistration) => {
        worksheet.addRow(preRegistration);
      });
      const buffer = await workbook.xlsx.writeBuffer();
      return buffer;
    } catch (err) {
      throw new HttpException(
        {
          success: false,
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
