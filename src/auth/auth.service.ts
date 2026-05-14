import { Injectable, ConflictException, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { Role } from '../roles/role.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { throwError } from 'rxjs';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService,
    ){}

    async register(dto: RegisterDto): Promise<{ message: string; userId: string }> {

    const existing = await this.userRepository.findOne({ where: { email: dto.email } });

    if (existing) {
        throw new ConflictException('Email ya registrado');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = await this.userRepository.create({ 
        ...dto, 
        password: hashedPassword
    });

    const savedUser = await this.userRepository.save(newUser);

    return { message: "Usuario registrado con éxito", userId: savedUser.id}

        }

    async login(dto: LoginDto): Promise<{ access_token: string  }> {
        
    const user = await this.userRepository.createQueryBuilder('user')
    .leftJoinAndSelect('user.roles', 'roles')
    .where('user.email =:email', { email: dto.email })
    .addSelect('user.password')
    .getOne();

    if (!user) {
    throw new UnauthorizedException('Credenciales incorrectas');
        }

    if (!user.is_active) {
    throw new HttpException('Usuario desactivado', HttpStatus.LOCKED);
        }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);   
    if (!passwordMatches) {
    throw new UnauthorizedException('Credenciales incorrectas');
        }
    
    const payload = {
        sub: user.id,
        email: user.email,
        roles: user.roles.map((r) => r.role_name),
            };

    const token = this.jwtService.sign(payload);
    
    
    return { access_token: token };


        }
}

///BadRequestException se traduce a 400. La usas cuando los datos son inválidos por reglas de negocio (no por forma —la forma la atrapa el DTO).
///UnauthorizedException se traduce a 401. La usas cuando falla la autenticación: credenciales incorrectas, token inválido, token expirado.
///ForbiddenException se traduce a 403. La usas cuando hay autenticación correcta pero falta autorización: el usuario está logueado pero no tiene el rol requerido.
///NotFoundException se traduce a 404. La usas cuando un recurso buscado no existe.
///ConflictException se traduce a 409. La usas para violaciones de unicidad: email ya registrado, role_name ya existe.
///HttpException('mensaje', 423) se traduce a 423 Locked. Esta es especial porque 423 no tiene una excepción de Nest predefinida, así que usas la genérica HttpException y le pasas el código. La vas a necesitar para el caso Usuario desactivado del login.