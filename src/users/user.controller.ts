import { Controller, Get, Patch, Param, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { RolesService } from 'src/roles/roles.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AssignRolesDto } from '../roles/dto/assignRoles.dto';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UserService,
        private readonly rolesService: RolesService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getUserMe(@Req() req): Promise<{ id: string, email: string, name: string, phone: string, roles: any[] }> {
        const dto = new UserDto();
        dto.idUser = req.user.sub;
        return this.userService.getUserMe(dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Get()
    async userGet(): Promise<{ id: string, email: string, name: string, roles: any[] }[]> {
        return this.userService.userGet();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Patch(':id/roles')
    async AssignRoles(
        @Param('id') id: string,
        @Body() dto: AssignRolesDto,
    ): Promise<{ message: string }> {
        return this.rolesService.assingRole(id, dto);
    }
}