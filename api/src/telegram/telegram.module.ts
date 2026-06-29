import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';

import { User, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [TelegramController],
  providers: [TelegramService],
  exports: [TelegramService], // <-- IMPORTANT
})
export class TelegramModule {}