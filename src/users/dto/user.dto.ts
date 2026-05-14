import {
    IsNotEmpty,
    IsString,
} from 'class-validator';
export class UserDto {

    @IsString()
    @IsNotEmpty() 
    idUser: string;

}