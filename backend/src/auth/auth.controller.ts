import { Body, Controller, Get, Post } from '@nestjs/common';
import{AuthService} from './auth.service';
import userDTO from 'src/dto/userDTO';
@Controller('auth')
export class AuthController {
    constructor(private readonly authoService:AuthService){}

    @Post('login')
    async Login(@Body() userDTO:userDTO){
        return this.authoService.Login(userDTO);
    }
}
