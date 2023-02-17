import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './interfaces/Task.interface';

@Injectable()
export class taskService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}
  private readonly tasks: any[] = [];

  create(task: any) {
    this.tasks.push(task);
    console.log('this.tasks: ', this.tasks);
    return { final: this.tasks };
  }

  getList(): any {
    return { final: this.tasks };
  }
}
