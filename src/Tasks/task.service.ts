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

    const tasks = await this.taskModel.aggregate([
      { $match: filter },
      { $skip: limit * (page - 1) },
      { $limit: limit },
    ]);
    return { items: tasks, page, limit, total };
  }

  async updateTask(..._arg: any): Promise<Task> {
    try {
      const [payload, id] = _arg;

      const result = await this.taskModel.findOneAndUpdate(
        { _id: id },
        { $set: payload },
        { $new: true },
      );
      return result;
    } catch (error) {
      return error;
    }
  }

  async deleteTask(id: string): Promise<any> {
    const delItem = await this.taskModel.deleteOne({ _id: id });
    return delItem;
  }
}
