import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { taskService } from './task.service';

@Module({
  controllers: [TaskController],
  providers: [taskService],
  exports: [taskService],
})
export class TaskModule {}
