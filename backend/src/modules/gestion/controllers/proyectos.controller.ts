import { Body, Controller, Get, NotImplementedException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CreateProyectoDto } from "../dtos/input/create-proyecto.dto";
import { UpdateProyectoDto } from "../dtos/input/update-proyecto.dto";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { ListProyectoDTO } from "../dtos/output/list-proyecto.dto";
import { ProyectoDTO } from "../dtos/output/proyecto.dto";
import { ProyectosService } from "../services/proyectos.service";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { Res } from '@nestjs/common';
import type { Response } from 'express';
import { useContainer } from "class-validator";

@Controller('proyectos')
export class ProyectosController {

    constructor(private readonly proyectosService: ProyectosService) { }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    async crearProyecto(@Body() dto: CreateProyectoDto): Promise<{ id: number }> {

       return await this.proyectosService.crearProyecto(dto);

    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put(':id')
    async actualizarProyecto(@Body() dto: UpdateProyectoDto, @Param('id') id: number): Promise<void> {

        await this.proyectosService.actualizarProyecto(id, dto);
    }

    @ApiBearerAuth()
    @ApiOkResponse({ type: ListProyectoDTO, isArray: true })
    @UseGuards(AuthGuard)
    @Get()
    async obtenerProyectos(): Promise<ListProyectoDTO[]> {

        return await this.proyectosService.obtenerProyectos();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('exportar')
    async exportarCSV(
        @Res() response: Response
    ): Promise<void> {
        const csv = await this.proyectosService.exportarCSV();

        response.setHeader('Content-Type', 'text/csv');
        response.setHeader('Content-Disposition', 'attachment; filename="proyectos.csv"');

        response.send(csv);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get(':id')
    async obtenerProyecto(@Param('id') id: number): Promise<ProyectoDTO> {

        return await this.proyectosService.obtenerProyecto(id);
    }
}