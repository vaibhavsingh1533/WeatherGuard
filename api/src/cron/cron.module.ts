import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CronService } from './cron.service';

import { TelegramModule } from '../telegram/telegram.module';
import { WeatherModule } from '../weather/weather.module';

import { User, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    TelegramModule,
    WeatherModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [CronService],
})
export class CronModule {}