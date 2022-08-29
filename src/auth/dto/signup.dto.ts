import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class SignupDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
    
    @IsString()
    @IsNotEmpty()
    fullName: string

    @IsString()
    @IsOptional()
    profilePicUrl: string
}