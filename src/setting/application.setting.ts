import { ExceptionFilter, LoggerService, PipeTransform } from '@nestjs/common'
import { globalfilters } from './filters'
import { applicationLogger } from './logger/application.logger'
import { globalPipes } from './pipes'

interface IApplicationSetting {
  pipes: PipeTransform<any>[]
  filters: ExceptionFilter[]
  logger: LoggerService
}

export const applicationSetting: IApplicationSetting = {
  pipes: globalPipes,
  filters: globalfilters,
  logger: applicationLogger,
}
