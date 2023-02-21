import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { taskService } from './task.service';
import { CreateTaskDTO } from './dto/task.dto';
import { Task } from './interfaces/Task.interface';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: taskService) {}

  @Get('/')
  async listOfTasks(@Query() query, @Res() res): Promise<Task> {
    console.log('params: ', query?.page);

    const page = query?.page !== undefined ? query?.page : 1;
    const limit = query.limit !== undefined ? query.limit : 10;
    const filter = {};

    const TaskList = await this.taskService.list(page, limit, filter);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'reward fetched successfully',
      data: {
        tasks: TaskList,
        pagination: {
          page,
          limit,
          total: (await TaskList).length,
          pages: 15,
        },
      },
    });
  }

  @Post('/create')
  async createTask(
    @Res() res,
    @Body() createTaskDto: CreateTaskDTO,
  ): Promise<Task> {
    try {
      const result = await this.taskService.create(createTaskDto);
      return res.status(HttpStatus.OK).json({
        mesage: 'Task created Successfully.',
        task: result,
      });
    } catch (error) {
      if (error.code === 11000) {
        res.status(HttpStatus.FORBIDDEN).json({
          message: 'Title Should be Unique',
        });
      }
    }
  }
}
