import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { UpdateStatusDto } from './dto/update-task';

@Controller({
    path: 'tasx',
    version: '1'
})
export class TaskController {
    constructor(private readonly service: TaskService) {}

    @Post()
    create(@Body() dto: CreateTaskDto): Promise<Task> {
        return this.service.create(dto)
    }

    @Get()
    findAll(): Promise<Task[]> {
        return this.service.findAll()
    }

    @Patch('update/:id')
    updateStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateStatusDto,
    ): Promise<Task> {
        return this.service.updateStatus(id, dto.status)
    }

    @Delete('delete/:id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.service.remove(id)
    }

}
