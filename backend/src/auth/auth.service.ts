import { HttpException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { emitWarning } from 'process';
import responseDTO from 'src/dto/responseDTO';
import userDTO from 'src/dto/userDTO';
import { EncryptService } from 'src/encrypt/encrypt.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly encryptService: EncryptService,
        private readonly jwtService: JwtService) { }
    async Login(userDTO: userDTO) {

        try {
            const user = await this.prismaService.user.findUnique({
                where: { email: userDTO.email },
                include : {role:true}
            })

            if (!user) {
                throw new UnauthorizedException("Неверный логин или пароль")
            }
            const isPasswordValid = await this.encryptService.compareOassword(userDTO.password, user.password)
            if (!isPasswordValid) {
                throw new UnauthorizedException("Неверный логин или пароль")
            }
            const payload: responseDTO = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role.role
            }
            const token = this.jwtService.sign(payload)
            return { access_token: token, payload };
        }
        catch (e) {

            if (e instanceof HttpException) throw e;

            console.log(e);
            throw new InternalServerErrorException('Ошибка на сервере');
        }
    }
}
