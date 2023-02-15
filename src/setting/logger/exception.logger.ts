import { Logger } from '@nestjs/common'

export type IExceptionLog = {
  ip?: string
  originalUrl?: string
  method?: string
  statusCode?: number
  body?: object
  stack?: string
}

export interface IExceptionLogger {
  log(payload: IExceptionLog): void
}

export class ExceptionLogger<L extends Logger> implements IExceptionLogger {
  constructor(private readonly logger: L) {}

  log({ ip, originalUrl, method, statusCode, body, stack }: IExceptionLog) {
    this.logger.error(`${ip} ${method} ${statusCode} \nReq Body: ${JSON.stringify(body, null, 2)}`, stack, originalUrl)
  }
}
