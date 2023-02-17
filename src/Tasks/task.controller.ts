import { Controller, Param, Post, Res } from '@nestjs/common';
import { Response } from '@nestjs/common';
import { taskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: taskService) {}
  @Post('')
  findAll(): any {
    return this.taskService.getList();
  }
  @Post(':id')
  createTask(@Param('id') id: string, @Res() res: Response): any {
    try {
      const result = this.taskService.create({ name: id });
      // res.status('200').json(result);
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
