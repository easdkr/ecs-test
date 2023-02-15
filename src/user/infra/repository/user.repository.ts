import { DatabaseService } from '@common/database/database.service'
import { Injectable } from '@nestjs/common'
import { IUserRepository } from 'src/user/core/repository/user.repository'
import { User } from 'src/user/core/user.domain'

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly db: DatabaseService) {}

  async find(id: number): Promise<User> {
    const user = await this.db.users.findFirst({
      where: {
        id,
      },
    })
    const result = new User(user)

    return result
  }

  async create(user: User): Promise<void> {
    await this.db.users.create({
      data: user,
    })
  }
}
