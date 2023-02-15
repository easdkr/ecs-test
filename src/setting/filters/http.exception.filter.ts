import { Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { IExceptionLog } from '../logger/exception.logger'
import { DefaultExceptionFilter } from './default.exception.filter'

@Catch(HttpException)
export class HttpExceptionFilter extends DefaultExceptionFilter {
  protected _catch(exception: any, host: ArgumentsHost): IExceptionLog {
    const {
      req: { ip, body, method, originalUrl },
      res,
    } = this.parseHttpHost(host)

    const { message, status } = this.parseHttpException(exception)

    // ignore favicon
    if (originalUrl.includes('favicon.ico')) res.status(204)

    res.status(status).json({ message })
    return {
      ip,
      method,
      statusCode: res.statusCode,
      body,
      originalUrl,
      stack: exception.stack,
    }
  }

  private parseHttpException(exception: HttpException) {
    const error = exception.getResponse() as string | { message: string | string[] }
    const message = typeof error === 'string' ? error : error.message
    const status = exception.getStatus()

    return {
      message,
      status,
    }
  }
}
