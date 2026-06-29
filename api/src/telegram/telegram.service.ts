import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Telegraf } from 'telegraf';

import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: Telegraf;

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly configService: ConfigService,
  ) {
    this.bot = new Telegraf(
      this.configService.get<string>('TELEGRAM_BOT_TOKEN')!,
    );
  }

  async onModuleInit() {
    this.bot.start(async (ctx) => {
      const email = ctx.startPayload;

      console.log(ctx.chat.id);
console.log(ctx.from);
console.log(ctx.message);

      if (!email) {
        await ctx.reply(
          'Please use the link from the WeatherGuard application.',
        );
        return;
      }

      const user = await this.userModel.findOne({
        email,
      });

      if (!user) {
        await ctx.reply('User not found.');
        return;
      }

      user.telegramChatId = String(ctx.chat.id);

      await user.save();

      await ctx.reply(
        '✅ Telegram connected successfully.',
      );
    });

    // this.bot.launch();

    console.log('Telegram Bot Started');
  }

  async sendApproval(chatId: string) {
    await this.bot.telegram.sendMessage(
      chatId,
      '🎉 Your access has been approved!'
    );
  }

  async sendWeather(chatId: string, message: string) {
    await this.bot.telegram.sendMessage(
      chatId,
      message
    );
  }

  async connect(email: string, chatId: string) {
  const user = await this.userModel.findOne({
    email,
  });

  if (!user) {
    return {
      message: 'User not found',
    };
  }

  user.telegramChatId = chatId;

  await user.save();

  return {
    message: 'Telegram Connected Successfully',
  };
}

}