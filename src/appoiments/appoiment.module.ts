import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appoiment } from './appoiment.entity';

@Module({

    imports: [TypeOrmModule.forFeature([Appoiment])],
    exports: [TypeOrmModule]

})
export class UserModule{}