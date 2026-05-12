import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UpdateTareaDto } from "../dtos/input/update-tarea.dto";
import { CreateTareaDto } from "../dtos/input/create-tarea.dto";
import { ApiBearerAuth, ApiParam } from "@nestjs/swagger";
import { TareasService } from "../services/tarea.service";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { ListTareaDTO } from "../dtos/output/list-tarea.dto";

@Controller('proyectos/:idProyecto/tareas')
export class TareasController {

    constructor(private readonly tareasService: TareasService) { }

    @ApiBearerAuth()
    @ApiParam({ name: 'idProyecto', type: Number })
    @UseGuards(AuthGuard)
    @Post()
    async crearTarea(@Body() dto: CreateTareaDto, @Param('idProyecto') idProyecto: number): Promise<{ id: number }> {

        return await this.tareasService.crearTarea(dto, idProyecto);

    }

    @ApiBearerAuth()
    @ApiParam({ name: 'idProyecto', type: Number })
    @ApiParam({ name: 'id', type: Number })
    @UseGuards(AuthGuard)
    @Put(':id')
    async actualizarTarea(@Body() dto: UpdateTareaDto, @Param('idProyecto') idProyecto: number, @Param('id') id: number): Promise<void> {
        await this.tareasService.actualizarTarea(dto, id);
    }

    @ApiBearerAuth()
    @ApiParam({ name: 'idProyecto', type: Number })
    @UseGuards(AuthGuard)
    @Get()
    async obtenerTareas(@Param("idProyecto") idProyecto: number) : Promise<ListTareaDTO[]> {
        return await this.tareasService.obtenerTareasPorProyecto(idProyecto);
    }

    @ApiBearerAuth()
    @ApiParam({ name: 'idProyecto', type: Number })
    @ApiParam({ name: 'id', type: Number })
    @UseGuards(AuthGuard)
    @Delete(':id')
    async eliminarTarea(@Param('id') id: number): Promise<void> {
        await this.tareasService.eliminarTarea(id);
    }

}