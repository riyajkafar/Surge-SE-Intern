import { Injectable, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/User.schema';
import { UserDetails } from './user-details.interface';
import * as bcrypt from 'bcrypt';



@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) { }

  _getUserDetails(user: UserDocument): UserDetails {
    return {
      _id:user._id.toString(),
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      mobile: user.mobile,
      state: user.state,
      password: user.password,
      accountType: user.accountType,
    };
  }

  async create(email: string, hashedPassword: string, accountType: string, state: boolean): Promise<UserDocument> {
    const newUser = new this.userModel({
      email,
      password: hashedPassword,
      accountType,
      state,
    });
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async createDetails(createUserDto: CreateUserDto): Promise<User> {
    return await new this.userModel({
      ...createUserDto,
    }).save();
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }
}

