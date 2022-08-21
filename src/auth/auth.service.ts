import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDto, SignupDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
    constructor (
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService 
    ){}

    async signup (dto: SignupDto) {
        const hash = await argon.hash(dto.password)

        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                    fullName: dto.fullName
                }
            })
        } catch(error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == 'P2002') {
                    throw new ForbiddenException('Credentials already taken');
                }
                throw error;
            }
        }
    }

    async signin(dto: AuthDto) {
        const user  = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        });

        if(!user) {
            throw new ForbiddenException('Credentials are incorrect');
        }

        const pwMatches = await argon.verify(user.hash, dto.password);

        if(!pwMatches) {
            throw new ForbiddenException('Credentials are incorrect');
        }

        return this.signToken(user.id, user.email);
    }

    async signToken (
        userId: number,
        email: string,
    ) : Promise<{access_token: string}> {
        

        const payload = {
            sub: userId,
            email
        }

        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(
            payload, {
                expiresIn: '30m',
                secret: secret
            },
        );

        return {
            access_token: token,
        }
    }
}
