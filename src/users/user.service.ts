import { Injectable, ConflictException, UnauthorizedException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Role } from './../roles/role.entity';
import { UserDto } from './dto/user.dto';
import { throwError } from 'rxjs';
import { Controller, Post, Get, Body, UseGuards, Param, Patch, Req, Delete } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ){}


    async getUserMe(dto: UserDto): Promise<{ id: string, email: string, name: string, phone: string, roles: Role[] }> {

        const user = await this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.roles', 'roles')
            .where('user.id =:id', { id: dto.idUser })
            .getOne();

        if(!user){
            throw new NotFoundException("Usuario no encontrado")
        }

        return { id: user.id, email: user.email, name: user.name, phone: user.phone, roles: user.roles}

    }

    async userGet(): Promise <{ id: string, email: string, name: string, roles: Role[] }[]>{

        const user = await this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.roles', 'roles')
            .getMany();

        return user.map(user => ({
            id: user.id,
            email: user.email,
            name: user.name,
            roles: user.roles,
        }));

    }

}