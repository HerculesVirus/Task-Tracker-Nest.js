import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './interfaces/Task.interface';
import { CreateTaskDTO } from './dto/task.dto';

@Injectable()
export class taskService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  create(task?: CreateTaskDTO) {
    const result = new this.taskModel(task);
    return result;
  }
}
