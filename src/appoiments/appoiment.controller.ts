import { Controller, Post, Get, Body, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AppoimentService } from './appoiment.service';
import { CreateAppoimentDto } from './dto/createAppoiment.dto';
import { UpdateAppoimentDto } from './dto/updateAppoiment.dto';

@Controller("appoiments")
export class AppoimentController {
  constructor(private readonly appoimentService: AppoimentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crearCita(@Body() dto: CreateAppoimentDto) {
    return this.appoimentService.crearCita(dto);
  }

  @Get()
  async getCitas() {
    return this.appoimentService.getCitas();
  }

  @Get("user/:id")
  async getCitasPorUsuario(@Param("id") id: string) {
    return this.appoimentService.getCitasPorUsuario(id);
  }

  @Get("doctor/:id")
  async getCitasPorDoctor(@Param(":id") id: string) {
    return this.appoimentService.getCitasPorDoctor(id);
  }

  @Patch(":id")
  async updateCita(@Param(":id") id: string, @Body() dto: UpdateAppoimentDto) {
    return this.appoimentService.updateCitas({ ...(dto as any), id } as any);
  }

  @Delete(":id")
  async deleteCita(@Param(":id") id: string) {
    return this.appoimentService.deleteCita(id);
  }
}
