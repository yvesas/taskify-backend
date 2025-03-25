import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { TaskStatus } from '../task.interface';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;
}
