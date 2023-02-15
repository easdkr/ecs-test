import { DatabaseModule } from '@common/database/database.module'
import { Module } from '@nestjs/common'
import { UserController } from 'src/user/application/user.controller'
import { USER_REPOSITORY } from 'src/user/core/di'
import { UserRepository } from 'src/user/infra/repository/user.repository'
import { UserService } from 'src/user/usecase/user.service'

@Module({
  imports: [DatabaseModule],
  providers: [{ provide: USER_REPOSITORY, useClass: UserRepository }, UserService],
  controllers: [UserController],
})
export class UserModule {}
