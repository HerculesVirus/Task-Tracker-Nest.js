import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './interfaces/Task.interface';
import { CreateTaskDTO } from './dto/task.dto';

@Injectable()
export class taskService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async create(task?: CreateTaskDTO): Promise<Task> {
    const result = new this.taskModel(task);
    await result.save();
    return result;
  }
}
