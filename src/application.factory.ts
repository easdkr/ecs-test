import { DatabaseService } from '@common/database/database.service'
import { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import { applicationSetting } from '@setting/application.setting'
import { AppModule } from 'src/app.module'

export class ApplicationFactory {
  static async create() {
    const app = await NestFactory.create(AppModule)
    this.setApplication(app, true)

    //prisma client set shutdown hook
    const databaseService = app.get(DatabaseService)
    await databaseService.enableShutdownHooks(app)

    return app
  }

  static async createTester(logging = false) {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    const app = moduleFixture.createNestApplication()
    this.setApplication(app, logging)

    return app
  }

  private static setApplication(app: INestApplication, logging = false) {
    const { pipes, filters, logger } = applicationSetting
    app
      .useGlobalPipes(...pipes)
      .useGlobalFilters(...filters)
      .useLogger(logging ? logger : false)
  }
}
