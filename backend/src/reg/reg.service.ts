import { Injectable } from '@nestjs/common';
import { connect } from 'http2';
import RegisterDTO from 'src/dto/RegisterDTO';
import responseDTO from 'src/dto/responseDTO';
import { EncryptService } from 'src/encrypt/encrypt.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegService {
    constructor(private readonly prismaService: PrismaService,
        private readonly encryptService: EncryptService
    ) { }
    async createUser(regDTO: RegisterDTO): Promise<responseDTO | string> {

        try {
            const user = await this.prismaService.user.create({
                data: {
                    email: regDTO.email,
                    password: await this.encryptService.hashPassword(regDTO.password),
                    firstName: regDTO.firstName,
                    lastName: regDTO.lastName,
                    role: {
                        connect: { id: 2 }
                    },

                },
                select: {
                    id: true,
                    roleId: true,
                    firstName: true,
                    lastName: true,
                    email: true
                }
            })
            return user;
        }
        catch (error) {
            console.error('ПОЛНАЯ ОШИБКА:', error);
            return await "пользавтель не создан";
        }
    }
}
