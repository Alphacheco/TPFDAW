import { Body, Controller, Get, Header, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { CreateProyectoDto } from "../dtos/input/create-proyecto.dto";
import { UpdateProyectoDto } from "../dtos/input/update-proyecto.dto";
import { ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { ListProyectoDTO } from "../dtos/output/list-proyecto.dto";
import { ProyectoDTO } from "../dtos/output/proyecto.dto";
import { ProyectosService } from "../services/proyectos.service";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { EstadosProyectosEnum } from "../enums/estados-proyectos.enum";

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
    @ApiQuery({ name: 'nombre', required: false })
    @ApiQuery({ name: 'estado', required: false, enum: EstadosProyectosEnum })
    @ApiQuery({ name: 'nombreCliente', required: false })
    @UseGuards(AuthGuard)
    @Get()
    async obtenerProyectos(
        @Query('nombre') nombre?: string,
        @Query('estado') estado?: EstadosProyectosEnum,
        @Query('nombreCliente') nombreCliente?: string
    ): Promise<ListProyectoDTO[]> {
        return this.proyectosService.obtenerProyectos({ nombre, estado, nombreCliente });
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('exportar')
    @Header('Content-Type', 'text/csv; charset=utf-8')
    @Header('Content-Disposition', 'attachment; filename="proyectos.csv"')
    async exportarCSV(): Promise<string> {

        return await this.proyectosService.exportarCSV();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get(':id')
    async obtenerProyecto(@Param('id') id: number): Promise<ProyectoDTO> {

        return await this.proyectosService.obtenerProyecto(id);
    }
}