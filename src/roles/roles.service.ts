import { Injectable, ConflictException, UnauthorizedException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Role } from './role.entity';
import { AssignRolesDto } from './dto/assignRoles.dto';
import { CreateRoleDto } from './dto/createRole.dto';
import { throwError } from 'rxjs';
import { Controller, Post, Get, Body, UseGuards, Param, Patch, Req, Delete } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class RolesService {

    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ){}

    @Post()
    async createRole(@Body() dto: CreateRoleDto): Promise<{ message: string, roleId: string}> {
        const existingNameRole = await this.roleRepository.findOne({where: { role_name: dto.role_name } })
        if (existingNameRole){
            throw new ConflictException('role_name ya existe');
        }
        const newRole = await this.roleRepository.create({ 
        ...dto, 
            });
        
        const savedRole = await this.roleRepository.save(newRole);

        return { message: "Rol creado con éxito", roleId: savedRole.id }
    }

    @Patch(':id/roles')
    async assingRole(@Param("id") id: string, @Body() dto: AssignRolesDto): Promise<{message: string}>{
         
         const roles = await this.roleRepository.createQueryBuilder('role')
         .where('role.name_role IN (:...roles)', { roles: dto.roles })
         .getMany()

          const user = await this.userRepository.createQueryBuilder('user')
         .leftJoinAndSelect('user.roles', 'roles')
         .where('user.id =:id', { id: id })
         .getOne()

        if (!user){
            throw new NotFoundException("Usuario no encontrado")
         }
         if(user){
            user.roles = roles
            await this.userRepository.save(user);
         }

        return {message: "Roles asignados" }

    }


    @Get()
    async GetRoles(): Promise<{ roleId: string, role_name: string, description: string }[]> {

    const roles = await this.roleRepository.createQueryBuilder('roles')
        .select('roles')
        .getMany();

    return roles.map(role => ({
        roleId: role.id,
        role_name: role.role_name,
        description: role.description,
    }));
}

}