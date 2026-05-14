import {
    IsEmail,
    IsNotEmpty,
    IsString,
} from 'class-validator';
export class LoginDto {

    @IsEmail({}, { message: 'Email inválido' })
    @IsNotEmpty() 
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

}