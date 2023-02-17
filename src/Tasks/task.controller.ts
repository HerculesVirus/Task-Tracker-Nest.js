import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from '@nestjs/common';
import { taskService } from './task.service';
import { CreateTaskDTO } from './dto/task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: taskService) {}
  @Post('')
  findAll(): any {
    return this.taskService.getList();
  }
  @Post(':id')
  async createTask(
    @Res() res,
    @Body() createTaskDto: CreateTaskDTO,
  ): Promise<any> {
    try {
      const result = await this.taskService.addTask(createTaskDto);
      return res.status(HttpStatus.OK).json({
        mesage: 'Task created Successfully.',
        task: result,
      });
      // res.status('200').json(result);
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
