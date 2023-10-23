import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { User } from './model/user.entity';
import { UserRepository } from './repository/user.repository';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRepository, AuthGuard, RolesGuard],
  exports: [UserRepository],
})
export class UserModule {}
