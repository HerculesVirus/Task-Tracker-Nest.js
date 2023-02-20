import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { taskService } from './task.service';
import { CreateTaskDTO } from './dto/task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: taskService) {}

  @Post('/')
  async createTask(
    @Res() res,
    @Body() createTaskDto: CreateTaskDTO,
  ): Promise<any> {
    try {
      const result = await this.taskService.create(createTaskDto);
      return res.status(HttpStatus.OK).json({
        mesage: 'Task created Successfully.',
        task: result,
      });
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
