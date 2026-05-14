import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Appoiment } from './appoiment.entity';
import { CreateAppoimentDto } from './dto/createAppoiment.dto';
import { UpdateAppoimentDto } from './dto/updateAppoiment.dto';
import { Controller, Get, Body, UseGuards, Param, Patch, } from '@nestjs/common';

@Injectable()
export class AppoimentService {

     constructor(
        @InjectRepository(Appoiment) private appoimentRepository: Repository<Appoiment>,
        @InjectRepository(User) private userRepository: Repository<User>,
     ){}

     async crearCita(dto: CreateAppoimentDto): Promise<{message: string}>{

        const doctor = await this.userRepository.findOne({ where: { id: dto.id_doctor } });
        if (!doctor) {
            throw new NotFoundException('Doctor (usuario) no encontrado');
        }

        const appoiment = this.appoimentRepository.create({
            motivo: dto.motivo,
            datetime: new Date(dto.datetime),
            status: dto.status ?? 'PENDING',
            id_user: doctor,
        } as any);

        const saved = await this.appoimentRepository.save(appoiment);
        return { message: 'Cita creada',};
     }



    @Get(':id')
    async getCitasPorUsuario(@Param("id") id: string): Promise<{ datetime: Date; motivo: string }[]> {
        const appoiments = await this.appoimentRepository
            .createQueryBuilder('appoiment')
            .leftJoin('appoiment.id_user', 'user')
            .where('user.id = :id', { id: id })
            .select(['appoiment.datetime', 'appoiment.motivo'])
            .getMany();

        return appoiments.map(row => ({
            datetime: row['appoiment_datetime'],
            motivo: row['appoiment_motivo'],
        }));
    }

    @Get(':id/doctors')
    async getCitasPorDoctor(@Param("id") id: string, ): Promise<{ datetime: Date; motivo: string }[]> {
        const appoiments = await this.appoimentRepository
            .createQueryBuilder('appoiment')
            .leftJoin('appoiment.id_user', 'user')
            .where('user.id = :id', { id: id })
            .orWhere('user.id=: ')
            .select(['appoiment.datetime', 'appoiment.motivo'])
            .getMany();

        return appoiments.map(row => ({
            datetime: row['appoiment_datetime'],
            motivo: row['appoiment_motivo'],
        }));
    }

    async getCitas(): Promise<{ datetime: Date; motivo: string }[]> {
        const appoiments = await this.appoimentRepository.createQueryBuilder('appoiment')
        .select('appoiments')
        .getMany();

        return appoiments.map(appoiments => ({
        datetime: appoiments.datetime,
        motivo: appoiments.motivo,
    }));

    }
    
    async updateCitas(dto: UpdateAppoimentDto): Promise<{ message: string }> {
        const appoiment = await this.appoimentRepository.findOne({ where: { id } });
        if (!appoiment) {
            throw new NotFoundException('Cita no encontrada');
        }

        const currentStatus = (appoiment ).status.toString().toUpperCase();
        if (currentStatus !== "pending") {
            throw new ConflictException("Solo se puede actualizar si la cita está en estado PENDING");
        }

    }

    async deleteCita(id: string): Promise<{ message: string }> {
        const appoiment = await this.appoimentRepository.findOne({ where: { id } });
        if (!appoiment) {
            throw new NotFoundException('Cita no encontrada');
        }
        await this.appoimentRepository.delete(id);
        return { message: 'Cita eliminada' };
    }

 }

