import { ArgumentsHost, ExceptionFilter } from '@nestjs/common'
import { IExceptionLog, IExceptionLogger } from '../logger/exception.logger'
import { Request, Response } from 'express'

export abstract class DefaultExceptionFilter implements ExceptionFilter {
  constructor(protected readonly logger: IExceptionLogger) {}

  catch(exception: any, host: ArgumentsHost) {
    const loggingPayload = this._catch(exception, host)
    this.logger.log(loggingPayload)
  }

  protected abstract _catch(exception: any, host: ArgumentsHost): IExceptionLog

  protected parseHttpHost(host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const { ip, originalUrl, method, body } = ctx.getRequest<Request>()
    const res = ctx.getResponse<Response>()

    return {
      req: {
        ip,
        originalUrl,
        method,
        body,
      },
      res,
    }
  }

  protected parseRequest(host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const { ip, originalUrl, method, body } = ctx.getRequest<Request>()
    return {
      ip,
      originalUrl,
      method,
      body,
    }
  }
}
