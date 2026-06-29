import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async login(data: {
    name: string;
    email: string;
    provider: string;
  }) {
    let user = await this.userModel.findOne({
      email: data.email,
    });

    if (!user) {
      user = await this.userModel.create({
        name: data.name,
        email: data.email,
        provider: data.provider,
        role: data.email === 'admin@gmail.com' ? 'admin' : 'user',
        status: 'new',
      });
    }

    return user;
  }

async requestAccess(email: string) {
  const user = await this.userModel.findOne({ email });

  if (!user) {
    throw new NotFoundException("User not found");
  }

  if (user.status === "approved") {
    return {
      message: "User already approved",
      user,
    };
  }

  user.status = "pending";

  await user.save();

  return {
    message: "Access Request Sent",
    user,
  };
}
  }
