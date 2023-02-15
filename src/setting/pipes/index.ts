import { ValidationPipe } from '@nestjs/common'

export const globalPipes = [
  new ValidationPipe({
    transform: true,
    // 검증이 이루어지지 않은 프로퍼티 제거
    whitelist: true,
    // 검증이 이루어지지 않은 프로퍼티가 있을때 에러 표시
    forbidNonWhitelisted: true,
    //프로퍼티에 검증 규칙이 정의되어있지 않은 클래스의 인스턴스나, plain object를 검증할 때 오류가 나게 만드는 옵션
    forbidUnknownValues: true,
    transformOptions: {
      // Query Param에 대해 암묵적으로 type을 변경해주지 않아 암묵적 타입변환 옵션 설정
      enableImplicitConversion: true,
    },
  }),
]
