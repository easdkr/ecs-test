import { LoggerService } from '@nestjs/common'
import * as winston from 'winston'
import * as winstonDaily from 'winston-daily-rotate-file'
import { utilities, WinstonModule } from 'nest-winston'

const { NODE_ENV } = process.env
const LOG_BASE_DIR = __dirname + '../../../logs'

const dailyOptions = (level: string): winstonDaily.DailyRotateFileTransportOptions => {
  return {
    level,
    datePattern: 'YYYY-MM-DD',
    dirname: `${LOG_BASE_DIR}/${level}`,
    filename: `%DATE%.${level}.log`,
    maxFiles: 7, // 최근 7일까지 저장
    zippedArchive: true, // 로그가 쌓이면 압축하여 관리
  }
}

export const applicationLogger: LoggerService = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: NODE_ENV === 'prod' ? 'info' : 'debug',
      format:
        NODE_ENV === 'prod'
          ? winston.format.simple()
          : winston.format.combine(
              winston.format.timestamp(),
              utilities.format.nestLike('Nest', {
                colors: true,
                prettyPrint: true,
              }),
            ),
    }),

    // warn, error 로그는 파일로 관리
    new winstonDaily(dailyOptions('warn')),
    new winstonDaily(dailyOptions('error')),
  ],
})
