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

  async list(page: number, limit: number, filter: object): Promise<any> {
    const total = await this.taskModel.countDocuments(filter);

    if (page > Math.ceil(total / limit) && total > 0)
      page = Math.ceil(total / limit);
    console.log('page: ', page);
    console.log('limit: ', typeof limit);
    const tasks = await this.taskModel.aggregate([
      { $match: filter },
      { $skip: limit * (page - 1) },
      { $limit: limit },
    ]);
    console.log('empty: ', tasks);
    return { items: tasks, page, limit, total };
  }

  async updateTask(..._arg: any) {
    const { Body, param } = _arg;
    const result = await this.taskModel.findOneAndUpdate(
      { _id: param.id },
      { $set: Body },
      { $new: true },
    );
    return result;
  }
}
