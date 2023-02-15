import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { User } from 'src/user/core/user.domain'
import { UserService } from 'src/user/usecase/user.service'

class CreateDTO {
  @IsNumber()
  @IsNotEmpty()
  id: number
  @IsString()
  @IsNotEmpty()
  email: string
  @IsString()
  @IsNotEmpty()
  password: string
  @IsString()
  @IsNotEmpty()
  nickname: string
}
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async find(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.find(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateDTO) {
    return this.userService.create({ ...body })
  }
}
