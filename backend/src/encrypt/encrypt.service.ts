import { Injectable } from '@nestjs/common';
import { pbkdf2Sync, randomBytes } from 'crypto';

@Injectable()
export class EncryptService {
    async hashPassword(password:string):Promise<string>{
        const salt=randomBytes(16).toString('hex');
        const hash=pbkdf2Sync(password,salt,1000,64,'sha512').toString('hex')
        return await `${salt}:${hash}`;
    }
    async compareOassword(password:string,storedValue:string):Promise<boolean>{
        const[salt,originalHash] = storedValue.split(':');
        const hashToVerify=pbkdf2Sync(password,salt,1000,64,'sha512').toString('hex')
        return await hashToVerify === originalHash;
    }
}
