import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IEnvironmentVariable } from './environment.variable'

// 예시로 만든 클래스 필요 X
@Injectable()
export class DatabaseConfig {
  constructor(private configService: ConfigService<IEnvironmentVariable>) {}

  get databaseURL(): string {
    return this.configService.get('DATABASE_URL')
  }
}
