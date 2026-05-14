import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateRoleDto } from './dto/createRole.dto';

@Controller('roles')
export class RolesController {

    constructor(private readonly rolesService: RolesService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post()
    async CreateRole(@Body() dto: CreateRoleDto): Promise<{ message: string, roleId: string }> {
        return this.rolesService.createRole(dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Get()
    async GetRoles(): Promise<{ roleId: string, role_name: string, description: string }[]> {
        return this.rolesService.GetRoles();
    }
}