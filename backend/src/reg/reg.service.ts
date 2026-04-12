import { Injectable } from '@nestjs/common';
import { connect } from 'http2';
import RegisterDTO from 'src/dto/RegisterDTO';
import { EncryptService } from 'src/encrypt/encrypt.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegService {
    constructor(private readonly prismaService: PrismaService,
                private readonly encryptService:EncryptService
    ) { }
    async createUser(regDTO: RegisterDTO): Promise<boolean> {
        try{
            await this.prismaService.user.create({
                date:{
                    email:regDTO.email,
                    password:this.encryptService.hashPassword(regDTO.password),
                    firstName:regDTO.firstName,
                    lastName:regDTO.lastName,
                    role:{
                        connect:{id:1}
                    }
                }
            })
        }
        catch{

        }
        return await true;
    }
}
