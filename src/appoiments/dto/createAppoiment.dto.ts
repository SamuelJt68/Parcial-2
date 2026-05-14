import {
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsString,
} from 'class-validator';

export enum AppoimentStatus {
    pending = "pending",
    cancellend = "cancellend",
    done = "done",
}

export class CreateAppoimentDto {

    @IsString()
    @IsNotEmpty({ message: 'motivo es requerido' })
    motivo: string;

    @IsDateString()
    datetime: string;

    @IsString()
    @IsNotEmpty({ message: 'id_doctor es requerido' })
    id_doctor: string;

    @IsEnum(AppoimentStatus)
    @IsNotEmpty()
    status: AppoimentStatus;
}

