export class User {
  id: number
  email: string
  password: string
  nickname: string

  constructor(user: User) {
    this.id = user.id
    this.email = user.email
    this.password = user.password
    this.nickname = user.nickname
  }
}
