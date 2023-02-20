import { Global, Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { taskService } from './task.service';
import { TaskSchema } from './schema/Task.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])],
  controllers: [TaskController],
  providers: [taskService],
})
export class TaskModule {
  // constructor(private taskService: taskService) {}
}
