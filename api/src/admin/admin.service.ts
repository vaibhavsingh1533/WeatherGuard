import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../schemas/user.schema';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly telegramService: TelegramService,

    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getPendingUsers() {
    return this.userModel.find({
      status: 'pending',
      role: 'user',
    });
  }

  async approveUser(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.status = 'approved';

    await user.save();
    if (user.telegramChatId) {
  await this.telegramService.sendApproval(
    user.telegramChatId,
  );
}

    return {
      message: 'User Approved Successfully',
      user,
    };
  }
}