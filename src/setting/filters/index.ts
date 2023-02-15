import { Logger } from '@nestjs/common'
import { ExceptionLogger } from '../logger/exception.logger'
import { HttpExceptionFilter } from './http.exception.filter'

export const globalfilters = [new HttpExceptionFilter(new ExceptionLogger(new Logger()))]
