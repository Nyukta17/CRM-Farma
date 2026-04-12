import { Body, Controller, Post } from '@nestjs/common';
import { RegService } from './reg.service';
import type RegisterDTO from 'src/dto/RegisterDTO'
@Controller('reg')
export class RegController {
    constructor(private readonly userService: RegService) { }

    @Post()
    async createUsers(@Body() regDTO:RegisterDTO): Promise<boolean> {
        return await this.userService.createUser(regDTO);
    }
}
