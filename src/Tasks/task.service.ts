import { Injectable } from '@nestjs/common';

@Injectable()
export class taskService {
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
