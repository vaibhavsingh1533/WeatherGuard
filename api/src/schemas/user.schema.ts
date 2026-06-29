import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    default: 'google',
  })
  provider: string;

  @Prop({
    default: 'user',
  })
  role: string;

  @Prop({
    default: 'pending',
  })
  status: string;

  @Prop({
    default: '',
  })
  telegramChatId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);