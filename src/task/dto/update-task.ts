// DTO (Data Transfer Objects) -> Define + Validate API Input

import { IsIn } from 'class-validator';
import type { TaskStatus } from '../task.entity';

export class UpdateStatusDto {
  @IsIn(['pending', 'in_progress', 'done'])
  status: TaskStatus;
}