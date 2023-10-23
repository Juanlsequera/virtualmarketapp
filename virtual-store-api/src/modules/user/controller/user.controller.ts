import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { User } from '../model/user.entity';
import { UserService } from '../service/user.service';
import { UserDto } from '../dtos/user.dto';
import { AuthGuard } from '../../../guards/auth.guard';
import { RolesGuard } from '../../../guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('user')
@Controller('user')
@UseGuards(AuthGuard, RolesGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'The found records', type: [User] })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({ status: 200, description: 'The found record', type: User })
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: UserDto })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: User,
  })
  create(@Body() user: UserDto): Promise<User> {
    return this.userService.create(user);
  }

  @Put(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiBody({ type: UserDto })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: User,
  })
  update(@Param('id') id: number, @Body() user: UserDto): Promise<any> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  remove(@Param('id') id: string): Promise<any> {
    return this.userService.remove(id);
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Get a user by email' })
  @ApiResponse({ status: 200, description: 'The found record', type: User })
  findByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findByEmail(email);
  }
}
