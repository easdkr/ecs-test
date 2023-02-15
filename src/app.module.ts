import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './common/database/database.module'
import { validate } from './common/config/.env.validation'
import { LoggerMiddleware } from './common/middlewares/logger.middleware'
import { UserModule } from './user/user.module'

const { NODE_ENV } = process.env

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: NODE_ENV === 'prod' ? '.env' : `.${NODE_ENV}.env`,
      validate: validate,
    }),
    DatabaseModule,
    UserModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*') //모든 엔드포인터에 LoggerMiddleware 적용
  }
}
