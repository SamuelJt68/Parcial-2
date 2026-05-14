import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsOptional
} from 'class-validator';
export class RegisterDto {

    @IsEmail({}, { message: 'Email inválido' })
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    name: string

    @IsOptional()
    @IsString()
    phone?: string

}