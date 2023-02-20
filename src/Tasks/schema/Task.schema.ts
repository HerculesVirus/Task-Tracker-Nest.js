import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Task {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  date: string;

  @Prop()
  reminder: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
