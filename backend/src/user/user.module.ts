import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/User.schema';



@Module({
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService],
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    UserModule,
  ],
})
export class UserModule {}