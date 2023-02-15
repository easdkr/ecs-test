import { User } from '../user.domain'

export interface IUserRepository {
  find(id: number): Promise<User>
  create(user: User): Promise<void>
}
