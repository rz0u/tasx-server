import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly repo: Repository<Task>,
    ) {}

    async create(dto: CreateTaskDto): Promise<Task> {
        const task = this.repo.create({
            title: dto.title,
            description: dto.description,
            status: 'pending'
        });
        return this.repo.save(task);
    }

    async findAll() : Promise<Task[]> {
        return this.repo.find({order: {id: 'ASC'}})
    }

    private assertValidTransition(current: TaskStatus, next: TaskStatus) {
        // Allowed: pending -> in_progress -> done (one-step only)
        if (current === next) {
            throw new BadRequestException('No changes to status')
        }
        const order: TaskStatus[] = ['pending', 'done']
        const fromIdx = order.indexOf(current)
        const toIdx = order.indexOf(next)
        if (fromIdx === -1 || toIdx === -1 || toIdx - fromIdx !== 1) {
            throw new BadRequestException('Invalid status change')
        }
    }

    async updateStatus(id: number, next: TaskStatus): Promise<Task> {
        const task = await this.repo.findOne({where: {id}})
        if (!task) throw new NotFoundException('No task found')

        this.assertValidTransition(task.status, next)

        task.status = next
        task.completed_at = next === 'done' ? new Date() : null

        return this.repo.save(task)
    }

    async remove(id: number): Promise<void> {
        const res = await this.repo.delete(id)
        if (res.affected === 0) throw new NotFoundException('No task found')
    }
}
