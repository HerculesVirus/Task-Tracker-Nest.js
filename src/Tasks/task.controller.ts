import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
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
    const page = query?.page !== undefined ? parseInt(query?.page) : 1;
    const limit = query.limit !== undefined ? parseInt(query.limit) : 10;
    const filter = {};

    const result = await this.taskService.list(page, limit, filter);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'reward fetched successfully',
      data: {
        tasks: result.items,
        pagination: {
          page: result.page,
          limit: result.limit,
          total: (await result.items).length,
          pages:
            Math.ceil(result.total / result.limit) <= 0
              ? 1
              : Math.ceil(result.total / limit),
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

  @Put('/:id')
  async UpdateTask(
    @Body() Body: Task,
    @Param() param,
    @Res() res,
  ): Promise<Task> {
    try {
      console.log('param: ', param.id);
      console.log('Body: ', Body);
      const payload = Body;
      const result = await this.taskService.updateTask(payload, param.id);
      return res.status(HttpStatus.OK).json({
        message: 'Task Update Sucessfully',
        task: result,
      });
    } catch (err) {
      console.log('error: ', err);
    }
  }

  @Delete('/:id')
  async DeleteTask(@Param() param, @Res() res) {
    const { id } = param;
    const result = await this.taskService.deleteTask(id);
    return res.status(HttpStatus.OK).json({
      message: 'Task deleted sucessfully',
      task: result,
    });
  }
}
