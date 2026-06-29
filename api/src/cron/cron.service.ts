import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../schemas/user.schema';
import { WeatherService } from '../weather/weather.service';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class CronService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,

    private readonly weatherService: WeatherService,

    private readonly telegramService: TelegramService,
  ) {}

  @Cron('*/1 * * * *')
  async sendWeatherAlerts() {
    console.log('Checking Approved Users...');

    const users = await this.userModel.find({
      status: 'approved',
      telegramChatId: {
        $ne: '',
      },
    });

    if (users.length === 0) {
      console.log('No Approved Users');
      return;
    }

    const message =
      await this.weatherService.getWeatherMessage();

    for (const user of users) {
      await this.telegramService.sendWeather(
        user.telegramChatId,
        message,
      );

      console.log(
        `Weather sent to ${user.email}`,
      );
    }
  }
}