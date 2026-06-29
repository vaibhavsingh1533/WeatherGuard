import { Body, Controller, Post } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('connect')
  connect(@Body() body: { email: string; chatId: string }) {
    return this.telegramService.connect(body.email, body.chatId);
  }
}