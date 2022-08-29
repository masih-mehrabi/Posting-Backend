import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SignupDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor (private authSerive: AuthService) {}


    @Post('signup')
    signup (@Body() dto: SignupDto){
        return this.authSerive.signup(dto);
    }

    @Post('signin') 
    signin(@Body() dto: AuthDto){
       return this.authSerive.signin(dto)
    }
}
