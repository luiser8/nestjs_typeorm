import {
    Controller,
    Post,
    Body,
    HttpStatus,
    HttpException,
 } from '@nestjs/common';
import { PreRegistrationService } from './preRegistration.service';
import { PreRegistration } from 'src/entities/preRegistration.entity';
import { PreRegistrationCreateDto } from './dto/preRegistrationCreateDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("PreRegistration")
@Controller({
    path: "preRegistration",
    version: "1"
})
export class PreRegistrationController {
    constructor(private preRegistrationService: PreRegistrationService) { }

    @ApiOperation({ summary: "Create PreRegistration" })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "Success",
        type: PreRegistration
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: "Error",
        type: HttpException
    })
    @Post()
    async createPreRegistration(@Body() preRegistration: PreRegistrationCreateDto): Promise<PreRegistration | HttpException> {
        return await this.preRegistrationService.createPreRegistration(preRegistration);
    }
}
