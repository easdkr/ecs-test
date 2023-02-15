# nest.js + prisma boilerplate

### Directory tree

```
src
├── app.module.ts // 전역 모듈 파일
├── application.factory.ts //nest application 생성 클래스 파일
├── main.ts // bootstrap 파일
├── user // 테스트 user 컨텍스트 폴더, 실제 서비스에 사용 금지
│   ├── application
│   ├── core
│   │   ├── di
│   │   └── repository
│   ├── infra
│   │   └── repository
│   └── usecase
├── common // 여러 컨텍스트에서 사용되는 공통 코드
│   ├── config
│   ├── database
│   └── middlewares
└── setting // nest application 초기화 시 세팅 코드
    ├── application.setting.ts
    ├── filters
    ├── logger
    ├── pipes
```

### Repository(Database) test

- test시 환경 변수 파일을 바꾸기 위해 dotenv 사용 (package.json 참고)

1. 테스트 최초 실행시 sqlite db 파일 생성 or 변경사항 적용

```
yarn db:test:push
```

2. 테스트 실행

```
yarn test
```
