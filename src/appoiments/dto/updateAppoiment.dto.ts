import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    IsEnum,
    IsNotEmpty,
    IsString,
} from 'class-validator';

export enum AppoimentStatus {
    pending = "pending",
    cancellend = "cancellend",
    done = "done",
}

export class UpdateAppoimentDto {

    @IsString()
    @IsNotEmpty()
    id: string;

    @IsEnum(AppoimentStatus)
        @IsNotEmpty()
        status: AppoimentStatus;

}

