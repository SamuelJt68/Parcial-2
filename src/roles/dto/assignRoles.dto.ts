import {
    IsNotEmpty,
    IsArray,
    IsString
} from 'class-validator';
export class AssignRolesDto{

    @IsArray()
    @IsNotEmpty()
    @IsString({ each: true })
    roles: string[];

}