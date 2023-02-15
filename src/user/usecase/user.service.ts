import { Inject, Injectable } from '@nestjs/common'
import { USER_REPOSITORY } from 'src/user/core/di'
import { IUserRepository } from 'src/user/core/repository/user.repository'
import { User } from 'src/user/core/user.domain'

@Injectable()
export class UserService {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}

  async find(id: number) {
    return this.userRepository.find(id)
  }

  async create(user: User) {
    return this.userRepository.create(user)
  }
}
